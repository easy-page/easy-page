import * as React from 'react'
import * as PropTypes from 'prop-types'
import isEqual from 'lodash/isEqual'
import uniqBy from 'lodash/uniqBy'
import { cloneLoop } from '@utiljs/clone'
import classNames from 'classnames'
import { hasClass } from '@utiljs/dom'
import Input from '@roo/roo/Input'
import { isFunction } from '@utiljs/is'
import {
  TreeProps,
  TreeState,
  TreeData,
  ClickOtherParams,
  Data,
} from './interface'

import TreeNode from './TreeNode'

const ExpandedChangeIdMap: Record<string, any> = {}

class Tree extends React.Component<TreeProps, TreeState> {
  static defaultProps = {
    data: [],
    nodeKey: 'id',
    nodeLabel: 'label',
    nodeChildren: 'children',
    showCheckbox: false,
    selectedKey: '',
    selectedKeys: [],
    lazy: false,
    defaultExpandAll: false,
    defaultExpandedKeys: undefined,
    lazyLoad: undefined,
    disabled: false,
    multiple: false,
    checkStrictly: true,
    expandAction: 'click',
    autoExpandParent: false,
    nodeRender: undefined,
    onNodeClick: undefined,
    onNodeExpand: undefined,
    onNodeCollapse: undefined,
    onCheckChange: undefined,
  }

  static propTypes = {
    nodeKey: PropTypes.string,
    nodeLabel: PropTypes.string,
    nodeChildren: PropTypes.string,
    data: PropTypes.array,
    showCheckbox: PropTypes.bool,
    selectedKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    selectedKeys: PropTypes.array,
    lazy: PropTypes.bool,
    defaultExpandAll: PropTypes.bool,
    defaultExpandedKeys: PropTypes.array,
    lazyLoad: PropTypes.func,
    disabled: PropTypes.bool,
    multiple: PropTypes.bool,
    checkStrictly: PropTypes.bool,
    autoExpandParent: PropTypes.bool,
    expandAction: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    nodeRender: PropTypes.func,
    onNodeClick: PropTypes.func,
    onNodeExpand: PropTypes.func,
    onNodeCollapse: PropTypes.func,
    onCheckChange: PropTypes.func,
  }

  // 缓存 props 选中的节点，用于改变父节点的 checked 状态
  tempDefaultCheckedNode: TreeData[] = []

  // 缓存 nodeKey 的值
  nodeKey = this.props.nodeKey || 'id'

  constructor(props: TreeProps) {
    super(props)

    const { data, selectedKeys = [] } = this.props
    this.state = {
      copyState: cloneLoop(data),
      selectedKeys,
      stateTree: [],
      flatState: [],
      searchValue: '',
      direction: 'top',
      startDragNodeKey: '',
      dragingNodeKey: '',
      startDragNode: {} as TreeData,
      selectedKeysNode: [],
    }
  }

  // TODO: use getDerivedStateFromProps
  componentWillReceiveProps(nextProps: TreeProps) {
    const isDataChange = !isEqual(nextProps.data, this.state.copyState)
    const isSelectedKeysChange = !isEqual(
      nextProps.selectedKeys,
      this.props.selectedKeys
    )
    const isSelectedKeyChange = !isEqual(
      nextProps.selectedKey,
      this.props.selectedKey
    )
    const isAutoExpandParentChange = !isEqual(
      nextProps.autoExpandParent,
      this.props.autoExpandParent
    )
    const { flatState } = this.state
    if (
      isDataChange ||
      isSelectedKeysChange ||
      isSelectedKeyChange ||
      isAutoExpandParentChange
    ) {
      this.tempDefaultCheckedNode = []
      this.setState(
        {
          copyState: cloneLoop(nextProps.data),
          flatState: nextProps.showCheckbox ? [] : flatState,
          selectedKeys: nextProps.selectedKeys || [],
        },
        () => {
          const { copyState } = this.state
          if (
            isSelectedKeysChange ||
            nextProps.controlled ||
            nextProps.multiple ||
            nextProps.draggable ||
            isAutoExpandParentChange ||
            isDataChange
          ) {
            this.initStateTree(copyState)
          }
        }
      )
    }
  }

  componentDidMount() {
    this.initStateTree()
  }

  getNodeChildren = (item: TreeData) =>
    item[this.props.nodeChildren || 'children'] as TreeData[]

  getNodeKey = (item: TreeData) => item[this.nodeKey]

  getNodeLabel = (item: TreeData) => item[this.props.nodeLabel || 'label']

  initStateTree = (treeData?: Data[]) => {
    const { data } = this.props
    const cData = cloneLoop(treeData || data)
    this.factorialNode(cData as TreeData[])

    this.updateParentChecked()
    this.updateState(cData as TreeData[])
  }

  updateParentChecked = () => {
    this.tempDefaultCheckedNode.forEach((item) => {
      this.setCheckedRelationNode(item, true)
    })
  }

  isExpanded = (item: TreeData) => {
    const {
      defaultExpandAll,
      defaultExpandedKeys,
      expandedKeys,
      autoExpandParent,
    } = this.props
    if (expandedKeys) {
      return expandedKeys.indexOf(this.getNodeKey(item)) > -1
    }
    const hasChild = this.getNodeChildren(item)?.length
    const needExpandNode =
      defaultExpandedKeys &&
      defaultExpandedKeys.length &&
      (defaultExpandedKeys as any[]).indexOf(this.getNodeKey(item)) > -1
    let needSearchNode = false
    if (this.state.searchValue && hasChild) {
      needSearchNode = this.getNodeChildren(item).some(
        (child: TreeData) =>
          this.getNodeLabel(child).indexOf(this.state.searchValue) > -1
      )
    }

    if (hasChild) {
      // needExpandNode be superior to defaultExpandAll
      if (
        ((needExpandNode || defaultExpandAll) &&
          !(
            item.ExpandedIsChange ||
            ExpandedChangeIdMap[this.getNodeKey(item)]?.ExpandedIsChange
          )) ||
        needSearchNode ||
        ExpandedChangeIdMap[this.getNodeKey(item)]?.isExpanded ||
        autoExpandParent
      ) {
        return true
      }
    }
    return false
  }

  isDisabled = (item: TreeData) => {
    const { disabled, parentDisabled } = this.props
    if (item.disabled) {
      return !!item.disabled
    }
    if (disabled) {
      return disabled
    }
    if (parentDisabled) {
      return !!this.getNodeChildren(item)?.length
    }
    return false
  }

  // factorial node
  factorialNode = (node?: TreeData[], parent?: TreeData) => {
    const {
      showCheckbox,
      lazy,
      selectedKey,
      selectedKeys = [],
      disabled,
      multiple,
      checkStrictly,
    } = this.props

    if (node && node.length) {
      const selectedKeySet = new Set(selectedKeys as any)
      node.forEach((item: TreeData, index: number) => {
        const hasChild = this.getNodeChildren(item)?.length
        const isExpanded = item.isExpanded || this.isExpanded(item)
        const isChecked =
          selectedKeySet.has(this.getNodeKey(item)) ||
          !!(parent && parent.isChecked && checkStrictly)

        // set extra props
        item.level = parent ? (parent?.level as number) + 1 : 0
        item.hasChild = !!hasChild
        item.hasCheckbox = showCheckbox || false
        item.isRoot = !parent
        item.isDisabled = this.isDisabled(item)
        item.isLastNode = !hasChild
        item.isLeaf = !!(lazy && !item.hasChild && item.isLeaf)
        // item.isExpanded = node.isExpanded || this.isExpanded(item); // TODO 确认node.isExpanded？
        item.isExpanded = isExpanded
        item.parent = parent
        item.spckey = parent ? `${parent.spckey}_${index}` : `${index}`
        if (!item.isDisabled) {
          item.isChecked = isChecked
        }
        // item.isChecked = selectedKeys.indexOf(item[nodeKey]) >= 0 || (!!(parent && parent.isChecked));
        item.isSelected = !multiple
          ? selectedKey === this.getNodeKey(item)
          : selectedKeySet.has(this.getNodeKey(item))
        if (selectedKeySet.has(this.getNodeKey(item))) {
          this.tempDefaultCheckedNode.push(item)
        }

        // if disabled must false
        // if (item.isDisabled) {
        //     item.isChecked = false;
        // }

        // fill flatstate
        this.construcFlatState(item)

        // factorial init extra props
        if (hasChild) {
          this.factorialNode(this.getNodeChildren(item), item)
        }
        // this.factorialNode(this.getNodeChildren(item), item);
      })
    }
  }

  // flat data
  construcFlatState = (node: TreeData) => {
    const { flatState } = this.state
    // 这里需要根据nodeKey去重
    // if (!this.getNodeKey(node) || !flatState.find((item => this.getNodeKey(item) === this.getNodeKey(node)))) {
    //     flatState.push(node);
    // }
    const flatStateSet = new Set(flatState.map((item) => this.getNodeKey(item)))

    if (!flatStateSet.has(this.getNodeKey(node))) {
      flatState.push(node)
    }
  }

  // common update relation nodes fn to isChecked and childCheckedStatus
  updateRelationNodes = (
    selectedStatus: boolean,
    selectedNode: TreeData,
    needUpdate?: boolean
  ) => {
    if (!needUpdate) {
      // force render
      this.updateState(this.state.stateTree)
    } else {
      // set up/down node
      this.setCheckedRelationNode(selectedNode, selectedStatus)
      // force render
      this.updateState(this.state.stateTree)
    }
  }

  // start update status
  setCheckedRelationNode = (node: TreeData, checked: boolean) => {
    const { checkStrictly } = this.props
    // set current node status
    this.setCurrNodeStatus(node, checked)

    // checkStrictly为false，则父子不进行关联
    if (checkStrictly) {
      // up set node status
      const { parent } = node
      if (parent) {
        this.setParentNodeStatus(parent, checked)
      }
      // down set node status
      if (this.getNodeChildren(node)) {
        this.setChildNodeStatus(this.getNodeChildren(node), checked)
      }
    }
  }

  // update current status
  setCurrNodeStatus = (node: TreeData, checked: boolean) => {
    node.isChecked = checked
    const childrenLength = this.getNodeChildren(node)?.length || 0
    const checkedChildrenList = childrenLength
      ? this.getNodeChildren(node).filter((child) => !child.isChecked)
      : []
    const checkedChildrenTotal = checkedChildrenList.length

    const allNoChecked = checkedChildrenTotal === childrenLength

    /***
     * 1: 不选 2: 全选 3: 半选
     * checkedChildrenTotal是0，则childCheckedStatus = 1（没选）；
     * checkedChildrenTotal是total，则childCheckedStatus = 2（全选）；
     * checkedChildrenTotal是小于total，则childCheckedStatus = 3（半选）；
     */

    const { checkStrictly } = this.props

    // 若父子不关联，则没有半选状态
    if (checkedChildrenTotal < childrenLength && checkStrictly) {
      node.childCheckedStatus = 3
    }
    if (checkedChildrenTotal === 0) {
      node.childCheckedStatus = 1
    }
    if (allNoChecked) {
      node.childCheckedStatus = 2
    }
  }

  // update child status
  setChildNodeStatus = (child: TreeData[], checked: boolean) => {
    if (child && child.length) {
      child.forEach((ele) => {
        if (ele.isDisabled) return
        ele.childCheckedStatus = 2
        ele.isChecked = checked
        if (this.getNodeChildren(ele)) {
          this.setChildNodeStatus(this.getNodeChildren(ele), checked)
        }
      })
    }
  }

  // update parent status
  setParentNodeStatus = (parent: TreeData, checked: boolean) => {
    const parentChildrenCheckList = this.getNodeChildren(parent)
      ? this.getNodeChildren(parent).filter(
          (child) => child.isChecked || child.childCheckedStatus === 3
        )
      : []
    const parentChildrenCheckTotal = parentChildrenCheckList.length

    parent.childCheckedStatus =
      parent.isDisabled && parentChildrenCheckTotal === 0 ? 2 : 3

    if (this.getNodeChildren(parent)) {
      const flag: boolean[] = []
      this.getNodeChildren(parent).forEach((ele: TreeData) => {
        if (ele.isChecked) {
          flag.push(ele.isChecked)
        }
      })

      this.ctrHalfStatus(flag, parent, checked)
    }
    if (parent.parent) {
      this.setParentNodeStatus(parent.parent, checked)
    }
  }

  // control half selected
  ctrHalfStatus = (flag: boolean[], node: TreeData, checked: boolean) => {
    if (flag.length === this.getNodeChildren(node)?.length) {
      node.childCheckedStatus = 1
      node.isChecked = true
    } else if (
      checked ||
      (flag.length > 0 && flag.length < this.getNodeChildren(node)?.length)
    ) {
      node.childCheckedStatus = 3
      node.isChecked = false
    } else {
      node.childCheckedStatus = 2
      node.isChecked = false
    }
  }

  // get selected node
  getCheckedNodes = () => {
    const { controlled, nodeKey = 'id' } = this.props
    const { flatState, selectedKeysNode = [] } = this.state
    if (controlled) {
      return uniqBy(selectedKeysNode, nodeKey)
    } else {
      const aNodes = flatState.filter((node: TreeData) => node.isChecked)
      return aNodes
    }
  }

  // set selected node
  setCheckedNodes = (selectNodes: string[] | number[]) => {
    const { flatState } = this.state
    const aNodes = flatState.filter(
      (node: TreeData) =>
        (selectNodes as any[]).indexOf(this.getNodeKey(node)) > -1
    )

    aNodes.forEach((node) => {
      this.updateRelationNodes(true, node, true)
    })
  }

  setNotCheckedNodes = (selectNodes: Array<string | number>) => {
    const { flatState } = this.state
    const aNodes = flatState.filter(
      (node: TreeData) =>
        (selectNodes as any[]).indexOf(this.getNodeKey(node)) > -1
    )

    aNodes.forEach((node) => {
      this.updateRelationNodes(false, node, true)
    })
  }

  // clear selected
  clearCheckedNodes = () => {
    const aNodes = this.getCheckedNodes()

    aNodes.forEach((node: TreeData) => {
      this.updateRelationNodes(false, node, true)
    })
  }

  // selected all
  checkAll = () => {
    const { stateTree } = this.state

    stateTree.forEach((node: TreeData) => {
      this.updateRelationNodes(true, node, true)
    })
  }

  // clear all
  clearAll = () => {
    this.clearCheckedNodes()
  }

  // 递归选择父节点
  getParentCheckNode = (
    parent: TreeData,
    selectedKeysNodeList?: TreeData[]
  ) => {
    const _selectedKeysNodeList: TreeData[] = selectedKeysNodeList || []
    // 判断当前节点所有子节点，是否都在selectedKeysNodeList里，如果在，则也透传回去
    const isContained = this.getNodeChildren(parent)?.every((item2) =>
      _selectedKeysNodeList?.some(
        (item1) => this.getNodeKey(item1) === this.getNodeKey(item2)
      )
    )
    if (isContained) {
      _selectedKeysNodeList.push(parent)
    }
    if (parent.parent) {
      this.getParentCheckNode(parent.parent, _selectedKeysNodeList)
    }
    return _selectedKeysNodeList
  }

  // 递归选择子节点
  getChildCheckNode = (
    child: TreeData | TreeData[],
    selectedKeysNodeList?: TreeData[]
  ) => {
    const _selectedKeysNodeList: TreeData[] = selectedKeysNodeList || []
    // 判断当前节点的子节点，也需要选择
    ;[].concat(child as any).forEach((item: TreeData) => {
      _selectedKeysNodeList.push(item)
      if (this.getNodeChildren(item)?.length) {
        this.getChildCheckNode(
          this.getNodeChildren(item),
          _selectedKeysNodeList
        )
      }
    })
    return _selectedKeysNodeList
  }

  // 递归取消父节点
  cancelParentCheckNode = (
    parent: TreeData,
    selectedKeysNodeList?: TreeData[]
  ) => {
    const _selectedKeysNodeList: TreeData[] = selectedKeysNodeList || []
    const index = _selectedKeysNodeList.findIndex(
      (n) => this.getNodeKey(parent) === this.getNodeKey(n)
    )
    if (index !== -1) _selectedKeysNodeList.splice(index, 1)
    // 判断当前节点的父节点，也需要去掉
    if (parent.parent) {
      this.cancelParentCheckNode(parent.parent, _selectedKeysNodeList)
    }
    return _selectedKeysNodeList
  }

  // 递归取消子节点
  cancelChildCheckNode = (
    child: TreeData | TreeData[],
    selectedKeysNodeList?: TreeData[]
  ) => {
    const _selectedKeysNodeList: TreeData[] = selectedKeysNodeList || []
    // 判断当前节点的子节点，也需要去掉
    ;[].concat(child as any).forEach((item) => {
      const index = _selectedKeysNodeList.findIndex(
        (n) => this.getNodeKey(item) === this.getNodeKey(n)
      )
      if (index !== -1) _selectedKeysNodeList.splice(index, 1)
      if (this.getNodeChildren(item)?.length) {
        this.cancelChildCheckNode(
          this.getNodeChildren(item),
          _selectedKeysNodeList
        )
      }
    })
    return _selectedKeysNodeList
  }

  // handle checkbox change
  handleCheckChange = (evt: any, node: TreeData, isNodeChecked?: boolean) => {
    const _evt = evt.currentTarget
    const { blockNode, data } = this.props
    const isChecked = blockNode
      ? isNodeChecked || evt.target.checked
      : evt.target.checked
    const {
      controlled,
      nodeKey = 'id',
      onCheckChange,
      checkStrictly,
    } = this.props
    const { selectedKeysNode = [], selectedKeys, flatState } = this.state
    let needUpdate = true
    if (controlled) {
      if (isChecked) {
        if (
          isFunction(onCheckChange) &&
          !selectedKeys?.includes(this.getNodeKey(node))
        ) {
          needUpdate = false
        }
      }
    }
    if (selectedKeys?.length) {
      // 默认选择的节点
      const defaultSelectNode =
        flatState.filter((item) =>
          selectedKeys.includes(this.getNodeKey(item))
        ) || []
      defaultSelectNode.forEach((item) => {
        selectedKeysNode.push(item)
      })
    }

    let selectedKeysNodeList: TreeData[] = selectedKeysNode || []
    selectedKeysNodeList = uniqBy(selectedKeysNodeList, nodeKey)
    const hasChecked = selectedKeysNodeList.some(
      (item) => this.getNodeKey(item) === this.getNodeKey(node)
    )
    // 如果没有选中此节点
    if (checkStrictly) {
      // 父子关联的情况下
      if (!hasChecked) {
        // 如果是叶子节点
        if (!node.hasChild) {
          selectedKeysNodeList.push(node)
        }
        // 如果当前节点有孩子，则也需要选中
        if (this.getNodeChildren(node)?.length) {
          selectedKeysNodeList = this.getChildCheckNode(
            node,
            selectedKeysNodeList
          )
        }
        // 如果当前节点的子都选中，则父亲也要选中
        if (node.parent) {
          selectedKeysNodeList = this.getParentCheckNode(
            node.parent,
            selectedKeysNodeList
          )
        }
      } else {
        // 如果是叶子节点
        if (!node.hasChild) {
          // 如果已经选择了当前节点，则去掉此节点，叶子节点
          selectedKeysNodeList = selectedKeysNodeList.filter(
            (item) => this.getNodeKey(item) !== this.getNodeKey(node)
          )
        }
        // 如果当前节点有孩子，则也去掉
        if (this.getNodeChildren(node)?.length) {
          selectedKeysNodeList = this.cancelChildCheckNode(
            node,
            selectedKeysNodeList
          )
        }
        if (node.parent) {
          // 如果当前节点有父亲，则也去掉
          selectedKeysNodeList = this.cancelParentCheckNode(
            node.parent,
            selectedKeysNodeList
          )
        }
      }
    } else {
      if (!hasChecked) {
        selectedKeysNodeList.push(node)
      } else {
        selectedKeysNodeList = selectedKeysNodeList.filter(
          (item) => this.getNodeKey(item) !== this.getNodeKey(node)
        )
      }
    }
    selectedKeysNodeList = uniqBy(selectedKeysNodeList, nodeKey)

    selectedKeysNodeList = selectedKeysNodeList.map((item) => ({
      ...item,
      isChecked: true,
    }))
    // 更新内部 flatState
    let _flatState = flatState
    if (controlled) {
      const selectedKeysNodeIdList = selectedKeysNodeList.map((item) =>
        this.getNodeKey(item)
      )
      _flatState = flatState.map((item) => {
        if (selectedKeysNodeIdList.includes(this.getNodeKey(item))) {
          return {
            ...item,
            isChecked,
          }
        }
        return item
      })
    }
    this.setState(
      {
        flatState: _flatState,
        selectedKeysNode: selectedKeysNodeList,
      },
      () => {
        this.updateRelationNodes(isChecked, node, needUpdate)
        if (this.props.lazy && node.isLeaf && this.props.showCheckbox) {
          const otherParams = {
            evtName: 'node-label',
          }
          this.execLazyLoad(_evt, node, otherParams)
        }
        const checkedKeys = this.getCheckedNodes().map((item) =>
          this.getNodeKey(item)
        )
        // onCheckChange hook
        // const { onCheckChange } = this.props;
        if (onCheckChange) {
          onCheckChange(
            cloneLoop({
              id: this.getNodeKey(node),
              label: this.getNodeLabel(node),
              isChecked,
            }),
            this.getCheckedNodes(),
            checkedKeys
          )
        }
      }
    )
  }

  getSelectNodes = () => {
    const { flatState } = this.state
    const aNodes = flatState.filter((node: TreeData) => node.isSelected)
    return aNodes
  }

  getSelectCurNode = (id: any) => {
    const { flatState } = this.state
    const aNodes = flatState.filter(
      (node: TreeData) => this.getNodeKey(node) === id
    )
    return aNodes
  }

  // handle plan click
  handleClick = (evt: any, item: TreeData, otherParams?: ClickOtherParams) => {
    const evtNode = evt.currentTarget.parentNode.parentNode
    const _evt = evt.currentTarget
    const {
      onNodeExpand,
      onNodeClick,
      onNodeCollapse,
      lazy,
      showCheckbox,
      expandedKeys,
      multiple,
    } = this.props

    const { evtName, isExpend } = otherParams || {}

    // isLeaf means lazy load Data
    if (lazy && item.isLeaf) {
      this.execLazyLoad(_evt, item, otherParams)
    }

    // onNodeClick hook
    if (onNodeClick) {
      // disabled node dont have click event
      if (!this.isDisabled(item)) {
        item.isSelected = !item.isSelected
        if (multiple && !showCheckbox) {
          onNodeClick(
            cloneLoop({
              id: this.getNodeKey(item),
              label: this.getNodeLabel(item),
              isSelected: !item.isSelected,
            }),
            this.getSelectNodes()
          )
        } else {
          onNodeClick(
            cloneLoop({
              id: this.getNodeKey(item),
              label: this.getNodeLabel(item),
              isSelected: !item.isSelected,
            }),
            this.getSelectCurNode(this.getNodeKey(item))
          )
        }
      }
    }
    if (showCheckbox && evtName === 'node-label') return

    const hasClassExpand = isExpend && hasClass(evtNode, 'is-expanded')
    if (!expandedKeys) {
      if (!hasClassExpand || (multiple && evtName === 'node-label')) {
        item.isExpanded = true
        item.ExpandedIsChange = true
        ExpandedChangeIdMap[this.getNodeKey(item)] = {
          isExpanded: true,
          ExpandedIsChange: true,
        }
      } else {
        item.isExpanded = false
        item.ExpandedIsChange = true
        ExpandedChangeIdMap[this.getNodeKey(item)] = {
          isExpanded: false,
          ExpandedIsChange: true,
        }
      }
    }
    // parent node
    if (this.getNodeChildren(item)?.length) {
      // toggleClass(evtNode, 'is-expanded');
      if (!hasClassExpand) {
        // onNodeExpand hook
        if (onNodeExpand) {
          onNodeExpand(
            cloneLoop({
              id: this.getNodeKey(item),
              label: this.getNodeLabel(item),
            })
          )
        }
      } else {
        // onNodeCollapse hook
        if (onNodeCollapse) {
          onNodeCollapse(
            cloneLoop({
              id: this.getNodeKey(item),
              label: this.getNodeLabel(item),
            })
          )
        }
      }
    }

    this.updateState(this.state.stateTree)
  }

  execLazyLoad = (evt: any, item: TreeData, otherParams?: ClickOtherParams) => {
    const { lazyLoad, showCheckbox } = this.props
    let evtNode: any
    const { evtName } = otherParams || {}
    if (lazyLoad && typeof lazyLoad === 'function') {
      if (evtName === 'node-label') {
        if (showCheckbox) {
          evtNode = evt?.parentNode?.firstElementChild // 获取小箭头节点
          if (this.props.blockNode) {
            evtNode =
              evt?.parentNode?.parentNode?.firstElementChild.firstElementChild // 获取小箭头节点
          }
        } else {
          evtNode = evt?.previousElementSibling //当前节点的前一个节点
        }
      } else {
        evtNode = evt //当前节点
      }
      // update css
      evtNode.setAttribute('class', 'roo-tree-node-loading-icon')
      // exec lazyLoadFn
      lazyLoad(item).then((newNode: TreeData) => {
        this.appendNode(newNode)
        evtNode.setAttribute('class', 'roo-tree-node-expand-icon')
      })
    } else {
      console.error('[roo-react] lazyLoad must be a function!')
    }
  }

  appendNode = (item: TreeData) => {
    this.resertCurrNode(item)
    const root = this.getRootNode(item)
    if (root) {
      this.factorialNode(this.getNodeChildren(root), root)
      this.updateState(this.state.stateTree)
    }
  }

  resertCurrNode = (item: TreeData) => {
    item.isLeaf = false
    item.isLastNode = false
    item.hasChild = true
    item.isExpanded = true // 动态节点默认展开
  }

  updateState = (data: TreeData[]) => {
    this.setState({
      stateTree: data,
    })
  }

  getRootNode = (node?: TreeData) => {
    if (node && !node.isRoot) {
      this.getRootNode(node.parent)
    }
    return node
  }

  onDisabledClick = (event: any) => {
    event.persist()
    event.stopPropagation()
  }

  renderCheckbox = (item: TreeData) => {
    const { showCheckbox } = this.props
    if (!showCheckbox) {
      return null
    }

    const checkedStyle = classNames('custom-checkbox', {
      'half-checked': item.childCheckedStatus === 3,
    })

    return (
      <label className="roo-checkbox">
        {this.isDisabled(item) ? (
          <input
            className="tree-input"
            type="checkbox"
            disabled
            checked={!!item.isChecked}
          />
        ) : (
          <input
            className="tree-input"
            type="checkbox"
            checked={!!item.isChecked}
            onClick={(evt) => {
              evt.persist()
              evt.stopPropagation()
            }}
            onChange={(evt) => {
              this.handleCheckChange(evt, item)
            }}
          />
        )}
        <span className={checkedStyle} />
      </label>
    )
  }

  renderLabel = (item: TreeData) => {
    const { nodeRender } = this.props
    const { searchValue } = this.state

    // nodeRender func render label
    if (nodeRender && typeof nodeRender === 'function') {
      return nodeRender(item, searchValue)
    }
    const label = this.getNodeLabel(item)
    const findIndex: number = label.indexOf(searchValue)
    if (searchValue && findIndex > -1) {
      const start = label.slice(0, findIndex)
      const end = label.slice(findIndex + searchValue.length)
      return (
        <>
          {item.icon ? (
            <span
              style={{ display: 'inline-block' }}
              className="roo-tree-node-icon"
            >
              {item.icon}
            </span>
          ) : null}
          {start}
          <span style={{ color: 'red' }} className="roo-tree-search-label">
            {searchValue}
          </span>
          {end}
        </>
      )
    }

    // default label
    return (
      <span>
        {item.icon ? (
          <span
            style={{ display: 'inline-block' }}
            className="roo-tree-node-icon"
          >
            {item.icon}
          </span>
        ) : null}
        <span>{label}</span>
      </span>
    )
  }

  onDragEnd = (
    startNode: TreeData,
    endNode: TreeData,
    direction: 'top' | 'bottom'
  ) => {
    const startNodeKey = this.getNodeKey(startNode)
    const endNodeKey = this.getNodeKey(endNode)
    if (startNodeKey === endNodeKey) {
      return
    }
    if (this.props.onDragEnd) {
      this.props.onDragEnd({
        startNode: cloneLoop({
          id: startNodeKey,
          label: this.getNodeLabel(startNode),
        }),
        endNode: cloneLoop({
          id: endNodeKey,
          label: this.getNodeLabel(endNode),
        }),
        startParentNode: startNode.parent
          ? cloneLoop({
              id: this.getNodeKey(startNode.parent),
              label: this.getNodeLabel(startNode.parent),
            })
          : undefined,
        endParentNode: endNode.parent
          ? cloneLoop({
              id: this.getNodeKey(endNode.parent),
              label: this.getNodeLabel(endNode.parent),
            })
          : undefined,
        direction,
      })
    }
  }

  onDragging = (targetNode: TreeData, startNode: TreeData) => {
    if (this.props.onDragging) {
      this.props.onDragging(targetNode, startNode)
    }
    // startNode.isExpanded = false
    // startNode.ExpandedIsChange = true
    // this.setState({ targetNode });
    // this.setState({this.state.stateTree})
  }

  setCurrentDirection = (direction: 'top' | 'bottom') => {
    this.setState({ direction })
  }

  // factorial render tree node
  renderDragTree = (data: TreeData[]) => {
    const { nodeKey, lazy, className, style, expandedKeys } = this.props

    if (!data || !data.length) return null

    const ischild = (pn: TreeData, cn: TreeData) => {
      let currentPn = { ...cn.parent } as TreeData
      let result = false
      while (currentPn && this.getNodeKey(currentPn) && !result) {
        if (this.getNodeKey(currentPn) === this.getNodeKey(pn)) {
          result = true
        } else {
          currentPn = { ...currentPn.parent } as TreeData
        }
      }
      return result
    }

    const ononDragEnterOver = (
      event: React.DragEvent<HTMLElement>,
      key: string,
      direction: 'top' | 'bottom',
      dropNode: TreeData
    ) => {
      if (
        this.state.dragingNodeKey === key &&
        direction === this.state.direction
      ) {
        return
      }
      const checkChild = ischild(this.state.startDragNode as any, dropNode)
      let allowDrop = true
      if (
        this.props.dropAllowed &&
        typeof this.props.dropAllowed === 'function'
      ) {
        allowDrop = this.props.dropAllowed(
          this.state.startDragNode as any,
          dropNode,
          direction
        )
      }
      if (checkChild || !allowDrop) {
        this.setState({
          dragingNodeKey: '',
        })
      } else {
        this.onDragging(this.state.startDragNode as any, dropNode)
        this.setState({
          dragingNodeKey: key,
          direction,
        })
      }
    }

    return data.map((node: TreeData, index: number) => (
      <TreeNode
        onDragStart={(
          event: React.DragEvent<HTMLElement>,
          key: string,
          dragNode: TreeData
        ) => {
          this.setState({
            startDragNodeKey: key,
            startDragNode: dragNode,
          })
        }}
        onDragEnd={() => {
          this.setState({
            dragingNodeKey: '',
            direction: 'top',
            startDragNodeKey: '',
          })
        }}
        onDragEnter={ononDragEnterOver}
        onDragOver={ononDragEnterOver}
        onDrop={(
          event: React.DragEvent<HTMLElement>,
          key: string,
          direction: 'top' | 'bottom',
          dropNode: TreeData
        ) => {
          let allowDrop = true
          if (
            this.props.dropAllowed &&
            typeof this.props.dropAllowed === 'function'
          ) {
            allowDrop = this.props.dropAllowed(
              this.state.startDragNode as any,
              dropNode,
              direction
            )
          }
          const checkChild = ischild(this.state.startDragNode as any, dropNode)

          if (checkChild || !allowDrop) {
            this.setState({
              dragingNodeKey: '',
              startDragNodeKey: '',
            })
          }
          this.setState({
            dragingNodeKey: '',
            startDragNodeKey: '',
          })
          this.onDragEnd(this.state.startDragNode as any, dropNode, direction)
        }}
        dragingNodeKey={this.state.dragingNodeKey}
        startDragNodeKey={this.state.startDragNodeKey}
        key={this.getNodeKey(node)}
        expandedKeys={expandedKeys}
        index={index}
        node={node}
        lazy={lazy}
        nodeKey={nodeKey}
        className={className}
        style={style}
        handleClick={this.handleClick}
        renderCheckbox={this.renderCheckbox}
        renderLabel={this.renderLabel}
        direction={this.state.direction}
      >
        {node.hasChild ? this.renderDragTree(this.getNodeChildren(node)) : null}
      </TreeNode>
    ))
  }

  handleExpendAction = (evt: any, node: TreeData, action: string) => {
    const { expandAction } = this.props
    if (expandAction === action) {
      const otherParams = {
        evtName: 'node-label',
        isExpend: true,
      }
      this.handleClick(evt, node, otherParams)
    } else {
      const otherParams = {
        evtName: 'node-label',
        isExpend: false,
      }
      this.handleClick(evt, node, otherParams)
    }
  }

  renderTree = (data: TreeData[]) => {
    const {
      lazy,
      className,
      style,
      expandedKeys,
      switcherIcon,
      expandAction,
      blockNode,
      multiple,
      selectedKey,
    } = this.props
    if (!data || !data.length) return null
    return data.map((node: TreeData) => {
      const nodeId = this.getNodeKey(node)
      const isSelected = !multiple
        ? selectedKey === this.getNodeKey(node)
        : node.isSelected
      const isExpandedNode = expandedKeys
        ? expandedKeys.indexOf(nodeId) > -1
        : node.isExpanded
      return (
        <div
          className={classNames(
            'roo-tree-node',
            {
              'is-expanded': isExpandedNode,
              'is-leaf': !(node.isLeaf && lazy) && node.isLastNode,
            },
            className
          )}
          style={style}
          data-react={nodeId}
          key={nodeId}
        >
          <div
            className={classNames('roo-tree-node-content', {
              disabled: node.isDisabled,
              'roo-tree-is-selected': this.props.showCheckbox
                ? false
                : isSelected,
            })}
          >
            {switcherIcon ? (
              // 叶子节点不展示
              !(node.isLeaf && lazy) && node.isLastNode ? null : (
                <div
                  className={classNames({
                    'custom-tree-node-icon': isExpandedNode,
                  })}
                  onClick={(evt) => {
                    this.handleClick(evt, node)
                  }}
                >
                  {switcherIcon}
                </div>
              )
            ) : (
              <div
                className="roo-tree-node-expand-icon"
                onClick={(evt) => {
                  if (expandAction === 'click') {
                    const otherParams = {
                      isExpend: true,
                    }
                    this.handleClick(evt, node, otherParams)
                  }
                }}
                onDoubleClick={(evt) => {
                  if (expandAction === 'doubleClick') {
                    const otherParams = {
                      isExpend: true,
                    }
                    this.handleClick(evt, node, otherParams)
                  }
                }}
              />
            )}
            {this.renderCheckbox(node)}
            <div
              className={classNames('roo-tree-node-label', {
                'roo-tree-node-label-block': blockNode,
              })}
              onClick={(evt) => {
                if (expandAction === 'click') {
                  this.handleExpendAction(evt, node, 'click')
                }
                if (blockNode && !node.isDisabled) {
                  // 如果占据整行，则可以点击行选中
                  this.handleCheckChange(evt, node, !node.isChecked)
                }
              }}
              onDoubleClick={(evt) => {
                if (expandAction === 'doubleClick') {
                  this.handleExpendAction(evt, node, 'doubleClick')
                }
              }}
            >
              {this.renderLabel(node)}
            </div>
          </div>
          {node.hasChild && isExpandedNode ? (
            <div className="roo-tree-node-children">
              {this.renderTree(this.getNodeChildren(node))}
            </div>
          ) : null}
        </div>
      )
    })
  }

  onSearchValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    this.setState({ searchValue: value })
    const { stateTree } = this.state
    this.setTreeNodeExpanded(stateTree, value)
    if (this.props?.searchInput?.onChange) {
      this.props.searchInput.onChange(e)
    }
    this.setState({ stateTree })
  }

  setTreeNodeExpanded = (stateTree: TreeData[], value: string) => {
    // 节点1 节点2 节点3
    let totalFlag = false
    stateTree.forEach((item: TreeData) => {
      let singleFlag = false
      if (this.getNodeChildren(item)?.length) {
        singleFlag = this.setTreeNodeExpanded(this.getNodeChildren(item), value)
      }
      if (singleFlag) {
        // 展开当前节点，如节点1
        item.isExpanded = true
        item.ExpandedIsChange = true
      } else {
        item.isExpanded = false
        item.ExpandedIsChange = true
      }
      const label = this.getNodeLabel(item)
      // 都转小写去看有没有匹配的值
      const labelToLowerCase = label?.toString()?.toLowerCase() || label
      const valueToLowerCase = value?.toString()?.toLowerCase() || value
      if (labelToLowerCase?.indexOf(valueToLowerCase) > -1 || singleFlag) {
        totalFlag = true
      }
    })
    return totalFlag
  }

  render() {
    const { stateTree } = this.state
    const { search, searchInput, draggable } = this.props

    let treeDom
    if (draggable) {
      const currentTreeDom = this.renderDragTree(stateTree)
      treeDom = <div className="roo-draggable-tree">{currentTreeDom}</div>
    } else {
      treeDom = this.renderTree(stateTree)
    }
    if (search) {
      const searchProps = searchInput || {}
      const { onChange, value, ...rest } = searchProps
      return (
        <div className="roo-search-tree">
          <Input
            {...rest}
            onChange={this.onSearchValueChange}
            value={this.state.searchValue}
          />
          {treeDom}
        </div>
      )
    }
    return treeDom
  }
}

export default Tree

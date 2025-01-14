import {
    InputBaseProps
} from '@roo/roo/Input';

export interface NodeItem {
    id: number | string;
    label: string;
    isSelected?: boolean;
    isChecked?: boolean;
}

/** 展示数据的内部对象构造 */
export interface TreeData {
    /** 节点ID (必须，默认为id) */
    id: string | number;
    /** 节点名称 (必须，默认为label) */
    label: string;
    /** 节点是否禁用 (禁用的节点无 点击事件和选择事件)*/
    disabled?: boolean;
    /** 子节点数组 */
    children?: TreeData[];
    /** 节点是否为叶子节点(lazy为true时有效) */
    isLeaf?: boolean;
    /** 是否有子节点  */
    hasChild?: boolean;
    /** 是否有 checkbox  */
    hasCheckbox?: boolean;
    /** 是否是根节点  */
    isRoot?: boolean;
    /** 是否选中  */
    isChecked?: boolean;
    /** 是否禁止使用  */
    isDisabled?: boolean;
    /** 是否是最后一个节点  */
    isLastNode?: boolean;
    /** 是否展开  */
    isExpanded?: boolean;
    /** 子节点选中状态 1: 不选 2: 全选 3: 半选*/
    childCheckedStatus?: number;
    /**  */
    key?: number;
    /** 父节点 */
    parent?: TreeData;
    /** 节点与父节点的关系 */
    spckey?: string;
    /** 平铺的层级 */
    level?: number;
    /**
     * 自定义图标
     * @version 1.9.0
     * */
    icon?: React.ReactNode;
     
    [propName: string]: any;
}

export interface Data extends Record<string, any> {
    /**
     * 节点数据的唯一 Id
     */
    id?: string | number;
    /**
     * 节点数据名称
     */
    label?: string;
    /**
     * 节点数据是否是叶子结点
     * @default false
     */
    isLeaf?: boolean;
    /**
     * 节点数据是否禁用
     * @default false
     */
    disabled?: boolean;
    /**
     * 节点数据的孩子节点
     * @default []
     */
    children?: Data[];
    /**
     * 自定义图标
     * @version 1.10.0
     * */
    icon?: React.ReactNode;
}

export interface DragNode {
    startNode: NodeItem;
    endNode: NodeItem;
    startParentNode?: NodeItem;
    endParentNode?: NodeItem;
    direction: 'top' | 'bottom';
}

export interface TreeProps {
    /**
     * treeNodes 数据，类型详见下方 TreeNodes Data Props
     * @default []
     */
    data: Data[];
    /**
     * 自定义节点 key 的字段
     * @default id
     */
    nodeKey?: string;
    /**
     * 自定义节点 label 的字段
     * @default label
     */
    nodeLabel?: string;
    /**
     * 自定义节点 children 的字段
     * @default children
     */
    nodeChildren?: string;
    /**
     * 开启 showCheckbox 多选时，设置默认选中的节点
     * @default []
     */
    selectedKeys?: string[] | number[];
    /**
     * 设置单选选中的节点
     */
    selectedKey?: string | number;
    /**
     * 是否显示checkbox，支持多选
     * @default false
     */
    showCheckbox?: boolean;
    /**
     * 是否默认展开所有节点
     * @default false
     */
    defaultExpandAll?: boolean;
    /**
     * 展开的指定节点集合
     * @default []
     */
    defaultExpandedKeys?: string[] | number[];
    /**
     * 是否懒加载子节点，需与lazyLoad方法结合使用
     * @default false
     */
    lazy?: boolean;
    /**
    * 是否可搜索
    * @default false
    * @version 1.9.0
    * */
    search?: boolean;
    /**
    * 搜索输入框属性
    * @version 1.9.0
    * */
    searchInput?: InputBaseProps;
    /**
    * 是否可拖拽
    * @default false
    * @version 1.9.0
    * */
    draggable?: boolean;
    /**
     * 自定义展开节点
     * @version 1.10.0
     * */
    expandedKeys?: string[];
    /**
     * 自定义展开收起图标
     * @version 1.10.0
     * */
    switcherIcon?: React.ReactNode;
    /**
     * 是否禁用
     * @default false
     * @version 1.12.4
     */
    disabled?: boolean;
    /**
     * 节点展开方式，可选：false | click | doubleClick
     * @default click
     * @version 1.12.5
     */
    expandAction?: string | boolean;
    /**
     * 非checkbox时，是否可以多选
     * @default false
     * @version 1.12.6
     */
    multiple?: boolean;
    /**
     * checkbox 状态下节点选择完全受控（父子节点选中状态不再关联）
     * @default true
     * @version 1.12.7
     */
    checkStrictly?: boolean;
    /**
     * 仅可选择叶子节点（单选多选均适用）
     * @default false
     * @version 1.12.15
     */
    parentDisabled?: boolean;
    /** 是否节点占据一行, 点击行则可以选择节点
     * @default false
     * @version 1.12.35
     */
    blockNode?: boolean;
    /**
     * 多选情况下，是否强制受控，true的话，只有onChange更新 selectKeys 才可以选中节点
     * @default false
     * @version 1.14.0
     */
    controlled?: boolean;
    /**
     * 是否自动展开父节点
     *  @default false
     * @version 1.14.0
     */
    autoExpandParent?: boolean;
    /** 自定义 Tree 的类名 */
    className?: string;
    /** 自定义 Tree 的内联样式 */
    style?: React.CSSProperties;
    /** 懒加载函数，返回 Promise */
    lazyLoad?: (node: TreeData) => any;
    /** 自定义树节点格式 */
    nodeRender?: (node: TreeData, searchValue?: string) => React.ReactNode;
    /** 节点被点击时的事件回调 */
    onNodeClick?: (node: NodeItem, nodes: TreeData[]) => void;
    /** 节点被展开时的事件回调 */
    onNodeExpand?: (node: NodeItem) => void;
    /** 节点被收起时的事件回调 */
    onNodeCollapse?: (node: NodeItem) => void;
    /** 节点选中项改变的事件回调 */
    onCheckChange?: (node: NodeItem, nodes: TreeData[], checkedKeys?: string[] | number[]) => void;
    /** 获取选中节点，showCheckbox 开启时生效 */
    getCheckedNodes?: () => void;
    /**
     * 设置选中节点，showCheckbox 开启时生效
     * @version 1.9.2 修复
     * */
    setCheckedNodes?: (id: string[] | number[]) => void;
    /**
     * 设置不选中某些节点，showCheckbox 开启时生效
     * @version 1.9.2 修复
     * */
    setNotCheckedNodes?: (id: string[] | number[]) => void;
    /** 清空选中节点，showCheckbox 开启时生效 */
    clearCheckedNodes?: () => void;
    /** 全选，showCheckbox 开启时生效*/
    checkAll?: () => void;
    /** 清空所有节点，showCheckbox 开启时生效 */
    clearAll?: () => void;
    /**
     * 拖拽结束回调函数
     * @version 1.9.0
     * */
    onDragEnd?: (node: DragNode) => void;
    /**
     * 拖拽时回调函数
     * @version 1.9.0
     * */
    onDragging?: (startNode: TreeData, endNode: TreeData) => void;
    /**
     * 拖拽时是是否允许拖拽时放置在该节点, 返回false时表示不可放置
     * @version 1.11.3
     * */
    dropAllowed?: (startNode: TreeData, dropNode: TreeData, direction: 'top' | 'bottom') => boolean;
}

export interface TreeState {
    copyState: Data[];
    stateTree: TreeData[];
    flatState: TreeData[];
    selectedKeys: any[];
    searchValue: string;
    direction: 'top' | 'bottom';
    startDragNodeKey: string;
    dragingNodeKey: string;
    startDragNode?: TreeData;
    selectedKeysNode?: TreeData[];
}

export interface ClickOtherParams {
    evtName?: string;
    isExpend?: boolean;
}

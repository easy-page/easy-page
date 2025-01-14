import type { FC } from 'react'
import { useRef } from 'react'
import * as React from 'react'
// import { useDrag, useDrop } from 'react-dnd';
import classNames from 'classnames'
import { TreeData, ClickOtherParams } from './interface'

export interface CardProps {
  index: number
  node: TreeData
  className?: string
  children?: React.ReactNode
  nodeKey?: string
  handleClick: (
    evt: any,
    node: TreeData,
    otherParams?: ClickOtherParams
  ) => void
  renderCheckbox: (node: TreeData) => void
  renderLabel: (node: TreeData, index: number) => React.ReactNode
  lazy?: boolean
  style?: React.CSSProperties
  direction: 'top' | 'bottom'
  expandedKeys?: string[]
  switcherIcon?: React.ReactNode
  startDragNodeKey: string
  dragingNodeKey: string
  // 事件
  onDragEnd: (event: React.DragEvent<HTMLElement>) => void
  onDrop: (
    event: React.DragEvent<HTMLElement>,
    startNodeKey: string,
    direction: 'top' | 'bottom',
    drop: TreeData
  ) => void
  onDragStart: (
    event: React.DragEvent<HTMLElement>,
    startNodeKey: string,
    startNode: TreeData
  ) => void
  onDragOver: (
    event: React.DragEvent<HTMLElement>,
    dropNodeKey: string,
    direction: 'top' | 'bottom',
    dropNode: TreeData
  ) => void
  onDragEnter: (
    event: React.DragEvent<HTMLElement>,
    dropNodeKey: string,
    direction: 'top' | 'bottom',
    dropNode: TreeData
  ) => void
}

const Card: FC<CardProps> = (props: CardProps) => {
  const { index, node, nodeKey = 'id' } = props
  const ref = useRef<HTMLDivElement>(null)

  // const opacity = isDragging ? 0.5 : 1;
  const opacity = props.startDragNodeKey === props?.node[nodeKey] ? 0.5 : 1
  // drag(drop(ref));
  let isTarget = false
  if (props.dragingNodeKey) {
    if (props.node[nodeKey] === props.dragingNodeKey) {
      isTarget = true
    }
  }
  const isExpandedNode = props.expandedKeys?.length
    ? props.expandedKeys.indexOf(props.node[nodeKey]) > -1
    : props.node.isExpanded

  const getDirection = (event: React.DragEvent<HTMLElement>) => {
    const { top, height } = (
      event.target as HTMLElement
    ).getBoundingClientRect()
    const { clientY } = event
    let direction: 'top' | 'bottom'
    if (clientY < top + height / 2) {
      direction = 'top'
    } else {
      direction = 'bottom'
    }
    return direction
  }

  const onDragStart = (event: React.DragEvent<HTMLElement>) => {
    event.stopPropagation()
    if (props.onDragStart) {
      props.onDragStart(event, props.node[nodeKey], props.node)
    }
  }

  const onDragEnd = (event: React.DragEvent<HTMLElement>) => {
    event.stopPropagation()
    if (props.onDragEnd) {
      props.onDragEnd(event)
    }
  }

  const onDragOver = (event: React.DragEvent<HTMLElement>) => {
    const direction = getDirection(event)
    if (props.onDragOver) {
      props.onDragOver(event, props.node[nodeKey], direction, props.node)
    }
    event.preventDefault()
    event.stopPropagation()
  }

  const onDragLeave = (event: React.DragEvent<HTMLElement>) => {
    event.preventDefault()
    event.stopPropagation()
  }

  const onDrop = (event: React.DragEvent<HTMLElement>) => {
    const direction = getDirection(event)
    if (props.onDrop) {
      props.onDrop(event, props.node[nodeKey], direction, props.node)
    }
    event.preventDefault()
    event.stopPropagation()
  }

  const onDragEnter = (event: React.DragEvent<HTMLElement>) => {
    const direction = getDirection(event)
    if (props.onDragEnter) {
      props.onDragEnter(event, props.node[nodeKey], direction, props.node)
    }
    event.preventDefault()
    event.stopPropagation()
  }
  return (
    <div
      className="drag-roo-tree-node-container"
      ref={ref}
      style={{ opacity }}
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDrop={onDrop}
      onDragEnter={onDragEnter}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
    >
      <div
        className={classNames(
          'roo-tree-node',
          {
            'is-expanded': isExpandedNode,
            'is-leaf':
              !(props.node.isLeaf && props.lazy) && props.node.isLastNode,
          },
          props.className
        )}
        style={props.style}
        data-react={props.node[nodeKey]}
        key={props.node[nodeKey]}
      >
        <div
          key={props.direction}
          className={classNames('roo-tree-node-content', {
            disabled: props.node.isDisabled,
            'roo-tree-is-selected': props.node.isSelected,
          })}
          style={{
            borderBottom:
              props.direction === 'bottom' && isTarget
                ? '1px solid #67697F'
                : 'unset',
            borderTop:
              props.direction === 'top' && isTarget
                ? '1px solid #67697F'
                : 'unset',
            backgroundColor: isTarget ? '#F7F8FA' : 'unset',
          }}
        >
          {
             
            props.switcherIcon ? (
              // 叶子节点不展示
              !(node.isLeaf && props.lazy) && node.isLastNode ? null : (
                <div
                  className={classNames({
                    'custom-tree-node-icon': isExpandedNode,
                  })}
                  onClick={(evt) => {
                    props.handleClick(evt, props.node)
                  }}
                >
                  {props.switcherIcon}
                </div>
              )
            ) : (
              <div
                className="roo-tree-node-expand-icon"
                onClick={(evt) => {
                  props.handleClick(evt, props.node)
                }}
              />
            )
          }
          {props.renderCheckbox(props.node) as any}
          <div
            className="roo-tree-node-label"
            onClick={(evt) => {
              const otherParams = {
                evtName: 'node-label',
              }
              props.handleClick(evt, props.node, otherParams)
            }}
          >
            {props.renderLabel(props.node, index)}
          </div>
        </div>
        {props.children ? (
          <div className="roo-tree-node-children">{props.children}</div>
        ) : null}
      </div>
    </div>
  )
}

Card.defaultProps = {
  nodeKey: 'id',
  className: '',
  lazy: false,
  expandedKeys: undefined,
  switcherIcon: undefined,
  style: undefined,
  children: undefined,
}

export default Card

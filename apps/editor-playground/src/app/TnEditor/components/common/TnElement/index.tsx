import { RenderElementProps } from 'slate-react';
import classNames from 'classnames';
import { CustomElement } from '../../../interface';
import { useEditorElementRefs } from '../../../store';
import React, { useMemo, useRef } from 'react';
import { isEmptyNode } from '../../../slate/utils/isEmptyNode';
import { composeRefs } from '../../../hooks';
import { splitChildren } from '../../../plugins/utils/splitChildren';
// import { ElementToolbar } from '../ElementToolbar';

export type TnElementProps = RenderElementProps & {
  wrapperClassName?: string;
  blockNodeClassName?: string;
  blockNodeStyle?: React.CSSProperties;
  nodeChildrenClassName?: string;
  nodeChildrenStyle?: React.CSSProperties;
  addAfter?: React.ReactNode;
  addBeforeText?: React.ReactNode;
  addAfterText?: React.ReactNode;
  textContentClass?: React.ReactNode;
  // CustomText?: React.FC<{ children: React.ReactNode }>;
};

/**
 * - 所有组件都需要包一层这个组件
 * - 用于统一处理，如：选中、拖拽等能力
 * @param param0
 * @returns
 */
export const TnElement = ({
  wrapperClassName,
  blockNodeClassName,
  nodeChildrenClassName,
  nodeChildrenStyle,
  addAfterText,
  blockNodeStyle,
  addBeforeText,
  children,
  element,
  addAfter,
  textContentClass,
  attributes,
}: TnElementProps) => {
  const node = element as CustomElement;
  // console.log('nodenode:', node);
  const setRefs = useEditorElementRefs();
  const elementRef = useRef<HTMLDivElement>(null);
  const isEmpty = useMemo(() => isEmptyNode(node), [node]);
  const { elementChildren, textChildren } = splitChildren(children);
  return (
    <div
      className={classNames('tn-elemnet block relative mb-1 pl-1', {
        'bg-[#D8E0FB] rounded': node.selected,
      })}
    >
      <div className={classNames('block-wrapper', wrapperClassName)}>
        <div
          className={classNames('block-node', blockNodeClassName, {
            isEmpty: isEmpty,
          })}
          style={blockNodeStyle}
          data-block-id={element.id}
          data-block-type={element.type}
          {...attributes}
          ref={composeRefs(attributes.ref, (ref) => {
            if (!elementRef.current) {
              elementRef.current = ref;
              setRefs({
                id: element.id,
                ref: elementRef,
              });
            }
          })}
        >
          {addBeforeText}
          {/** pr-1 如果不写，在 ul 里会看不到光标 */}
          <div className={classNames('text-content', textContentClass)}>
            {textChildren}
          </div>
          {addAfterText}
        </div>
        <div
          className={classNames('block-node-children', nodeChildrenClassName)}
          style={nodeChildrenStyle}
        >
          {elementChildren}
        </div>
        {addAfter}
      </div>
    </div>
  );
};

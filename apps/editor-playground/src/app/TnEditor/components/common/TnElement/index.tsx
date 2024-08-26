import { RenderElementProps } from 'slate-react';
import classNames from 'classnames';
import { CustomElement } from '../../../interface';
// import { ElementToolbar } from '../ElementToolbar';

export type TnElementProps = RenderElementProps;

/**
 * - 所有组件都需要包一层这个组件
 * - 用于统一处理，如：选中、拖拽等能力
 * @param param0
 * @returns
 */
export const TnElement = ({
  children,
  element,
  attributes,
}: TnElementProps) => {
  const node = element as CustomElement;
  return (
    <div className="tn-element">
      <div
        className={classNames('relative mb-1 pl-1', {
          'bg-[#D8E0FB] rounded': node.selected,
        })}
        data-block-id={element.id}
        {...attributes}
      >
        {children}
      </div>
    </div>
  );
};

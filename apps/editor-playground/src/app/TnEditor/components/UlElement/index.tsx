import { RenderElementProps } from 'slate-react';
import { splitChildren } from '../../plugins/utils/splitChildren';
import { CustomElement } from '../../interface';
import { UL_LIST_ICON } from '../../constants';
import { useIndentTips } from '../../hooks';
import classNames from 'classnames';
import { Tips } from '../Tips';

const IconMap: Record<UL_LIST_ICON, React.ReactNode> = {
  [UL_LIST_ICON.FilledCircle]: <>•</>,
  [UL_LIST_ICON.OutlineCircle]: <>◦</>,
  [UL_LIST_ICON.Rect]: <>▪</>,
};

const getIcon = (element: CustomElement) => {
  const level = element.level || 0;
  if (level % 3 === 0) {
    return IconMap.Rect;
  }
  if (level % 3 === 1) {
    return IconMap.filledCircle;
  }
  if (level % 3 === 2) {
    return IconMap.OutlineCircle;
  }
  return IconMap.Rect;
};

export const UlElement = ({
  children,
  element,
  attributes,
}: RenderElementProps) => {
  const { textChildren, elementChildren } = splitChildren(children);
  console.log('elementelementelement handle done:', elementChildren);
  const node = element as CustomElement;
  const Icon = getIcon(node);
  const { indentClass, showText } = useIndentTips(node);
  return (
    <div
      className={classNames('list-wrapper bullet-list relative pl-1 mb-1', {
        'bg-[#D8E0FB] rounded': node.selected,
      })}
    >
      <div
        className={classNames(
          'list list-style-group-1 flex flex-row mb-2',
          indentClass
        )}
      >
        <div contentEditable={false} className="mr-1 select-none">
          <div className="bullet-dot-style text-[#1456F0]">{Icon}</div>
        </div>
        <div className={classNames('list-content pr-1')} {...attributes}>
          {textChildren}
          {showText && <Tips msg={'无法缩进当前内容块'} />}
        </div>
      </div>
      <div className="list-children ml-4">{elementChildren}</div>
    </div>
  );
};

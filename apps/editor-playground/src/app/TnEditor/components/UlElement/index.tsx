import { RenderElementProps } from 'slate-react';
import { splitChildren } from '../../plugins/utils/splitChildren';
import { UlElement as UlElementType } from '../../interface';
import { UL_LIST_ICON } from '../../constants';
import { useIndentTips } from '../../hooks';
import classNames from 'classnames';

const IconMap: Record<UL_LIST_ICON, React.ReactNode> = {
  [UL_LIST_ICON.FilledCircle]: <>•</>,
  [UL_LIST_ICON.OutlineCircle]: <>◦</>,
  [UL_LIST_ICON.Rect]: <>▪</>,
};

const getIcon = (element: UlElementType) => {
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
  console.log('handle done:', elementChildren);
  const Icon = getIcon(element as UlElementType);
  const { indentClass } = useIndentTips(element as UlElementType);
  return (
    <div className="list-wrapper bullet-list relative">
      <div
        className={classNames(
          'list list-style-group-1 flex flex-row',
          indentClass
        )}
      >
        <div contentEditable={false} className="mr-1 select-none">
          <div className="bullet-dot-style">{Icon}</div>
        </div>
        <div className={classNames('list-content pr-1')} {...attributes}>
          {textChildren}
        </div>
      </div>
      <div className="list-children ml-4">{elementChildren}</div>
    </div>
  );
};

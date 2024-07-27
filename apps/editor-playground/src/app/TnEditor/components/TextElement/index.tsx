import classNames from 'classnames';
import { RenderElementProps } from 'slate-react';
import { splitChildren } from '../../plugins/utils/splitChildren';
import { Draggable } from '../Draggable';
import { useIndentTips } from '../../hooks';
import { TextElement } from '../../interface';

export const TextComponent = ({
  element,
  attributes,
  children,
}: RenderElementProps) => {
  const { elementChildren, textChildren } = splitChildren(children);
  const { indent, indentTip, showAction } = useIndentTips(
    element as TextElement
  );
  return (
    <Draggable>
      <div className="text-block-wrapper" {...attributes}>
        <div
          className={classNames('text-block relative', {
            'ml-4': indent,
            'ml-6': showAction,
            'on-tab-animation': indentTip,
          })}
        >
          {textChildren}
        </div>
        <div className="text-children ml-4">{elementChildren}</div>
      </div>
    </Draggable>
  );
};

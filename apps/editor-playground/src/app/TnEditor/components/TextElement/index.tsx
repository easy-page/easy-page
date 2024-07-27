import classNames from 'classnames';
import { RenderElementProps } from 'slate-react';
import { splitChildren } from '../../plugins/utils/splitChildren';
import { Draggable } from '../Draggable';
import { useEditorRef, useIndentTips } from '../../hooks';
import { TextElement } from '../../interface';
import { Tips } from '../Tips';
import { getCurNodeInfo } from '../../plugins/default/events/onTabDown/utils/getCurNodeInfo';

export const TextComponent = ({
  element,
  attributes,
  children,
}: RenderElementProps) => {
  const { elementChildren, textChildren } = splitChildren(children);
  const { indent, indentTip, showAction, showText } = useIndentTips(
    element as TextElement
  );
  const editor = useEditorRef();
  const { lastNode } = getCurNodeInfo(editor);
  const msg = lastNode ? '当前已到达最大缩进层级' : '无法缩进当前内容块';

  return (
    <Draggable>
      <div className="text-block-wrapper relative" {...attributes}>
        <div
          className={classNames('text-block', {
            'ml-4': !indentTip && indent,
            'tab-animation': showAction,
            'on-tab-animation-text': indentTip,
          })}
        >
          {textChildren}
        </div>
        <div className="text-children ml-4">{elementChildren}</div>
        {showText && <Tips msg={msg} />}
      </div>
    </Draggable>
  );
};

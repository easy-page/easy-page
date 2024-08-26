import classNames from 'classnames';
import { RenderElementProps } from 'slate-react';
import { useIndentTips, useEditorRef } from '../../../hooks';
import { CustomElement } from '../../../interface';
import { getCurNodeInfo } from '../../../plugins/default/events/utils/getCurNodeInfo';
import { splitChildren } from '../../../plugins/utils/splitChildren';
import { TnElement, Tips } from '../../common';

export const TextComponent = (props: RenderElementProps) => {
  const { element, children } = props;
  const { elementChildren, textChildren } = splitChildren(children);
  const node = element as CustomElement;
  const { indent, indentTip, showAction, showText } = useIndentTips(node);

  const editor = useEditorRef();
  const { lastNode } = getCurNodeInfo(editor);
  const msg = lastNode ? '当前已到达最大缩进层级' : '无法缩进当前内容块';

  return (
    <TnElement {...props}>
      <div className={classNames('text-block-wrapper')}>
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
    </TnElement>
  );
};

import classNames from 'classnames';
import { RenderElementProps } from 'slate-react';
import { useIndentTips, useEditorRef } from '../../../hooks';
import { CustomElement } from '../../../interface';
import { getCurNodeInfo } from '../../../plugins/default/events/utils/getCurNodeInfo';
import { TnElement, Tips } from '../../common';

export const TextComponent = (props: RenderElementProps) => {
  const { element } = props;
  const node = element as CustomElement;
  const { indent, indentTip, showAction, showText } = useIndentTips(node);

  const editor = useEditorRef();
  const { lastNode } = getCurNodeInfo(editor);
  const msg = lastNode ? '当前已到达最大缩进层级' : '无法缩进当前内容块';

  return (
    <TnElement
      wrapperClassName="text-block-wrapper"
      blockNodeClassName={classNames('text-block', {
        'ml-4': !indentTip && indent,
        'tab-animation': showAction,
        'on-tab-animation-text': indentTip,
      })}
      nodeChildrenClassName="text-children ml-4"
      addAfter={showText && <Tips msg={msg} />}
      {...props}
    ></TnElement>
  );
};

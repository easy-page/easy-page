import classNames from 'classnames';
import { useState, useEffect } from 'react';
import { RenderElementProps } from 'slate-react';
import { useEditorRef } from '../../hooks';
import { splitChildren } from '../../plugins/utils/splitChildren';
import { unsetBlockProperties } from '../../slate/transform';
import { Draggable } from '../Draggable';
import { Tips } from '../Tips';
import { TextElement } from '../../interface';

export const TextComponent = ({
  element,
  attributes,
  children,
}: RenderElementProps) => {
  const { elementChildren, textChildren } = splitChildren(children);
  console.log('attributes11:', elementChildren, textChildren);
  const editor = useEditorRef();

  /** 展示动作 */
  const [showAction, setShowAction] = useState(false);
  /** 展示文本 */
  const [showText, setShowText] = useState(false);
  // const [shouldAnimate, setShouldAnimate] = useState(false);
  const indentTip = (element as TextElement).indentTip;
  const indent = (element as TextElement).indent;

  useEffect(() => {
    if (indentTip) {
      setShowAction(true);
      setShowText(true);
      setTimeout(() => {
        unsetBlockProperties(editor, ['indentTip']);
      }, 10);
      setTimeout(() => {
        setShowAction(false);
      }, 500);
      setTimeout(() => {
        setShowText(false);
      }, 1500);
    }
  }, [indentTip]);

  return (
    <Draggable>
      <div className="text-block-wrapper relative" {...attributes}>
        {showText && <Tips msg={'无法缩进当前内容快'} />}
        <div
          className={classNames('text-block ', {
            'indent-4': indent,
            'tab-animation': showAction,
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

import { useState, useEffect } from 'react';
import { CommonProperties, CustomElement } from '../interface';
import { unsetBlockProperties } from '../slate/transform';
import { useEditorRef } from './useEditorRef';

export const useIndentTips = (element: CustomElement) => {
  /** 展示动作 */
  const [showAction, setShowAction] = useState(false);
  /** 展示文本 */
  const [showText, setShowText] = useState(false);
  // const [shouldAnimate, setShouldAnimate] = useState(false);
  const indentTip = (element as CommonProperties).indentTip;
  const indent = (element as CommonProperties).indent;
  const editor = useEditorRef();

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
  return {
    showAction,
    showText,
    indent,
    indentTip,
    indentClass: {
      // 'ml-4': indent,
      'tab-animation': showAction,
      'on-tab-animation': indentTip,
    },
  };
};

/** 获取当前鼠标所在节点 */
import { Editor } from 'slate';
import { isBlockElement } from '../utils';

export const getCurNode = (editor: Editor) => {
  return (
    Editor.above(editor, {
      match: (n) => {
        return isBlockElement(n, editor);
      },
    }) || []
  );
};

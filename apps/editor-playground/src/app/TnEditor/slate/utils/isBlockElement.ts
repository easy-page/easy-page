import { Editor, Element, Node } from 'slate';
import { CustomEditor } from '../../interface';

export const isBlockElement = (n: Node, editor: CustomEditor) => {
  return Element.isTnElement(n) && Editor.isBlock(editor, n);
};

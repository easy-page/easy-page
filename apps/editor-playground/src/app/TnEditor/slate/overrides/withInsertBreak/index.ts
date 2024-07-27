import { Editor } from 'slate';
import { getCurNodeInfo } from '../../../plugins/default/events/onTabDown/utils/getCurNodeInfo';
import { DEFAULT_ELEMENT_TYPE } from '../../../constants';
import { isListElement } from '../../utils';
import { isEmptyTextNode } from '../../utils/isEmptyTextNode';

export const withInsertBreak = (editor: Editor) => {
  const { insertBreak } = editor;
  editor.insertBreak = () => {
    const { lastNode, curNode } = getCurNodeInfo(editor);
    if (!lastNode || !curNode) {
      insertBreak();
      return;
    }
    if (
      isListElement(lastNode.node) &&
      isListElement(curNode.node) &&
      isEmptyTextNode(curNode.node)
    ) {
      editor.setNodes({
        type: DEFAULT_ELEMENT_TYPE,
        children: [{ text: '' }],
      });
      return;
    }
    insertBreak();
  };
  return editor;
};

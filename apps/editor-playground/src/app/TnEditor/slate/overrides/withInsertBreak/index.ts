import { Editor } from 'slate';

import { isListElement } from '../../utils';
import { isEmptyTextNode } from '../../utils/isEmptyTextNode';
import { getCurNodeInfo } from '../../../plugins/default/events/utils/getCurNodeInfo';
import { replaceWithNormalNode } from '../../transform/replaceWithNormalNode';
import { addNormalNode } from '../../transform';

export const withInsertBreak = (editor: Editor) => {
  const { insertBreak } = editor;
  editor.insertBreak = () => {
    const { curNode } = getCurNodeInfo(editor);
    if (!curNode) {
      console.log('【回车】无当前元素');
      insertBreak();
      return;
    }

    /**
     * - 当前行非列表元素，直接插入空元素
     */
    if (!isListElement(curNode.node)) {
      console.log('【回车】当前非列表元素');
      addNormalNode(editor, { curNode });
      return;
    }

    /**
     * - 当前行是列表空元素，按回车，则插入默认元素
     */
    if (isListElement(curNode.node) && isEmptyTextNode(curNode.node)) {
      console.log('【回车】替换当前元素');
      replaceWithNormalNode(editor, { curNode });
      return;
    }
    insertBreak();
  };

  return editor;
};

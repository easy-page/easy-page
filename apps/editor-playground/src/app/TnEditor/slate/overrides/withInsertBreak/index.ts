import { Editor } from 'slate';

import { isListElement } from '../../utils';
import { isEmptyTextNode } from '../../utils/isEmptyTextNode';
import { getCurNodeInfo } from '../../../plugins/default/events/utils/getCurNodeInfo';
import { ElementTypeEnum } from '../../../constants';

export const withInsertBreak = (editor: Editor) => {
  const { insertBreak } = editor;
  editor.insertBreak = () => {
    const { lastNode, curNode } = getCurNodeInfo(editor);
    if (!lastNode || !curNode) {
      insertBreak();
      return;
    }
    console.log('lastNodelastNodelastNode:', lastNode);
    if (
      isListElement(lastNode.node) &&
      isListElement(curNode.node) &&
      isEmptyTextNode(curNode.node)
    ) {
      editor.withoutNormalizing(() => {
        // 删除当前节点
        editor.removeNodes({ at: curNode.path });

        const newNodePath = [lastNode.path[0] + 1];
        // 添加一个新的节点
        editor.insertNodes(
          {
            type: ElementTypeEnum.P,
            children: [{ text: '' }],
          },
          { at: newNodePath }
        );
        editor.select(newNodePath);
      });

      return;
    }
    insertBreak();
  };

  return editor;
};

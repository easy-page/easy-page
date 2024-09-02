import { generateElementId } from 'slate';
import { ElementTypeEnum } from '../../constants';
import { CustomEditor } from '../../interface';
import { NodeInfo } from '../../plugins/default/events/utils/getCurNodeInfo';

export const insertWithNormalNode = (
  editor: CustomEditor,
  {
    curNode,
  }: {
    /** 当前节点 */
    curNode: NodeInfo;
  }
) => {
  editor.withoutNormalizing(() => {
    /**
     * - 如果这里：curNode.path[0] + 1，那在删除的时候，就没有这个元素了。
     */
    const newNodePath =
      curNode.path[0] !== undefined ? [curNode.path[0] + 1] : [];
    if (newNodePath.length === 0) {
      return [];
    }

    // 添加一个新的节点
    editor.insertNodes(
      {
        type: ElementTypeEnum.P,
        children: [{ text: '' }],
        id: generateElementId(),
      },
      { at: newNodePath }
    );
    editor.select(newNodePath);
  });
};

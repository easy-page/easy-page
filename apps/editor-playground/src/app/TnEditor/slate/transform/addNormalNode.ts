import { ElementTypeEnum } from '../../constants';
import { CustomEditor } from '../../interface';
import { NodeInfo } from '../../plugins/default/events/utils/getCurNodeInfo';

export const addNormalNode = (
  editor: CustomEditor,
  {
    curNode,
  }: {
    /** 当前节点 */
    curNode: NodeInfo;
  }
) => {
  editor.withoutNormalizing(() => {
    const newNodePath = [curNode.path[0] + 1];
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
};

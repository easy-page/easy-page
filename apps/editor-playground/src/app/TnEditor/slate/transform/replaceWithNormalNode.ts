import { ElementTypeEnum } from '../../constants';
import { CustomEditor } from '../../interface';
import { NodeInfo } from '../../plugins/default/events/utils/getCurNodeInfo';

export const replaceWithNormalNode = (
  editor: CustomEditor,
  {
    curNode,
  }: {
    /** 当前节点 */
    curNode: NodeInfo;
  }
) => {
  editor.withoutNormalizing(() => {
    // 删除当前节点
    editor.removeNodes({ at: curNode.path });

    const newNodePath = [curNode.path[0]];
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

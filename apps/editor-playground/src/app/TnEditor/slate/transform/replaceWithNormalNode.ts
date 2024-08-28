import { generateId } from '@easy-page/antd-ui';
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
    const newNodePath =
      curNode.path[0] !== undefined ? [curNode.path[0] + 1] : [];
    if (newNodePath.length === 0) {
      return [];
    }
    // 删除当前节点
    editor.removeNodes({ at: curNode.path });

    // 添加一个新的节点
    editor.insertNodes(
      {
        type: ElementTypeEnum.P,
        children: [{ text: '' }],
        id: generateId('replace'),
      },
      { at: newNodePath }
    );
    editor.select(newNodePath);
  });
};

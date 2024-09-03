import { generateElementId, Path } from 'slate';
import { ElementTypeEnum } from '../../constants';
import { CustomEditor } from '../../interface';
import { NodeInfo } from '../../plugins/default/events/utils/getCurNodeInfo';

export const getNewPath = ({
  inCurrentNode,
  path,
}: {
  inCurrentNode?: boolean;
  path: Path;
}) => {
  if (!path) {
    return [];
  }
  if (inCurrentNode) {
    return path;
  }

  // 在当前的一级父节点做替换
  // 如果当前已经是一级父亲节点，则替换自己
  if (path.length === 1) {
    return path;
  }
  // 如果当前不是一级父亲节点，则在下一个节点插入
  return [path[0] + 1];
};

/**
 *
 * @param editor
 * @param param1
 */
export const replaceWithNormalNode = (
  editor: CustomEditor,
  {
    curNode,
    inCurrentNode,
  }: {
    /** 当前节点 */
    curNode: NodeInfo;
    inCurrentNode?: boolean; // 在当前节点做替换
  }
) => {
  editor.withoutNormalizing(() => {
    console.log('curNodecurNode:', curNode);
    const newNodePath = getNewPath({ inCurrentNode, path: curNode.path });
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
        id: generateElementId(),
      },
      { at: newNodePath }
    );
    editor.select(newNodePath);
  });
};

import { IndentOptions } from './interface';
import { Path } from 'slate';
/**
 * - 第一次缩进，当前节点添加 indent:true 属性
 * - 第二次缩进，当前节点加入到上一个节点 children 中，并提示：无法继续缩进。
 */
export const indentWithMoveNodes = ({ curNodeInfo, editor }: IndentOptions) => {
  const { curNode, lastNode } = curNodeInfo;
  if (!lastNode) {
    return;
  }

  /** TODO: 下一次怎么知道已经移进去了 */
  editor.moveNodes({
    at: curNode?.path,
    to: (lastNode?.path || []).concat(1) as Path,
  });
};

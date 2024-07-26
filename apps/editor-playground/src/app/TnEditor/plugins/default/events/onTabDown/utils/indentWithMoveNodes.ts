import { IndentOptions } from './interface';
import { Editor, Path } from 'slate';
/**
 * - 第一次缩进，当前节点添加 indent:true 属性
 * - 第二次缩进，当前节点加入到上一个节点 children 中，并提示：无法继续缩进。
 */
export const indentWithMoveNodes = ({
  curNode,
  curNodePath,
  lastNode,
  editor,
}: IndentOptions) => {
  const [lastNodeElement, lastNodePath] =
    Editor.above(editor, { at: lastNode.path }) || [];

  if (!lastNodeElement || !lastNodePath) {
    return;
  }

  /** TODO: 下一次怎么知道已经移进去了 */
  editor.moveNodes({
    at: curNodePath,
    to: lastNodePath.concat(1) as Path,
  });
};

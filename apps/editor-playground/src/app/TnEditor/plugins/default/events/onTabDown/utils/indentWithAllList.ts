import { Editor, Path } from 'slate';
import { IndentOptions } from './interface';

/**
 * - 第一次缩进，放入上一个元素的子元素中，层级 + 1
 * - 第二次缩进，不允许缩进，并且提示：无法继续缩进。
 * @param param0
 */
export const indentWithAllList = ({
  curNode,
  curNodePath,
  editor,
  lastNode,
}: IndentOptions) => {
  const [lastNodeElement, lastNodePath] =
    Editor.above(editor, { at: lastNode.path }) || [];

  if (!lastNodeElement || !lastNodePath) {
    return;
  }
  editor.moveNodes({
    at: curNodePath,
    to: lastNodePath.concat(1) as Path,
  });
};

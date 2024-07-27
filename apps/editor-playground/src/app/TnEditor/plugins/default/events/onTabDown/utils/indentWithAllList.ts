import { Path } from 'slate';
import { IndentOptions } from './interface';
import { addBlockProperties } from '../../../../../slate/transform';

/**
 * - 第一次缩进，放入上一个元素的子元素中，层级 + 1
 * - 第二次缩进，不允许缩进，并且提示：无法继续缩进。
 * @param param0
 */
export const indentWithAllList = ({ curNodeInfo, editor }: IndentOptions) => {
  const { lastNode, curNode, inLastNode } = curNodeInfo;
  if (!lastNode || !curNode) {
    return;
  }
  console.log('inLastNode:', inLastNode);
  if (!inLastNode) {
    editor.moveNodes({
      at: curNode.path,
      to: lastNode?.path.concat(1) as Path,
    });
  } else {
    // 给提示
    addBlockProperties(editor, {
      indentTip: true,
    });
    return;
  }
};

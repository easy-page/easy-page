import { IndentOptions } from './interface';
import { moveToChildren } from '../../../../utils/moveToChildren';

/**
 * - 第一次缩进，放入上一个元素的子元素中，层级 + 1
 * - 第二次缩进，不允许缩进，并且提示：无法继续缩进。
 * @param param0
 */
export const indentWithAllList = ({ curNodeInfo, editor }: IndentOptions) => {
  return moveToChildren(editor, { curNodeInfo });
};

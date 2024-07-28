import { IndentOptions } from './interface';
import { moveToChildren } from '../../../../utils/moveToChildren';
/**
 * - 第一次缩进，当前节点添加 indent:true 属性
 * - 第二次缩进，当前节点加入到上一个节点 children 中，并提示：无法继续缩进。
 */
export const indentWithMoveNodes = ({ curNodeInfo, editor }: IndentOptions) => {
  return moveToChildren(editor, { curNodeInfo });
};

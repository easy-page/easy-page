import { IndentOptions } from './interface';
import { getActiveProperties } from '../../../../../actions/toggleProperties';
import { addBlockProperties } from '../../../../../slate/transform';
import { moveToChildren } from '../../../../utils/moveToChildren';
/**
 * - 第一次缩进，当前节点添加 indent:true 属性
 * - 第二次缩进，当前节点加入到上一个节点 children 中，
 * - 第三次无法缩进，并提示：当前内容块已达最大缩进层级。
 */
export const indentWithPropertiesAndMoveNodes = ({
  curNodeInfo,
  editor,
}: IndentOptions) => {
  const activeProperties = getActiveProperties(editor);
  if (!activeProperties.includes('indent')) {
    addBlockProperties(editor, {
      indent: true,
    });
    return;
  }

  moveToChildren(editor, { curNodeInfo });
};

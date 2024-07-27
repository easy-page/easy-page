import { IndentOptions } from './interface';
import { getActiveProperties } from '../../../../../actions/toggleProperties';
import { addBlockProperties } from '../../../../../slate/transform';
import { Editor, Path } from 'slate';
/**
 * - 第一次缩进，当前节点添加 indent:true 属性
 * - 第二次缩进，当前节点加入到上一个节点 children 中，并提示：无法继续缩进。
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

  const { lastNode, curNode, inLastNode } = curNodeInfo;
  if (!lastNode || !curNode) {
    return;
  }

  if (!inLastNode) {
    editor.moveNodes({
      at: curNode?.path,
      to: lastNode?.path.concat(1) as Path,
    });
    return;
  } else {
    console.log('添加提示属性');
    // 给提示
    addBlockProperties(editor, {
      indentTip: true,
    });
    return;
  }
};

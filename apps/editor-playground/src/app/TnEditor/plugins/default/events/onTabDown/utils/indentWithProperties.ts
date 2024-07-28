import { IndentOptions } from './interface';
import { getActiveProperties } from '../../../../../actions/toggleProperties';
import { addBlockProperties } from '../../../../../slate/transform';

/** 第一次添加缩进，第二次提示无法继续缩进 */
export const indentWithProperties = ({
  editor,
  curNodeInfo,
}: IndentOptions) => {
  const activeProperties = getActiveProperties(editor);

  if (!activeProperties.includes('indent')) {
    addBlockProperties(editor, {
      indent: true,
    });
    return;
  }
  // 没有上一个节点，就什么都不做，但是要提示一下
  addBlockProperties(editor, {
    indentTip: true,
  });
  return;
};

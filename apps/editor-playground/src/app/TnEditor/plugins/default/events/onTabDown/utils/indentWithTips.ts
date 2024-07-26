import { IndentOptions } from './interface';
import { addBlockProperties } from '../../../../../slate/transform';

/** 第一次添加缩进，第二次提示无法继续缩进 */
export const indentWithTips = ({ editor }: Omit<IndentOptions, 'lastNode'>) => {
  addBlockProperties(editor, {
    indentTip: true,
  });
  return;
};

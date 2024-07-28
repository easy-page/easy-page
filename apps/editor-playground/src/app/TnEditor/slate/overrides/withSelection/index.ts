import { Editor, Transforms } from 'slate';
import { isSelectAll } from './utils';
import { isBlockElement } from '../../utils';
import { CustomElement } from '../../../interface';

export const withSelection = (editor: Editor) => {
  const { setSelection } = editor;
  editor.setSelection = (range) => {
    const selectAll = isSelectAll(editor, range);
    console.log('ooop:', range, selectAll);

    /**
     * - 非全选的时候，处理一下（取消 ctrl+a 的属性）
     * */
    if (!selectAll) {
      Transforms.unsetNodes(editor, ['selected'], {
        at: [],
        match: (n) =>
          isBlockElement(n, editor) && Boolean((n as CustomElement)?.selected),
      });
    }
    setSelection(range);
  };
  return editor;
};

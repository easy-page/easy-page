import { Editor, Transforms } from 'slate';
import { isSelectAll } from './utils';
import { isBlockElement, isEmptyContent } from '../../utils';
import { CustomElement } from '../../../interface';
import { getActiveProperties } from '../../../actions/toggleProperties';

export const withSelection = (editor: Editor) => {
  const { setSelection } = editor;
  editor.setSelection = (range) => {
    const selectAll = isSelectAll(editor, range);

    const activeProps = getActiveProperties(editor);

    /**
     * - 非全选的时候，处理一下（取消 ctrl+a 的属性）
     * - 当全文只有一个元素的时候，且其没内容，则也需要清空
     * */
    if (
      !selectAll ||
      (isEmptyContent(editor, { ignoreNodeType: true }) &&
        activeProps.includes('selected'))
    ) {
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

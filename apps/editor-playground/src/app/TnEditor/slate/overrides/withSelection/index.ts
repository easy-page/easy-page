import { Editor, Transforms } from 'slate';
import { isSelectAll, isSelectNone } from './utils';
import {
  isBlockElement,
  isEmptyContent,
  isSelectionExpanded,
} from '../../utils';
import { CustomElement } from '../../../interface';
import { getActiveProperties } from '../../../actions/toggleProperties';

export const withSelection = (editor: Editor) => {
  const { select } = editor;
  editor.select = (path, options) => {
    const range = Editor.range(editor, path);

    const selectAll = isSelectAll(editor, range);

    const activeProps = getActiveProperties(editor);

    const hasSelectedProperties = activeProps.includes('selected');
    const isExpand = isSelectionExpanded(editor);
    console.log('isExpandisExpand:', range, isSelectNone(editor, range));

    /**
     * - 非全选的时候，处理一下（取消 ctrl+a 的属性）
     * - 当全文只有一个元素的时候，且其没内容，则也需要清空
     * */
    if (!selectAll && isSelectNone(editor, range)) {
      console.log('isExpandisExpand 4444444 clear');
      Transforms.unsetNodes(editor, ['selected'], {
        at: [],
        match: (n) =>
          isBlockElement(n, editor) && Boolean((n as CustomElement)?.selected),
      });
    }
    select(range);
  };
  return editor;
};

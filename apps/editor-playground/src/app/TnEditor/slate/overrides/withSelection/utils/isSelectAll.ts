import { isEqual } from 'lodash';
import { BaseRange, Editor, NodeEntry } from 'slate';
import { FormattedText } from '../../../../interface';

const getLastNodeOffset = (lastNode: NodeEntry) => {
  const children = lastNode[0] as FormattedText;
  if (Object.keys(children).includes('text')) {
    return children.text?.length;
  }
  return 0;
};

/**
 * - 判断当前是否选择了全文，特征是：第一个元素和最后一个元素被选中
 *   - anchor: offset 0 , path: [0,0]
 */
export const isSelectAll = (editor: Editor, range: Partial<BaseRange>) => {
  const lastNode = editor.last([]);
  const firstNode = editor.first([]);
  return (
    isEqual(range.anchor?.path, firstNode[1]) &&
    isEqual(range.focus?.path, lastNode[1]) &&
    range.anchor?.offset === 0 &&
    range.focus?.offset === getLastNodeOffset(lastNode)
  );
};

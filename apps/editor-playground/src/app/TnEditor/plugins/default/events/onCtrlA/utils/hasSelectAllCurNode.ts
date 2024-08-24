import { Editor } from 'slate';
import { NodeInfo } from '../../utils/getCurNodeInfo';
import { FormattedText } from '../../../../../interface';
import { isEqual } from 'lodash';

/** 判断是否全选了当前节点 */
export const hasSelectAllCurNode = (editor: Editor, curNode?: NodeInfo) => {
  const selection = editor.selection;
  const curNodeText = curNode?.node?.children?.[0] as FormattedText;
  if (!curNodeText || !curNode?.path) {
    return false;
  }

  const lastChild = editor.last(curNode?.path);
  const lastChildLength = (lastChild?.[0] as FormattedText)?.text?.length;
  /**
   * - focus 是当前节点最后一个元素的地址，且 offset 是其 text 的长度
   */
  return (
    selection?.anchor?.offset === 0 &&
    selection?.focus?.offset === lastChildLength &&
    isEqual(selection?.focus?.path, lastChild?.[1])
  );
};

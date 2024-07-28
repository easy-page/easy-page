import { Editor } from 'slate';
import { NodeInfo } from '../../utils/getCurNodeInfo';
import { FormattedText } from '../../../../../interface';

/** 判断是否全选了当前节点 */
export const hasSelectAllCurNode = (editor: Editor, curNode?: NodeInfo) => {
  const selection = editor.selection;
  const curNodeText = curNode?.node?.children?.[0] as FormattedText;
  if (!curNodeText) {
    return false;
  }

  return (
    selection?.anchor?.offset === 0 &&
    selection?.focus?.offset === curNodeText.text?.length
  );
};

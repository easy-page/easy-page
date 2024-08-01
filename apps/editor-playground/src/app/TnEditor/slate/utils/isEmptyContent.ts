import { Editor } from 'slate';
import { CustomElement, CustomText } from '../../interface';
import { DEFAULT_ELEMENT_TYPE } from '../../constants';

export const isEmptyContent = (
  editor: Editor,
  options?: {
    /** 为 true 时：如果只有 1 个节点，但是节点类型不是默认的，文本都是空也算空元素 */
    ignoreNodeType: boolean;
  }
) => {
  const nodes = editor.children || [];
  console.log('isEmptyContent nodes:', nodes);

  // 检查节点的长度
  if (nodes.length === 0) return true;
  if (nodes.length > 1) return false;

  // 检查唯一节点的子节点长度
  const firstNode = nodes[0] as CustomElement;
  const childrenNodes = firstNode.children || [];

  if (firstNode.type !== DEFAULT_ELEMENT_TYPE && !options?.ignoreNodeType)
    return false;
  if (childrenNodes.length === 0) return true;
  if (childrenNodes.length > 1) return false;

  // 检查唯一子节点的文本长度
  return (childrenNodes[0] as CustomText).text?.length === 0;
};

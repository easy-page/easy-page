import { CustomElement } from '../../../../../../TnEditor/interface';
import { getCurNode } from '../../../../../slate/query/getCurNode';
import { Editor } from 'slate';

export type CurNodeInfo = {
  curNode: CustomElement;
};

/**
 * - 获得当前节点位置、节点信息
 * - 获得上一个节点信息
 * - 判断当前节点是否在上一个节点之中
 */
export const getCurNodeInfo = (editor: Editor) => {
  const [curNode, curNodePath] = getCurNode(editor);
};

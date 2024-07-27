import { isEqual } from 'lodash';
import { CustomElement } from '../../../../../../TnEditor/interface';
import { getCurNode } from '../../../../../slate/query/getCurNode';
import { Editor, Path } from 'slate';

export type NodeInfo = {
  node: CustomElement;
  path: Path;
};

export type CurNodeInfo = {
  curNode?: NodeInfo;
  lastNode?: NodeInfo;
  /** 判断当前节点是否在上一个节点 children 中 */
  inLastNode: boolean;
};

/**
 * - 获得当前节点位置、节点信息
 * - 获得上一个节点信息
 * - 判断当前节点是否在上一个节点之中
 */
export const getCurNodeInfo = (editor: Editor): CurNodeInfo => {
  const [curNode, curNodePath] = getCurNode(editor);
  if (!curNode || !curNodePath) {
    return {
      curNode: undefined,
      inLastNode: false,
    };
  }
  /** 查找的上一个节点的文本节点地址 */
  const lastNode = Editor.before(editor, curNodePath);
  if (!lastNode) {
    return {
      curNode: { node: curNode as CustomElement, path: curNodePath },
      inLastNode: false,
    };
  }
  /** 查找上一个节点信息 */
  const [lastNodeInfo, lastNodePath] =
    Editor.above(editor, { at: lastNode.path }) || [];

  if (!lastNodeInfo || !lastNodePath) {
    return {
      curNode: { node: curNode as CustomElement, path: curNodePath },
      inLastNode: false,
    };
  }
  return {
    curNode: { node: curNode as CustomElement, path: curNodePath },
    lastNode: {
      node: lastNodeInfo as CustomElement,
      path: lastNodePath,
    },
    inLastNode: isEqual(
      curNodePath.slice(0, curNodePath.length - 1),
      lastNodePath
    ),
  };
};

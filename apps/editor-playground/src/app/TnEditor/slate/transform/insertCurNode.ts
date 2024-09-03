/* eslint-disable @typescript-eslint/no-explicit-any */
import { generateElementId } from 'slate';
import { CustomEditor } from '../../interface';
import { NodeInfo } from '../../plugins/default/events/utils/getCurNodeInfo';
import { Node } from '@easy-page-slate';

export type InsertCurNodeOptions = {
  /** 当前节点 */
  curNode: NodeInfo;
  excludeProperties?: string[];
  includeProperties?: string[];
};

const getProperties = ({
  curNode,
  excludeProperties = [],
  includeProperties,
}: InsertCurNodeOptions) => {
  const properties = Node.extractProps(curNode.node);
  const result: Record<string, any> = {};
  Object.keys(properties).forEach((each) => {
    // 如果存在，但是不包含当前节点，则不处理
    if (
      (includeProperties && !includeProperties.includes(each)) ||
      excludeProperties.includes(each)
    ) {
      return;
    }

    result[each] = properties[each];
  });
  return result;
};

/**
 * - 插入和当前相同类型的节点，但是 properties 设置为默认的
 * @param editor
 * @param param1
 */
export const insertCurNode = (
  editor: CustomEditor,
  options: InsertCurNodeOptions
) => {
  const { curNode } = options;
  editor.withoutNormalizing(() => {
    /**
     * - 如果这里：curNode.path[0] + 1，那在删除的时候，就没有这个元素了。
     */
    const basePath = curNode.path.slice(0, curNode.path.length - 1);
    const leafPath = curNode.path[curNode.path.length - 1] + 1;
    const newNodePath =
      curNode.path[0] !== undefined ? [...basePath, leafPath] : [];
    if (newNodePath.length === 0) {
      return [];
    }
    const properties = getProperties(options);
    console.log('properties:', curNode, properties);

    // 添加一个新的节点
    editor.insertNodes(
      {
        type: curNode.node?.type,
        children: [{ text: '', }],
        ...properties,
        id: generateElementId(),
      },
      { at: newNodePath }
    );
    editor.select(newNodePath);
  });
};

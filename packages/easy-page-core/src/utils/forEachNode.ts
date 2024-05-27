/* eslint-disable @typescript-eslint/no-explicit-any */
import { Schema } from '../core/protocol';

export const forEachNode = (
  schema: Schema<any, any, any>,
  callback: (schema: Schema<any, any, any>) => boolean | void
) => {
  const doForEachNode = (node: Schema<any, any, any>) => {
    const result = callback(node);
    if (result === false) {
      // 结束
      return;
    }
    if (node.children) {
      node.children.forEach(doForEachNode);
    }
  };
  doForEachNode(schema);
};

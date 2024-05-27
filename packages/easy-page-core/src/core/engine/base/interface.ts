/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * - 节点类型：选项型节点、选项节点、子节点、根节点、基础节点
 */

import { Schema } from '../../protocol';

export type BaseEngineOption<State, Props> = {
  schema: Schema<unknown, State, Props>;
  handlers: BaseEngineHandlers<State, Props>;
};

export type SchemaNodeInfo<State, Props> = Omit<
  Schema<unknown, State, Props>,
  'children'
> & {
  /**
   * - schema 的规则是：同一个父节点下的节点不可重key，但是不同父元素可以
   * - 如果以 id 存储节点的配置，则会导致覆盖
   * - 因此节点配置的 id 组合为：parentId + nodeId
   */
  parentId: string;
};

export type NodeHandlerOption<State, Props> = {
  nodeInfo: SchemaNodeInfo<State, Props>;
  children?: unknown[];
  // 自己和子节点的关系类型
  childrenRelation?: 'coexist' | 'single' | 'none';
  /** 自己和兄弟节点的关系类型 */
  brothersRelation?: 'coexist' | 'single' | 'none';
  /** key 为其父元素 key */
  grandChildren?: Record<string, any[]>;
};

export type NodeHandler<State, Props> = (
  options: NodeHandlerOption<State, Props>
) => unknown;

export type BaseEngineHandlers<State, Props> = {
  rootHandler: NodeHandler<State, Props>;
  normalHandler: NodeHandler<State, Props>;
  optionalHandler: NodeHandler<State, Props>;
  optionHandler: NodeHandler<State, Props>;
};

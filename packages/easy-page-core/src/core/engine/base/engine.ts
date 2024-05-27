import { Schema } from '../../protocol';
import {
  BaseEngineHandlers,
  BaseEngineOption,
  NodeHandlerOption,
} from './interface';

export class BaseEngine<State, Props> {
  private schema: Schema<unknown, State, Props>;

  private handlers: BaseEngineHandlers<State, Props>;
  constructor({ schema, handlers }: BaseEngineOption<State, Props>) {
    this.schema = schema;
    this.handlers = handlers;
  }

  isNormalNode(schema: Schema<unknown, State, Props>) {
    return !schema.childrenRelation || schema.childrenRelation === 'none';
  }
  /** 选择型节点 */
  isOptionalNode(schema: Schema<unknown, State, Props>) {
    return schema.childrenRelation && schema.childrenRelation !== 'none';
  }

  parse() {
    return this.doParse(this.schema, '');
  }

  doParse(schema: Schema<unknown, State, Props>, parentId: string): unknown {
    const { children = [], ...nodeInfo } = schema;
    const isRootNode = schema.id === this.schema.id;
    const childrenNodes: unknown[] = [];

    const handlerInfo: NodeHandlerOption<State, Props> = {
      nodeInfo: {
        ...nodeInfo,
        parentId: parentId || '',
      },
      children: childrenNodes,
      childrenRelation: schema.childrenRelation,
    };

    /** 解析选项型节点 */
    if (this.isOptionalNode(schema)) {
      /**
       * - 选择型节点自己是：schema
       * - 自己的选项是：children
       * - 选项联动的表单是：grandChildren
       *  */
      const grandChildrenNodes: Record<string, unknown[]> = {};
      children.forEach((eachChild) => {
        const { children: grandChildren = [], ...childNodeInfo } = eachChild;
        const optionHandlerOptions: NodeHandlerOption<State, Props> = {
          nodeInfo: { ...childNodeInfo, parentId: schema.id },
          brothersRelation: schema.childrenRelation,
          childrenRelation: eachChild.childrenRelation,
        };

        const grandChildrenRes = grandChildren.map((each) =>
          this.doParse(each, eachChild.id)
        );
        if (grandChildrenRes && grandChildrenRes.length > 0) {
          grandChildrenNodes[eachChild.id] = grandChildrenRes;
        }
        childrenNodes.push(this.handlers.optionHandler(optionHandlerOptions));
      });
      return this.handlers.optionalHandler({
        ...handlerInfo,
        grandChildren: grandChildrenNodes,
      });
    }

    /** 解析子节点 */
    if (children.length > 0) {
      children.forEach((each) => {
        childrenNodes.push(this.doParse(each, schema.id));
      });
    }
    if (isRootNode) {
      // 如果父节点是根节点，直接返回
      return this.handlers.rootHandler(handlerInfo);
    }
    return this.handlers.normalHandler(handlerInfo);
  }
}

import { BaseEngine, NodeHandlerOption } from '../base';
import { UIEngineHandlers, UIEngineOption } from './interface';

export class UIEngine<PageState, PageProps> {
  private baseEngine: BaseEngine<PageState, PageProps>;
  private uiHandlers: UIEngineHandlers<PageState, PageProps>;

  constructor(options: UIEngineOption<PageState, PageProps>) {
    const { schema, handlers } = options;
    this.uiHandlers = handlers;
    this.baseEngine = new BaseEngine({
      schema,
      handlers: {
        rootHandler: this.registerRootContainerHandler.bind(this),
        normalHandler: this.registerNormalHandler.bind(this),
        optionalHandler: this.registerOptionalHandler.bind(this),
        optionHandler: this.registerOptionHandlerHandler.bind(this),
      },
    });
  }

  parse() {
    return this.baseEngine.parse();
  }

  registerRootContainerHandler({
    nodeInfo,
    children,
  }: NodeHandlerOption<PageState, PageProps>): unknown {
    return this.uiHandlers.rootContainerHandler({ nodeInfo, children });
  }

  registerNormalHandler({
    nodeInfo,
    children,
  }: NodeHandlerOption<PageState, PageProps>) {
    const curNode = this.uiHandlers.normalHandler({ nodeInfo });
    if (children && children.length > 0) {
      return this.uiHandlers.layoutContainerHandler({
        nodeInfo,
        children,
        curNode,
      });
    }
    return curNode;
  }

  registerOptionHandlerHandler({
    nodeInfo,
    brothersRelation,
  }: NodeHandlerOption<PageState, PageProps>) {
    return this.uiHandlers.optionHandler({ nodeInfo, brothersRelation });
  }

  registerOptionalHandler({
    nodeInfo,
    children,
    childrenRelation,
    grandChildren,
  }: NodeHandlerOption<PageState, PageProps>) {
    const curNode = this.uiHandlers.optionalHandler({
      nodeInfo,
      childrenRelation,
      children,
    });
    if (grandChildren && Object.keys(grandChildren).length > 0) {
      return this.uiHandlers.layoutContainerHandler({
        nodeInfo,
        curNode,
        childrenRelation,
        grandChildren,
      });
    }
    return curNode;
  }
}

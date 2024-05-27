/* eslint-disable @typescript-eslint/no-explicit-any */
import { Schema } from '../../protocol';
import { NodeHandlerOption } from '../base';

export type UIEngineOption<PageState, PageProps> = {
  schema: Schema<unknown, PageState, PageProps>;
  handlers: UIEngineHandlers<PageState, PageProps>;
};

export type UIEngineNodeHandlerOption<PageState, PageProps> = NodeHandlerOption<
  PageState,
  PageProps
> & {
  /** 当前节点解析后的结果，用于布局组件 */
  curNode?: any;
};

export type UIEngineNodeHandler<PageState, PageProps> = (
  options: UIEngineNodeHandlerOption<PageState, PageProps>
) => unknown;

export type UIEngineHandlers<PageState, PageProps> = {
  // 根容器 UI
  rootContainerHandler: UIEngineNodeHandler<PageState, PageProps>;
  // 布局 UI
  layoutContainerHandler: UIEngineNodeHandler<PageState, PageProps>;
  // 选项 UI
  optionHandler: UIEngineNodeHandler<PageState, PageProps>;
  // 选择型 UI
  optionalHandler: UIEngineNodeHandler<PageState, PageProps>;
  // 正常节点 UI
  normalHandler: UIEngineNodeHandler<PageState, PageProps>;
};

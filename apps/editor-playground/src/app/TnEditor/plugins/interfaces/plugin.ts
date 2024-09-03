import { RenderElementProps } from 'slate-react';
import { CustomElement } from '../../interface';

export interface TnBasePlugin {
  /** 插件 ID */
  id: string;
  /** 插件名 */
  name: string;

  /** 插件优先级，数字越大优先级越高， 默认顺序执行 */
  priority?: number;
}

// export type WrapperPluginActionRes = {
//   /** 是否阻止接下来的插件处理，为：true 则阻止 */
//   abort: boolean;
// }

// /** 装饰类插件，即给 TnEditorRenderPlugin 所渲染的元素按需向节点添加属性即可 */
// export interface TnEditorWrapperPlugin extends TnBasePlugin {
//   /** TODO: 持续补充事件类型 */
//   match: (e: React.KeyboardEvent<HTMLDivElement>) => boolean
//   /** 事件处理函数，返回 undefined 不阻塞继续匹配 */
//   action: () => undefined | WrapperPluginActionRes;
// }

/** renderElement 的插件 */
export interface TnEditorRenderPlugin extends TnBasePlugin {
  /** 匹配元素，渲染组件，一个 type 类型，只能用一个插件来渲染 */
  elementType: string;

  /**
   * - 如果当前元素在按回车换行时，是否用默认的 P 元素替代
   * - 设置为 true，则替换
   */
  replaceWithDefault?: boolean;

  /**
   * - 如果当前元素在按回车换行时，元素相同，属性可选择不要哪些属性
   * - 若和 replaceWithDefault 同时设置，replaceWithDefault 优先级更高
   * @param props
   * @returns
   */
  replaceWithDefaultProperties?: {
    exclude?: (keyof CustomElement)[];
    /** 如果和 exclude 一起配置，则 include 优先级更高 */
    include?: (keyof CustomElement)[];
  };

  /** 匹配后，渲染元素 */
  render: (props: RenderElementProps) => JSX.Element;

  // /** 事件处理器: key 为 event 插件 ID */
  // eventHandlers?: Record<
  // 	string,
  // 	(
  // 		editor: Editor,
  // 		options: {
  // 			event: React.KeyboardEvent<HTMLDivElement>;
  // 			lastNode?: BasePoint | undefined;
  // 			curNode: NodeEntry<Ancestor> | [];
  // 		}
  // 	) => void
  // >;
}

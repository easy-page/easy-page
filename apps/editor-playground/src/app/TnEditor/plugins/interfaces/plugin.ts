import { Ancestor, Editor, NodeEntry, Node, BasePoint } from 'slate';
import { RenderElementProps } from 'slate-react';

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

	/** 匹配后，渲染元素 */
	render: (props: RenderElementProps) => JSX.Element;

	/** 事件处理器: key 为 event 插件 ID */
	eventHandlers?: Record<
		string,
		(
			editor: Editor,
			options: {
				event: React.KeyboardEvent<HTMLDivElement>;
				lastNode?: BasePoint | undefined;
				curNode: NodeEntry<Ancestor> | [];
			}
		) => void
	>;
}

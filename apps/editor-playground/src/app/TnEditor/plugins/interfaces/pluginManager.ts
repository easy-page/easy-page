import { RenderElementProps } from 'slate-react';

export interface IPluginManager {
	renderElement: (props: RenderElementProps) => JSX.Element;
}

/** key 为元素类型，value：为插件类型 */
export interface ElementPlugins {}

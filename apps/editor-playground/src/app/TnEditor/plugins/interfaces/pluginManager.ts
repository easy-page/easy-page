import { Editor } from 'slate';
import { RenderElementProps } from 'slate-react';

export interface IPluginManager {
  renderElement: (props: RenderElementProps) => JSX.Element;
  handleEvent: (event: any, editor: Editor) => void;
}

/** key 为元素类型，value：为插件类型 */
export interface ElementPlugins {}

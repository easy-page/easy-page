import { RenderElementProps } from 'slate-react';
import { IPluginManager } from './interfaces/pluginManager';
import { TnEditorRenderPlugin } from './interfaces/plugin';
import { TnEditorEventPlugin } from './interfaces/event';
import { Editor } from 'slate';
import { SelectHoc } from '../components/HocComponents/SelectHoc';

export type PluginManagerOptions = {
  /** key 为 element 的 type */
  elementPlugins: Record<string, TnEditorRenderPlugin>;
  eventPlugins: TnEditorEventPlugin[];
};
export class PluginManager implements IPluginManager {
  public elementPlugins: Record<string, TnEditorRenderPlugin>;
  public eventPlugins: TnEditorEventPlugin[];
  constructor({ elementPlugins, eventPlugins }: PluginManagerOptions) {
    this.elementPlugins = elementPlugins;
    this.eventPlugins = eventPlugins;
  }

  handleEvent = (
    event: React.KeyboardEvent<HTMLDivElement>,
    editor: Editor
  ) => {
    const eventHandlers = this.eventPlugins
      .filter((e) => e.match(event))
      .sort((a, b) => a.priority - b.priority);

    console.log('eventHandlers:', eventHandlers);
    // TODO 当相同优先级有多个 handler 时候，弹窗让用户抉择，目前选择 1 个执行。
    if (eventHandlers.length === 0) {
      return;
    }
    const handler = eventHandlers[0];
    return handler.handler(event, editor, {
      elementPlugins: this.elementPlugins,
    });
  };

  renderElement = (props: RenderElementProps) => {
    const plugin = this.elementPlugins[props.element.type];
    if (!plugin) {
      throw Error(`请为类型为：${props.element.type} 的元素注册渲染插件`);
    }
    return plugin.render(props);
  };
}

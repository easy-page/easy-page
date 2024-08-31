/* eslint-disable @typescript-eslint/no-explicit-any */
import { RenderElementProps } from 'slate-react';
import { IPluginManager } from './interfaces/pluginManager';
import { TnEditorRenderPlugin } from './interfaces/plugin';
import { TNEditorEventPlugin } from './interfaces/event';
import { Editor } from 'slate';
import { EventType } from '../constants';

export type PluginManagerOptions = {
  /** key 为 element 的 type */
  elementPlugins: Record<string, TnEditorRenderPlugin>;
  eventPlugins: TNEditorEventPlugin<any>[];
};
export class PluginManager implements IPluginManager {
  public elementPlugins: Record<string, TnEditorRenderPlugin>;
  public eventPlugins: TNEditorEventPlugin<any>[];
  constructor({ elementPlugins, eventPlugins }: PluginManagerOptions) {
    this.elementPlugins = elementPlugins;
    this.eventPlugins = eventPlugins;
  }

  handleEvent = <T = React.KeyboardEvent<HTMLDivElement>,>(
    event: T,
    editor: Editor,
    options?: {
      eventType: EventType;
    }
  ) => {
    const eventType = options?.eventType || EventType.OnKeyDown;
    const eventHandlers = this.eventPlugins
      .filter((e) => e.match(event) && eventType === e.eventType)
      .sort((a, b) => a.priority - b.priority);

    // console.log('eventHandlers:', eventHandlers);
    // TODO 当相同优先级有多个 handler 时候，弹窗让用户抉择，目前选择 1 个执行。
    if (eventHandlers.length === 0) {
      return;
    }
    eventHandlers.forEach((each) => {
      console.log(`执行:${each.name} 插件，事件：${each.eventType}`);
      each.handler(event, editor);
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

import { TnEditorEventPlugin } from '../../../interfaces';
import { EventId } from '../../constant';
import { toggleLeafStyle } from '../../../../actions';

// command + I 快捷键，将当前选中内容设置为斜体
export const onCommandI: TnEditorEventPlugin = {
  id: EventId.OnCommandI,
  name: '斜体',
  match(event) {
    return event.code === 'KeyI' && event.metaKey;
  },
  priority: 1,
  handler(event, editor, { elementPlugins }) {
    toggleLeafStyle(editor, { fontStyle: 'italic'  });
  },
};

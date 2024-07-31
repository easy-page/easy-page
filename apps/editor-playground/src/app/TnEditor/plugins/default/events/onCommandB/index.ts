import { TnEditorEventPlugin } from '../../../interfaces';
import { EventId } from '../../constant';
import { toggleLeafStyle } from '../../../../actions';

// command + B 快捷键，将当前选中内容加粗
export const onCommandB: TnEditorEventPlugin = {
  id: EventId.OnCommandB,
  name: '粗体',
  match(event) {
    return event.code === 'KeyB' && event.metaKey;
  },
  priority: 1,
  handler(event, editor, { elementPlugins }) {
    toggleLeafStyle(editor, { fontWeight: 600 });
  },
};

import { TnEditorEventPlugin } from '../../../interfaces';
import { EventId } from '../../constant';
import { toggleLeafStyle } from '../../../../actions';

// command + Shift + X 快捷键，将当前选中内容加删除线
export const onCommandShiftX: TnEditorEventPlugin = {
  id: EventId.OnCommandShiftX,
  name: '删除线',
  match(event) {
    return event.code === 'KeyX' && event.metaKey && event.shiftKey;
  },
  priority: 1,
  handler(event, editor, { elementPlugins }) {
    toggleLeafStyle(editor, { textDecoration: 'line-through' });
  },
};

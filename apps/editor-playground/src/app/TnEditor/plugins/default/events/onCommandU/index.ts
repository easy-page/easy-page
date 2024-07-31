import { TnEditorEventPlugin } from '../../../interfaces';
import { EventId } from '../../constant';
import { toggleLeafStyle } from '../../../../actions';

// command + U 快捷键，将当前选中内容添加下划线
export const onCommandU: TnEditorEventPlugin = {
  id: EventId.OnCommandU,
  name: '下划线',
  match(event) {
    return event.code === 'KeyU' && event.metaKey;
  },
  priority: 1,
  handler(event, editor, { elementPlugins }) {
    toggleLeafStyle(editor, { textDecoration: 'underline', textUnderlineOffset: '0.2em', textDecorationSkipInk: 'none' });
  },
};

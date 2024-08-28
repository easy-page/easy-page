import { TNEditorEventPlugin } from '../../../interfaces';
import { EventType, SPECIAL_KEYS } from '../../../../constants';
import { EventId } from '../../constant';
import { unsetSelectAll } from '../../../../slate/transform/unsetSelectAll';

export const onKeyboardEvent: TNEditorEventPlugin<
  React.KeyboardEvent<HTMLDivElement>
> = {
  match: function (event): boolean {
    const isSelectAll = event.metaKey && event.key === 'a';
    return !SPECIAL_KEYS.includes(event.key) && !isSelectAll;
  },
  handler: function (event, editor): void {
    console.log('【全选】清空所有');
    unsetSelectAll(editor);
  },
  id: EventId.OnKeyboardEvent,
  name: '鼠标释放',
  priority: 0,
  eventType: EventType.OnKeyDown,
};

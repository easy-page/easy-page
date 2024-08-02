import { TNEditorEventPlugin } from '../../../interfaces';
import { EventType, SPECIAL_KEYS } from '../../../../constants';
import { EventId } from '../../constant';
import { unsetSelectAll } from '../../../../slate/transform/unsetSelectAll';

export const onKeyboardEvent: TNEditorEventPlugin<
  React.KeyboardEvent<HTMLDivElement>
> = {
  match: function (event): boolean {
    return !SPECIAL_KEYS.includes(event.key);
  },
  handler: function (event, editor): void {
    unsetSelectAll(editor);
  },
  id: EventId.OnKeyboardEvent,
  name: '鼠标释放',
  priority: 0,
  eventType: EventType.OnKeyDown,
};

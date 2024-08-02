import { TNEditorEventPlugin } from '../../../interfaces';
import { EventType } from '../../../../constants';
import { unsetSelectAll } from '../../../../slate/transform/unsetSelectAll';
import { EventId } from '../../constant';

export const onKeyboardEvent: TNEditorEventPlugin<
  React.MouseEvent<HTMLDivElement, MouseEvent>
> = {
  match: function (event): boolean {
    return true;
  },
  handler: function (event, editor): void {
    unsetSelectAll(editor);
  },
  id: EventId.OnKeyboardEvent,
  name: '鼠标释放',
  priority: 0,
  eventType: EventType.OnMouseUp,
};

import { TNEditorEventPlugin } from '../../../interfaces';
import { EventType } from '../../../../constants';
import { unsetSelectAll } from '../../../../slate/transform/unsetSelectAll';

export const onMouseUp: TNEditorEventPlugin<
  React.MouseEvent<HTMLDivElement, MouseEvent>
> = {
  match: function (event): boolean {
    return event.type === 'mouseup';
  },
  handler: function (event, editor): void {
    unsetSelectAll(editor);
  },
  id: EventType.OnMouseUp,
  name: '鼠标释放',
  priority: 0,
  eventType: EventType.OnMouseUp,
};

import { EmptySpan } from '../../../components';
import { UL_LIST_ICON } from '../../../constants';
import { UlElement } from '../../../interface';
import { addIndent } from '../../../slate/transform';
import { removeIndent } from '../../../slate/transform/removeIndent';
import { TnEditorRenderPlugin } from '../../interfaces/plugin';
import { splitChildren } from '../../utils/splitChildren';
import { EventId } from '../constant';

export const UL_ELEMENT = 'ul';

const IconMap: Record<UL_LIST_ICON, React.ReactNode> = {
  [UL_LIST_ICON.FilledCircle]: <>•</>,
  [UL_LIST_ICON.OutlineCircle]: <>◦</>,
  [UL_LIST_ICON.Rect]: <>▪</>,
};

const getIcon = (element: UlElement) => {
  const level = element.level || 0;
  if (level % 3 === 0) {
    return IconMap.Rect;
  }
  if (level % 3 === 1) {
    return IconMap.filledCircle;
  }
  if (level % 3 === 2) {
    return IconMap.OutlineCircle;
  }
  return IconMap.Rect;
};

export const ulPlugin: TnEditorRenderPlugin = {
  elementType: UL_ELEMENT,
  render: ({ element, attributes, children }) => {
    const { textChildren, elementChildren } = splitChildren(children);
    console.log('handle done:', elementChildren);
    const Icon = getIcon(element as UlElement);
    return (
      <div {...attributes} className="list-wrapper bullet-list">
        <div className="list list-style-group-1 flex flex-row">
          <div contentEditable="false" className="bullet mr-1">
            <div className="bullet-dot-style">{Icon}</div>
          </div>
          <div className="list-content pr-1">{textChildren}</div>
        </div>
        <div className="list-children ml-[7px] pl-2">{elementChildren}</div>
      </div>
    );
  },
  id: 'ul_plugin',
  name: '无需列表-UL插件',
  eventHandlers: {
    [EventId.OnTabDown]: (editor, { event }) => {
      if (!event.shiftKey) {
        addIndent(editor);
      } else {
        removeIndent(editor);
      }
    },
  },
};

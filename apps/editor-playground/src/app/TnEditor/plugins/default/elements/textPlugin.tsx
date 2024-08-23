/* eslint-disable react-hooks/rules-of-hooks */

import { TextComponent } from '../../../components';
import { TnEditorRenderPlugin } from '../../interfaces/plugin';

export const TEXT_ELEMENT = 'p';

export const textPlugin: TnEditorRenderPlugin = {
  elementType: TEXT_ELEMENT,
  render: (props) => {
    return <TextComponent {...props} />;
  },
  id: 'text_plugin',
  name: '文本插件',
  // eventHandlers: {
  //   [EventId.OnTabDown]: (editor, { event }) => {
  //     if (!event.shiftKey) {
  //       addIndent(editor);
  //     } else {
  //       removeIndent(editor);
  //     }
  //   },
  // },
};

/* eslint-disable react-hooks/rules-of-hooks */

import { TnEditorRenderPlugin } from '../../interfaces/plugin';

import { TextComponent } from '../../../components/TextElement';
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

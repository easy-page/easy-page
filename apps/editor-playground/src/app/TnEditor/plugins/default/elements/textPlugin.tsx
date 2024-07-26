/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react';

import { TnEditorRenderPlugin } from '../../interfaces/plugin';
import { EventId } from '../constant';
import { addIndent } from '../../../slate/transform';
import './text.less';
import { removeIndent } from '../../../slate/transform/removeIndent';

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

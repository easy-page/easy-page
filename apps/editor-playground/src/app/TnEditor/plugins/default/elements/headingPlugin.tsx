import React from 'react';

import { TnEditorRenderPlugin } from '../../interfaces/plugin';
import { HeadingElement } from '../../../components/elements/HeadingElement';

export const HEADING_ELEMENT = 'heading';

export const headingPlugin: TnEditorRenderPlugin = {
  elementType: HEADING_ELEMENT,
  render: (props) => {
    return <HeadingElement {...props} />;
  },
  id: 'heading_plugin',
  name: '标题插件',
};

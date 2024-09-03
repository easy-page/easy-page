import React from 'react';

import { TnEditorRenderPlugin } from '../../interfaces/plugin';
import { TodoElement } from '../../../components/elements/TodoElement';

export const TODO_ELEMENT = 'todo';

export const todoPlugin: TnEditorRenderPlugin = {
  elementType: TODO_ELEMENT,
  render: (props) => {
    return <TodoElement {...props} />;
  },
  replaceWithDefaultProperties: {
    exclude: ['checked'],
  },
  id: 'todo_plugin',
  name: 'TODO 插件',
};

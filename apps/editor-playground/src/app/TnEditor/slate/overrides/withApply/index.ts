/* eslint-disable @typescript-eslint/no-explicit-any */
import { Editor } from 'slate';
import { PluginManager } from '../../../plugins';

export const withApply = (plugins: PluginManager) => {
  return (editor: Editor) => {
    const { apply } = editor;
    editor.apply = (options: any) => {
      const { type } = options.properties;
      const { elementPlugins } = plugins;
      const currentPlugins = elementPlugins[type];
      console.log('currentPlugins', currentPlugins);
      apply(options);
    };
    return editor;
  };
};

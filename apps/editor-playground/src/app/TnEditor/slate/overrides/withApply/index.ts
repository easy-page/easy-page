/* eslint-disable @typescript-eslint/no-explicit-any */
import { Editor } from 'slate';

export const withApply = (editor: Editor) => {
  const { apply } = editor;
  editor.apply = (options) => {
    console.log('ooooooop:', options);
    apply(options);
  };
  return editor;
};

import { Editor, Path } from 'slate';
import { CustomElement } from '../../interface';
import { ReactEditor } from '@easy-page-slate-react';

export const findNodePath = (
  editor: Editor,
  node: CustomElement
): Path | undefined => {
  try {
    return ReactEditor.findPath(editor, node);
  } catch (error) {
    console.error(error);
  }
};

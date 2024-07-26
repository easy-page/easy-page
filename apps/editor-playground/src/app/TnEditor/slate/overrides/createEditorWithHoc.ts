import { Editor } from 'slate';

type HocFunction = (editor: Editor) => Editor;

export const createEditorWithHoc = (
  hocFunctions: HocFunction[],
  editor: Editor
) => {
  return hocFunctions.reduce((pre, next) => next(pre), editor);
};

import { Ancestor, Path, Editor, BasePoint } from 'slate';

export type IndentOptions = {
  curNode: Ancestor;
  curNodePath: Path;
  editor: Editor;
  lastNode: BasePoint;
};

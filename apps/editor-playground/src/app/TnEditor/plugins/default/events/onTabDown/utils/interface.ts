import { Editor } from 'slate';
import { CurNodeInfo } from './getCurNodeInfo';

export type IndentOptions = {
  curNodeInfo: CurNodeInfo;
  editor: Editor;
};

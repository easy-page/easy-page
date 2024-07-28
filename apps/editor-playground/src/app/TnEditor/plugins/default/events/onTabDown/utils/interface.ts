import { Editor } from 'slate';
import { CurNodeInfo } from '../../utils/getCurNodeInfo';

export type IndentOptions = {
  curNodeInfo: CurNodeInfo;
  editor: Editor;
};

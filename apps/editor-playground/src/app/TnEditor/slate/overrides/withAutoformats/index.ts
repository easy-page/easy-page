import { AutoformatHandler } from './interface';
import { isCollapsed } from '../../utils/isCollapsed';
import { autoformatBlock } from './formats';
import { Editor } from 'slate';

export const withAutoformats =
  (options: { rules: AutoformatHandler[] }) => (editor: Editor) => {
    const { rules } = options;
    const { insertText } = editor;
    editor.insertText = (text: string) => {
      if (!isCollapsed(editor.selection)) return insertText(text);
      const res = autoformatBlock(editor, text, { rules });
      if (!res) {
        insertText(text);
      }
    };
    return editor;
  };

export * from './rules';

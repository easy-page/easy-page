import { Editor, Range } from 'slate';
import { getEditorString } from './getEditorString';

/**
 * 获得选中的文案
 */
export const getSelectionText = (editor: Editor) => {
	const range = editor?.selection;
	if (!range) {
		return '';
	}
	return getEditorString(editor, range);
};

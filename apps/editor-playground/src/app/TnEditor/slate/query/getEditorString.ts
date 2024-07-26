import { Editor, EditorStringOptions, Location } from 'slate';

/** 获得节点文案 */
export const getEditorString = (
	editor: Editor,
	at: Location | null | undefined,
	options?: EditorStringOptions
) => {
	if (!at) return '';

	try {
		return Editor.string(editor, at, options);
	} catch (error) {
		return '';
	}
};

import { Editor, Range } from 'slate';

/**
 * 判断选区是否展开
 */
export const isSelectionExpanded = (editor: Editor) => {
	const range = editor?.selection;
	return !!range && Range.isExpanded(range);
};

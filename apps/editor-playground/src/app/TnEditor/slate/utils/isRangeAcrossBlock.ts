import { Editor, Range, Element, Path } from 'slate';

/**
 * Is the range (default: selection) across blocks.
 * - return undefined if block not found
 * - return boolean whether one of the block is not found, but the other is found
 * - return boolean whether block paths are unequal
 */
export const isRangeAcrossBlocks = (
	editor: Editor,
	{
		at,
	}: {
		at: Range;
	}
) => {
	const curAt = at || editor.selection;
	if (!curAt) return;

	const [start, end] = Range.edges(curAt);
	const startBlock = Editor.above(editor, {
		at: start,
		match: (n, path) => Element.isElement(n) && Editor.isBlock(editor, n),
	});
	const endBlock = Editor.above(editor, {
		at: end,
		match: (n, path) => Element.isElement(n) && Editor.isBlock(editor, n),
	});
	if (!startBlock && !endBlock) return;
	if (!startBlock || !endBlock) return true;
	return !Path.equals(startBlock[1], endBlock[1]);
};

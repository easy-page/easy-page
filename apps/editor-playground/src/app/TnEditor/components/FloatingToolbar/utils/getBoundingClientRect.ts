import { Editor, Location, Path, Range } from 'slate';

import { mergeClientRects } from './mergeClientRects';
import { ReactEditor } from 'slate-react';
import { getRange } from '../../../slate';

export const getBoundingClientRect = (
	editor: Editor,
	at?: Location | Location[]
): DOMRect | undefined => {
	const atRanges: Range[] = (() => {
		if (!at) return [editor.selection].filter(Boolean) as Range[];
		const atArray = Array.isArray(at) && !Path.isPath(at) ? at : [at];
		return atArray.map((location) => getRange(editor, location));
	})();

	const clientRects = atRanges
		.map((range) =>
			ReactEditor.toDOMRange(editor, range)?.getBoundingClientRect()
		)
		.filter(Boolean) as DOMRect[];
	if (clientRects.length === 0) return undefined;
	return mergeClientRects(clientRects);
};

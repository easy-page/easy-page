import { ClientRectObject } from '@floating-ui/core';
import { Editor, Range } from 'slate';

import { ReactEditor } from 'slate-react';
import { getDefaultBoundingClientRect } from './createVirtualElement';

/**
 * Get bounding client rect by slate range
 */
export const getRangeBoundingClientRect = (
	editor: Editor,
	at: Range | null
): ClientRectObject => {
	if (!at) return getDefaultBoundingClientRect();

	const domRange = ReactEditor.toDOMRange(editor, at);
	if (!domRange) return getDefaultBoundingClientRect();

	return domRange.getBoundingClientRect();
};

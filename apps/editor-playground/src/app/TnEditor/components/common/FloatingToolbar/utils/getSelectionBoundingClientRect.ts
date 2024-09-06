import { ClientRectObject } from '@floating-ui/core';
import { getDefaultBoundingClientRect } from './createVirtualElement';

/**
 * Get bounding client rect of the window selection
 */
export const getSelectionBoundingClientRect = (): ClientRectObject => {
	// 返回一个 Selection 对象，表示用户选择的文本范围或光标的当前位置
	const domSelection = window.getSelection(); 

	if (!domSelection || domSelection.rangeCount < 1) {
		return getDefaultBoundingClientRect();
	}
	
	console.log('domSelection:', domSelection, domSelection.getRangeAt(0));
	const domRange = domSelection.getRangeAt(0);

	// 返回一个 DOMRect 对象，{ width: 16.2890625, bottom: 235.5, height: 22.5,left: 77, right: 93.2890625, top: 213, x: 77, y: 213 }
	return domRange.getBoundingClientRect(); 	
};

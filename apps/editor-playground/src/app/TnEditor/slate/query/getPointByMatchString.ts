/* eslint-disable no-constant-condition */
import { BasePoint, Editor, Location } from 'slate';
import { isRangeAcrossBlocks } from '../utils';
import { getEditorString } from './getEditorString';

/**
 * - 从当前位置向前找到符合自己要匹配的字符串
 * - 用于识别字符串做相关替换
 *  */
export const getPointByMatchString = (
	editor: Editor,
	options: {
		matchString: string;
	}
): BasePoint | null => {
	const { matchString } = options;
	const curAt = editor.selection! as Location;
	const stackLength = matchString.length;

	let previousPoint = Editor.point(editor, curAt, { edge: 'end' });
	const stack: { point: BasePoint; text: string }[] = [];

	let count = 0;
	let beforeAt = curAt;

	while (count < matchString.length) {
		const beforePoint = Editor.before(editor, beforeAt, {});

		if (
			!beforePoint ||
			isRangeAcrossBlocks(editor, {
				at: { anchor: beforePoint, focus: previousPoint },
			})
		)
			return null;
 

		const beforeString = getEditorString(editor, {
			anchor: beforePoint,
			focus: previousPoint,
		});

		stack.unshift({ point: beforePoint, text: beforeString });
		if (stack.length > stackLength) stack.pop();

		const accumulatedText = stack.map((item) => item.text).join('');

		if (matchString === accumulatedText) {
			return beforePoint;
		}

		previousPoint = beforePoint;
		beforeAt = beforePoint;
		count++;
	}

	return null;
};

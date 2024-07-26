import { CSSProperties } from 'react';
import { Editor } from 'slate';

/** 判断当前样式是否激活 */
export const getActiveStyles = (editor: Editor, style: CSSProperties) => {
	const marks = Editor.marks(editor);
	const styleIds = Object.keys(style || {});
	/** 已经激活的样式数组 */
	const activeStyleIds: string[] = [];
	if (!marks) {
		return [];
	}
	styleIds.forEach((e) => {
		if (marks[e as keyof CSSProperties] !== undefined) {
			activeStyleIds.push(e);
		}
	});
	return activeStyleIds;
};

/**
 * - 修改叶子结点的属性，需配合 renderLeaf 使用
 * - TODO: slate 没有提供批量的 addMarks
 *  */
export const toggleLeafStyle = (editor: Editor, style: CSSProperties) => {
	const activeStyleIds = getActiveStyles(editor, style);
	const styleIds = Object.keys(style || {});
	styleIds.forEach((each) => {
		if (activeStyleIds.includes(each)) {
			Editor.removeMark(editor, each);
		} else {
			Editor.addMark(editor, each, style[each as keyof CSSProperties]);
		}
	});
};

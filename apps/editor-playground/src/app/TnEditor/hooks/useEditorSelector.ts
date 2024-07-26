import { selectAtom } from 'jotai/utils';
import React from 'react';
import { Editor } from 'slate';
import { tnStore, useTnStore } from '../store';

export interface UseEditorSelectorOptions<T> {
	/** 编辑器 id */
	id?: string;
	/** 比较函数，前后两次值相等，则不刷新页面 */
	equalityFn?: (a: T, b: T) => boolean;
}

/**
 * - 通过 editor 获得一个新的计算值
 */
export const useEditorSelector = <T>(
	selector: (editor: Editor, prev?: T) => T,
	deps: React.DependencyList,
	{ id, equalityFn = (a: T, b: T) => a === b }: UseEditorSelectorOptions<T> = {}
): T => {
	const selectorAtom = React.useMemo(
		() =>
			selectAtom<{ editor: Editor }, T>(
				tnStore.atom.trackedEditor,
				({ editor }, prev) => selector(editor, prev),
				equalityFn
			),
		deps
	);

	/** 将计算的值存到 store 中 */
	return useTnStore().get.atom(selectorAtom);
};

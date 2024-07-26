import React, { useEffect } from 'react';
import { Range, Selection } from 'slate';
import {
	TnStoreVersionChangeKey,
	useIncrementVersion,
} from '../hooks/useIncrementVersion';
import { useSlate } from 'slate-react';
import { useTnStore } from '../store';
// import { useEditorEmpty } from '../hooks';

const isSelectionEqual = (a: Selection, b: Selection) => {
	if (!a && !b) return true;
	if (!a || !b) return false;
	return Range.equals(a, b);
};

/** 当选中区域变化，更新组件 */
export const EditorSelectionEffect = React.memo(({ id }: { id?: string }) => {
	const updateVersionSelection = useIncrementVersion(
		TnStoreVersionChangeKey.VersionSelection,
		id
	);
	const updateVersionEditor = useIncrementVersion(
		TnStoreVersionChangeKey.VersionEditor,
		id
	);

	const setBeforeInput = useTnStore().set.beforeInput();

	useEffect(() => {
		const mouseHandler = () => {
			updateVersionEditor();
		};
		const contentChangeHandler = (e: CompositionEvent) => {
			console.log('get before input of: before input 输入', e);
			if (e.type === 'beforeinput' && e.data) {
				const data = e.data;
				/**
				 * - 这个 setTime out 非常重要， 不然输入的时候，汉语拼音有一万个
				 * */
				setTimeout(() => setBeforeInput(data), 0);
				e.preventDefault();
				e.stopPropagation();
			}
		};
		const compositionStartHandler = () => {
			setTimeout(() => setBeforeInput('hasData'), 0);
		};
		const compositionEndHandler = () => {
			setTimeout(() => setBeforeInput(''), 0);
		};
		// const inputEvent = (e: Event) => {
		// 	console.log('eeeee:', e);
		// };
		// window.addEventListener('input', inputEvent);
		window.addEventListener('compositionstart', compositionStartHandler);
		window.addEventListener('compositionend', compositionEndHandler);
		window.addEventListener('mouseup', mouseHandler);
		return () => {
			// window.removeEventListener('input', inputEvent);
			// window.removeEventListener('keydown', keyboardHandler);
			window.addEventListener('compositionstart', compositionStartHandler);
			window.removeEventListener('compositionend', compositionEndHandler);
			window.removeEventListener('mouseup', mouseHandler);
		};
	}, []);

	const editorState = useSlate();
	const prevSelectionRef = React.useRef(editorState.selection);
	const sameSelection = isSelectionEqual(
		prevSelectionRef.current,
		editorState.selection
	);
	React.useEffect(() => {
		if (!sameSelection) {
			updateVersionSelection();
		}
		prevSelectionRef.current = editorState.selection;
	}, [editorState.selection, sameSelection, updateVersionSelection]);
	return null;
});

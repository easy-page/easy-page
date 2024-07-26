import React from 'react';
import { useEditorRef } from '../hooks';
import { useTnStore } from '../store';

export function EditorRefEffect({ id }: { id?: string }) {
	const editorState = useEditorRef(id);
	const editorRef = useTnStore().get.editorRef();

	/**
	 * Pass `editorState` to `editorRef` when the editor mounts. Since the editor
	 * instance is mutable, we don't need to update it on every change, although
	 * consumers will need to manually trigger a re-render inside `onChange` if
	 * they want to use `editorRef` with `useState`.
	 */
	React.useEffect(() => {
		if (typeof editorRef === 'function') {
			editorRef(editorState);
			return () => editorRef(null);
		}

		if (editorRef) {
			editorRef.current = editorState;
			return () => {
				editorRef.current = null;
			};
		}
	}, [editorRef, editorState]);

	return <></>;
}

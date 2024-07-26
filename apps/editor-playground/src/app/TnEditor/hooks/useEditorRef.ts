import { useTnStore } from '../store';

export const useEditorRef = (id?: string) => {
	return useTnStore(id).get.editor();
};

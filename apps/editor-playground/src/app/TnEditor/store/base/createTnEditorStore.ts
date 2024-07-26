/** 编辑器全局的 Store */

import { atom } from 'jotai';
import { createAtomStore } from 'jotai-x';
import { createEditor, Editor } from 'slate';

/** 编辑器全局状态 */
export type TnEditorState = {
	editor: Editor;
	editorRef: React.ForwardedRef<Editor>;
	id: string;
	/** 记录当前编辑器版本，暂时不知道啥用 */
	versionEditor: number;
	/** 记录当前编辑器选中版本：可用于悬浮菜单何时呈现 */
	versionSelection: number;
	/** 记录编辑器 beforeInput */
	beforeInput: string;
};

export const createTnEditorStore = ({
	id,
	versionSelection = 1,
	editor = createEditor(),
	beforeInput = '',
	versionEditor = 1,
	editorRef = null,
}: Partial<TnEditorState> = {}) => {
	return createAtomStore(
		{
			id,
			editor,
			versionEditor,
			beforeInput,
			editorRef,
			versionSelection,
		} as TnEditorState,
		{
			name: 'tn',
			extend: (atoms) => ({
				/** 计算值 */
				trackedEditor: atom((get) => ({
					editor: get(atoms.editor),
					version: get(atoms.versionEditor),
				})),
				/** 计算值 */
				trackedSelection: atom((get) => ({
					selection: get(atoms.editor).selection,
					version: get(atoms.versionSelection),
				})),
			}),
		}
	);
};

export const { tnStore, useTnStore, TnProvider } = createTnEditorStore();

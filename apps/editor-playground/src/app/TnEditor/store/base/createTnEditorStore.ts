/** 编辑器全局的 Store */

import { atom, PrimitiveAtom } from 'jotai';
import { createAtomStore } from 'jotai-x';
import React from 'react';
import { createEditor, Editor } from 'slate';

export type TnElementRef = {
  /** 节点 ID */
  id: string;
  ref: React.MutableRefObject<HTMLDivElement>;
};

/** 编辑器全局状态 */
export type TnEditorState = {
  editor: Editor;
  editorRef: React.ForwardedRef<Editor>;
  editorElementRefs: PrimitiveAtom<TnElementRef[]>;
  /** 用于存储已经挂在 ref 的 id */
  editorElementRefIds: PrimitiveAtom<Set<string>>;
  /** 当前悬浮最近的 ref */
  floatRef: TnElementRef | null;
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
  editorElementRefs = atom([] as TnElementRef[]),
  editorElementRefIds = atom(new Set<string>()),
  floatRef = null,
  beforeInput = '',
  versionEditor = 1,
  editorRef = null,
}: Partial<TnEditorState> = {}) => {
  return createAtomStore(
    {
      id,
      editor,
      floatRef,
      versionEditor,
      beforeInput,
      editorRef,
      versionSelection,
      editorElementRefIds,
      editorElementRefs,
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

/** 存储所有 element 的 ref 用于计算悬浮 */
export const useEditorElementRefs = () => {
  const setEditorElementRefs = useTnStore().set.editorElementRefs();
  const editorElementRefIds = useTnStore().get.editorElementRefIds();
  const setEditorElementRefIds = useTnStore().set.editorElementRefIds();
  return React.useCallback(
    (ref: TnElementRef) => {
      if (!editorElementRefIds.has(ref.id)) {
        setEditorElementRefs((overrides) => {
          overrides.push(ref);

          return overrides;
        });
        setEditorElementRefIds((refs) => {
          refs.add(ref.id);
          return refs;
        });
      } else {
        setEditorElementRefs((overrides) => {
          return overrides.map((e) => {
            if (e.id === ref.id) {
              return ref;
            }
            return e;
          });
        });
      }
    },
    [setEditorElementRefs, setEditorElementRefIds, editorElementRefIds]
  );
};

export const { tnStore, useTnStore, TnProvider } = createTnEditorStore();

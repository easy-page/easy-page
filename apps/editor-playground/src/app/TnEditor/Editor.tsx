import React, { useMemo, useRef } from 'react';
import { createEditor, CustomTypes, Editor } from 'slate';
import { withReact } from 'slate-react';
import { PluginManager, TnEditorRenderPlugin } from './plugins';
import { TnProvider } from './store';
import { BaseTnEditor } from './BaseEditor';
import './index.less';
import {
  onCommandI,
  onTabDown,
  onCommandB,
  onCtrlA,
  onCommandU,
  onCommandShiftX,
} from './plugins/default';
import { withAutoformats, autoformatRules, withInsertNode } from './slate';
import { withBackwords } from './slate/overrides/withBackwords';
import { createEditorWithHoc } from './slate/overrides/createEditorWithHoc';
import { withInsertBreak } from './slate/overrides/withInsertBreak';
import { withSelection } from './slate/overrides/withSelection';
import { withApply } from './slate/overrides/withApply';
import { onMouseUp } from './plugins/default/events/onMouseUp';
import { onKeyboardEvent } from './plugins/default/events/onKeyboradEvent';
import { withHistory } from './slate/overrides/withHistory';

export type TnEditorProps = {
  initialValue: Array<CustomTypes['Element']>;
  elementPlugins: Record<string, TnEditorRenderPlugin>;
  /** 每个编辑器实例有自己的 id */
  editorId: string;
  /** 空内容时候提示文案 */
  placeholder?: string;
};

/**
 * @param param0
 * @returns
 */

export const TnEditor = ({
  editorId,
  initialValue,
  elementPlugins,
  placeholder,
}: TnEditorProps) => {
  // const { editor } = editorGlobalStore.getEditorStore(editorId);
  const editor = useMemo(() => {
    const editor = createEditorWithHoc(
      [
        withInsertNode,
        withHistory,
        withApply,
        // withSelection,
        withInsertBreak,
        withBackwords,
        withAutoformats({
          rules: autoformatRules,
        }),
        withReact,
      ],
      createEditor()
    );
    editor.children = initialValue;
    editor.pluginManager = new PluginManager({
      elementPlugins,
      eventPlugins: [
        // onTabDown,
        // onCtrlA,
        // onMouseUp,
        // onKeyboardEvent,
        // onCommandB,
        // onCommandI,
        // onCommandU,
        // onCommandShiftX,
      ],
    });
    return editor;
  }, []);

  const editorRef = useRef<Editor | null>(null);

  return (
    <TnProvider
      id={editorId}
      beforeInput=""
      editor={editor}
      floatRef={null}
      editorRef={editorRef}
    >
      <BaseTnEditor
        initialValue={initialValue}
        placeholder={placeholder}
        editorId={editorId}
      />
    </TnProvider>
  );
};

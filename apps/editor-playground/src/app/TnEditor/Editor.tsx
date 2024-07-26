import React, { useCallback, useMemo, useRef, useState } from 'react';
import { createEditor, CustomTypes, Editor } from 'slate';
import { Slate, withReact } from 'slate-react';
import { PluginManager, TnEditorRenderPlugin } from './plugins';
import { TnProvider } from './store';

import { BaseTnEditor } from './BaseEditor';
import './index.less';
import { onTabDown } from './plugins/default';
import { withAutoformats, autoformatRules } from './slate';
import { withBackwords } from './slate/overrides/withBackwords';

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
    const editor = withBackwords(
      withAutoformats(withReact(createEditor()), {
        rules: autoformatRules,
      })
    );
    editor.children = initialValue;
    editor.pluginManager = new PluginManager({
      elementPlugins,
      eventPlugins: [onTabDown],
    });
    return editor;
  }, []);

  const editorRef = useRef<Editor | null>(null);

  return (
    <TnProvider
      id={editorId}
      beforeInput=""
      editor={editor}
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

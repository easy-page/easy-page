import React, { useCallback } from 'react';
import { Editable, Slate } from 'slate-react';
import { PluginManager } from './plugins';
import { FloatingToolbar, Leaf } from './components';
import { EditorSelectionEffect } from './effects';
import './index.css';
import './index.less';

import { useEditorEmpty, useEditorRef } from './hooks';
import classNames from 'classnames';
import { isEmptyContent } from './slate';
import { CustomElement } from './interface';

export type TnEditorProps = {
  /** 每个编辑器实例有自己的 id */
  editorId: string;
  placeholder?: string;
  initialValue: CustomElement[];
};

export const BaseTnEditor = ({
  editorId,
  placeholder,
  initialValue,
}: TnEditorProps) => {
  const editor = useEditorRef();

  const renderLeaf = useCallback((props: any) => {
    return <Leaf {...props} />;
  }, []);

  const { setIsEmpty, isEmpty } = useEditorEmpty(isEmptyContent(editor));

  return (
    <div
      className={classNames('flex flex-col ', {
        'empty-first-line': isEmpty,
      })}
    >
      <div className="first-line-placeholder">
        <span>{placeholder}</span>
      </div>
      <Slate
        editor={editor}
        onChange={() => {
          setIsEmpty(isEmptyContent(editor));
        }}
        initialValue={initialValue}
      >
        <FloatingToolbar editorId={editorId} />
        <Editable
          renderElement={editor.pluginManager.renderElement}
          renderLeaf={renderLeaf}
          onKeyDown={(event) => {
            editor.pluginManager.handleEvent(event, editor);
            console.log('event:', event);
          }}
          className="w-[800px] h-[600px] border pb-2 pt-8 px-8"
        />
        <EditorSelectionEffect id={editorId} />
      </Slate>
    </div>
  );
};

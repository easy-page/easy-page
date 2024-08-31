import React, { useCallback } from 'react';
import { Editable, Slate } from 'slate-react';
import { FloatingToolbar, Leaf } from './components';
import { EditorSelectionEffect } from './effects';
import './index.css';
import './index.less';

import { useEditorEmpty, useEditorRef } from './hooks';
import classNames from 'classnames';
import { isEmptyContent } from './slate';
import { CustomElement } from './interface';
import { EventType } from './constants';
import { replaceWithNormalNode } from './slate/transform';
import { getCurNodeInfo } from './plugins/default/events/utils/getCurNodeInfo';
import { useTnStore } from './store';
import { throttle } from 'lodash';
import { getFloatingRef } from './utils/getFloatingRef';
import { ElementToolbar } from './components/common/ElementToolbar';

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
  const setFloatRef = useTnStore().set.floatRef();
  const editorElementRefs = useTnStore().get.editorElementRefs();

  const calcFloatRef = throttle(
    useCallback(
      (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        // const refInfo = getFloatingRef(e, editorElementRefs);
        // console.log('refInforefInfo:', editorElementRefs, refInfo);
        // setFloatRef(refInfo);
      },
      [setFloatRef, editorElementRefs]
    ),
    100
  );

  return (
    <div
      onMouseMove={calcFloatRef}
      className={classNames(
        'w-full h-full flex flex-col py-10 px-64 items-center justify-center relative',
        {
          'empty-first-line': isEmpty,
        }
      )}
    >
      <Slate
        editor={editor}
        onChange={() => {
          setIsEmpty(isEmptyContent(editor));
        }}
        initialValue={initialValue}
      >
        <FloatingToolbar editorId={editorId} />
        <ElementToolbar />
        <div className="flex flex-row relative w-full h-full">
          <Editable
            renderElement={editor.pluginManager.renderElement}
            renderLeaf={renderLeaf}
            customAfterDOMBeforeInput={() => {
              if (editor.children?.length === 1) {
                const { curNode } = getCurNodeInfo(editor);
                if (curNode) {
                  replaceWithNormalNode(editor, { curNode });
                }
              }
            }}
            onMouseMove={(event) => {}}
            onMouseUp={(event) => {
              editor.pluginManager.handleEvent(event, editor, {
                eventType: EventType.OnMouseUp,
              });
              console.log('event:', event);
            }}
            onKeyDown={(event) => {
              editor.pluginManager.handleEvent(event, editor);
              console.log('event:', event);
            }}
            className="w-full h-full pb-2 pt-8 px-8 outline-none"
          />
          <div className="first-line-placeholder">
            <span>{placeholder}</span>
          </div>
        </div>
        <EditorSelectionEffect id={editorId} />
      </Slate>
    </div>
  );
};

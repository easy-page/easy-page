import { RenderElementProps } from '@easy-page-slate-react';
import { TnElement } from '../../common/TnElement';
import classNames from 'classnames';
import { useEditorRef, useIndentTips } from '../../../hooks';
import './index.less';
import { addBlockProperties } from '../../../slate/transform';
import { findNodePath } from '../../../slate';
import { CustomElement } from '../../../interface';
import { Tips } from '../../common';

export const TodoElement = (props: RenderElementProps) => {
  const { element } = props;
  const editor = useEditorRef();
  const node = element as CustomElement;
  const { indentClass, showText } = useIndentTips(node);

  return (
    <TnElement
      wrapperClassName="todo-block-wrapper"
      blockNodeClassName={classNames(
        'todo-block relative pl-[24px] items-center',
        indentClass
      )}
      nodeChildrenClassName="todo-children ml-4"
      textContentClass={classNames({
        'text-[#90949A] line-through': element.checked,
      })}
      addAfterText={showText && <Tips msg={'无法缩进当前内容块'} />}
      addBeforeText={
        <div
          contentEditable={false}
          onClick={(e) => {
            const path = findNodePath(editor, element);
            if (path) {
              addBlockProperties(
                editor,
                {
                  checked: !element.checked,
                },
                {
                  at: path,
                }
              );
            }
            e.stopPropagation();
            e.preventDefault();
          }}
          className={classNames('select-none todo-checkbox', {
            'todo-checkbox-done': element.checked,
          })}
        ></div>
      }
      {...props}
    ></TnElement>
  );
};

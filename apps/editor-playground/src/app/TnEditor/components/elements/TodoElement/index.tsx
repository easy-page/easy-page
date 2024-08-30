import { RenderElementProps } from '@easy-page-slate-react';
import { TnElement } from '../../common/TnElement';
import classNames from 'classnames';
import { useEditorRef } from '../../../hooks';
import './index.less';
import { addBlockProperties } from '../../../slate/transform';

export const TodoElement = (props: RenderElementProps) => {
  const { element } = props;
  const editor = useEditorRef();
  return (
    <TnElement
      wrapperClassName="todo-block-wrapper"
      blockNodeClassName="todo-block relative pl-[24px] flex flex-row items-center"
      nodeChildrenClassName="todo-children ml-4"
      CustomText={({ children: textChildren }) => (
        <>
          <div
            contentEditable={false}
            onClick={() => {
              addBlockProperties(editor, {
                checked: !element.checked,
              });
            }}
            className={classNames('todo-checkbox', {
              'todo-checkbox-done': element.checked,
            })}
          ></div>
          {textChildren}
        </>
      )}
      {...props}
    ></TnElement>
  );
};

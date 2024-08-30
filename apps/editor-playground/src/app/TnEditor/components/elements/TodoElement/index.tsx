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
      blockNodeClassName="todo-block relative pl-[24px]"
      nodeChildrenClassName="todo-children ml-4"
      CustomText={({ children: textChildren }) => (
        <>
          {/* <input
            className="todo-checkbox"
            type="checkbox"
            contentEditable={false}
          /> */}

          <div
            className={classNames('todo-content', {
              'task-done': element.checked,
            })}
            onClick={(e) => {
              console.log('click eeeee:', e);
              const rect = e.currentTarget.getBoundingClientRect();
              if (rect.left > e.clientX) {
                // 点击了伪元素
                addBlockProperties(editor, {
                  checked: !element.checked,
                });
              }
            }}
          >
            {textChildren}
          </div>
        </>
      )}
      {...props}
    ></TnElement>
  );
};

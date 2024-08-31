import { RenderElementProps } from '@easy-page-slate-react';
import { TnElement } from '../../common/TnElement';
import classNames from 'classnames';
import { useEditorRef } from '../../../hooks';
import './index.less';
import { addBlockProperties } from '../../../slate/transform';
import { useEffect } from 'react';

export const TodoElement = (props: RenderElementProps) => {
  const { element } = props;
  const editor = useEditorRef();
  useEffect(() => {
    return () => {
      console.log('zujian bei xiezai l ');
    };
  }, []);
  return (
    <TnElement
      wrapperClassName="todo-block-wrapper"
      blockNodeClassName="todo-block relative pl-[24px]"
      nodeChildrenClassName="todo-children ml-4"
      addBeforeText={
        <div
          className={classNames('todo-content inline-flex', {
            'task-done': element.checked,
          })}
          // onSelect={(e) => {
          //   console.log('1213123123123');
          //   e.stopPropagation();
          //   e.preventDefault();
          // }}
          onClick={(e) => {
            console.log('click eeeee:', e);
            const rect = e.currentTarget.getBoundingClientRect();
            if (rect.left > e.clientX) {
              // 点击了伪元素
              // addBlockProperties(editor, {
              //   checked: !element.checked,
              // });
            }
          }}
        ></div>
      }
      {...props}
    ></TnElement>
  );
};

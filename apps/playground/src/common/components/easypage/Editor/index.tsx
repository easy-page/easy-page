import { ComponentProps, connector } from '@easy-page/antd-ui';
import React, { useContext, useState } from 'react';
import { EditorPro } from '@roo/roo-plus';
import { EditorBaseProps } from './interface';
import { menuConfig } from './menuConfig';
import classNames from 'classnames';
import './index.less';
import { FormItemInputContext } from 'antd/es/form/context';
// import { PlateEditor, any } from '../../base';

/**
 * - 1. 定义组件 Props，一般由：UI 库组件本身 Props + 框架通用组件 Props + 自定义组件 Props 构成
 */
export type EditorProps = ComponentProps<EditorBaseProps, any>;

export type EditorEffectedResultType = any;

/**
 * - 2. 重写 FieldUIConfig，增加组件配置提示
 */
declare module '@easy-page/antd-ui' {
  export interface FieldUIConfig {
    // TODO 类型定义
    editor?: any;
  }
}
/**
 * - 3. 编写通用组件逻辑
 * @param props
 * @returns
 */
export const Editor = connector(
  React.memo((props: EditorProps) => {
    const {
      frameworkProps: { effectedResult = {} },
      disabled,
      ...baseProps
    } = props;

    const { status: contextStatus } = useContext(FormItemInputContext);
    const hasError = contextStatus === 'error';
    return (
      <div
        className={classNames({
          'border border-[#EC5B56] root editor-status-error': hasError,
        })}
      >
        <EditorPro
          {...baseProps}
          customMenuConfig={menuConfig}
          className={classNames('h-[250px]', {
            'disabled-editor': disabled,
          })}
          customToolbarConfig={{
            excludeKeys: [
              'insertVideo',
              'uploadVideo',
              'todo',
              'undo',
              'redo',
              'codeBlock',
              'tableHeader',
              'tableFullWidth',
              'insertTable',
            ],
          }}
          mode="simple"
          {...effectedResult}
          readOnly={disabled}
        />
      </div>
    );
  }),
);

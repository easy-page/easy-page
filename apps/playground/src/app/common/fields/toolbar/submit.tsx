import { nodeUtil } from '@easy-page/antd-ui';
import React from 'react';
import { Button } from 'antd';

export const submit = nodeUtil.createCustomNode(
  'submit',
  ({ frameworkProps: { getFormUtil } }) => {
    return (
      <Button
        type="primary"
        style={{ marginLeft: 12 }}
        onClick={() => {
          const formUtil = getFormUtil?.();
          console.log('表单值：', formUtil?.getFormData());
        }}
      >
        提交
      </Button>
    );
  },
  {
    value: '',
  }
);

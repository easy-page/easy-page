import { nodeUtil } from '@easy-page/antd-ui';
import React from 'react';
import { Button } from 'antd';

export const validate = nodeUtil.createCustomNode(
  'validate',
  ({ frameworkProps: { getFormUtil } }) => {
    return (
      <Button
        onClick={async () => {
          const formUtil = getFormUtil?.();
          try {
            await formUtil?.validateAll();
          } catch (error) {
            console.log('验证结果:', error);
          }
        }}
      >
        验证
      </Button>
    );
  },
  {
    value: '',
  }
);

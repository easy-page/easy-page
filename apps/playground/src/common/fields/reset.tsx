import { nodeUtil } from '@easy-page/antd-ui';
import { Button } from 'antd';

export const resetBtn = (options?: { id?: string; label?: string }) => {
  const { id, label } = options || {};
  return nodeUtil.createCustomNode(
    id || 'rest',
    ({ frameworkProps: { getFormUtil } }) => {
      return (
        <Button
          type="default"
          onClick={() => {
            const formUtil = getFormUtil?.();
            formUtil?.resetFields?.();
          }}
        >
          {label || '重置'}
        </Button>
      );
    },
    {},
  );
};

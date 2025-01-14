import { Empty, nodeUtil } from '@easy-page/antd-ui';
import { Button } from 'antd';
import { ToolbarProps } from './interface';

export const cancel = nodeUtil.createCustomNode<any, Empty, ToolbarProps>(
  'cancel',
  ({ frameworkProps: { store } }) => {
    const { onCancel } = store.getPageProps() as ToolbarProps;
    return (
      <Button
        onClick={() => {
          onCancel?.();
        }}
      >
        返回
      </Button>
    );
  },
  {},
);

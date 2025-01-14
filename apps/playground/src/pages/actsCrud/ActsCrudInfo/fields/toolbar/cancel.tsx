import { nodeUtil } from '@easy-page/antd-ui';
import { Button } from 'antd';

export type CancelOptions = {
  cancelText: string;
  cancelHandler: () => void;
};

export const cancel = ({ cancelText, cancelHandler }: CancelOptions) =>
  nodeUtil.createCustomNode(
    'cancel',
    () => {
      return (
        <Button onClick={cancelHandler} className="mr-2">
          {cancelText}
        </Button>
      );
    },
    {},
  );

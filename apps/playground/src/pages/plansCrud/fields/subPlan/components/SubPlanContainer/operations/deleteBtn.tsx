import { Button } from 'antd';
import { OperationContext } from './interface';

export const DeleteBtn = ({ childForms, onRemove }: OperationContext) => {
  if (childForms.length === 1) {
    return <></>;
  }
  return (
    <Button
      onClick={() => {
        onRemove();
      }}
    >
      删除子方案
    </Button>
  );
};

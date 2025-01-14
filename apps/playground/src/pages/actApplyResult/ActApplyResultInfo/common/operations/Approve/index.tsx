import { RequestResult, ZsptButton } from '@/common';
import { Button, Modal, message } from 'antd';
import React from 'react';

export type ApproveProps<T> = {
  onConfirm: () => Promise<RequestResult<any>>;
};
export function Approve<T>(props: ApproveProps<T>) {
  const { onConfirm } = props;
  return (
    <ZsptButton
      type="text"
      onClick={() => {
        Modal.confirm({
          centered: true,
          title: '确认该活动审核通过吗？',
          cancelText: '取消',
          okText: '确认',
          async onOk() {
            const result = await onConfirm();
            if (result.success) {
              message.success('该活动审核已通过');
            }
            return null;
          },
        });
      }}
    >
      审核通过
    </ZsptButton>
  );
}

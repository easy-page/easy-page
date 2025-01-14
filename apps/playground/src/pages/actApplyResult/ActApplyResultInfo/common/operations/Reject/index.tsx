import { RequestResult, ZsptButton } from '@/common';
import { Button, Modal, message } from 'antd';
import RejectDialog from '../../components/RejectDialog';

export type RejectProps<T> = {
  onConfirm: (options: { reason: string }) => Promise<RequestResult<any>>;
};

export function Reject<T>(props: RejectProps<T>) {
  const { onConfirm } = props;
  return (
    <ZsptButton
      type="text"
      onClick={async () => {
        const reason: string | undefined = await RejectDialog.show({
          title: '写给商家的驳回理由',
          cancelText: '取消',
          okText: '确认',
          placeholder: '请输入驳回理由',
        });
        if (reason) {
          Modal.confirm({
            centered: true,
            title: '确认该活动审核驳回吗？',
            cancelText: '取消',
            okText: '确认',
            async onOk() {
              const result = await onConfirm({
                reason,
              });
              if (result.success) {
                message.success('该活动审核已驳回');
              }
              return null;
            },
          });
        }
      }}
    >
      审核驳回
    </ZsptButton>
  );
}

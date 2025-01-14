import { OperationContext } from './interface'
import { ZsptButton } from '@/common'
import { Modal, message } from 'antd'

export const StopBtn = ({ updateStatusToStop }: OperationContext) => {
  return (
    <ZsptButton
      onClick={async () => {
        Modal.confirm({
          title: '确认停用？',
          centered: true,
          content:
            '停用后，本方案不可绑定新建的提报活动，但已经完成绑定且发送给商家的提报活动不受影响，请再次确认',
          okText: '确认',
          cancelText: '取消',
          async onOk() {
            // const res = await pauseSubPlan({
            //   groupId,
            // });
            // if (res.success) {
            //   message.success('停用子方案成功');
            //   updateStatusToStop();
            // }
            updateStatusToStop()
          },
        })
      }}
    >
      停用子方案
    </ZsptButton>
  )
}

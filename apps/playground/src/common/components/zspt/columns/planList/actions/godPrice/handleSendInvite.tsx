import { sendPlanInvite } from '@/common/apis'
import { sendGodPriceInvite } from '@/common/apis/sendGodPriceInvite'
import { PartitionInfoList } from '@/common/components/zspt/PartitionInfoList'
import { zsptConfirm } from '@/common/components/zspt/ZsptConfirm'
import { getBizLine } from '@/common/libs'
import { loadPlanListToModel } from '@/common/models'
import { message } from 'antd'
import { PlanOpActionHandler } from '../common/interface'

export const handleGodPriceSendInvite: PlanOpActionHandler = async ({
  record,
}) => {
  const res = await sendGodPriceInvite({ planId: record.id })
  if (res.success) {
    zsptConfirm({
      title: '确认发送邀请？',
      content: (
        <PartitionInfoList
          desc={'发送邀请后，会立即邀请合作业务组加入，请确认。'}
          groupInfo={res.data || []}
          modalMinHeight={'unset'}
        />
      ),
      onOk: async () => {
        const res = await sendPlanInvite({ planId: record.id })
        if (res.success) {
          message.success(res.msg || '发送邀请成功')
          loadPlanListToModel(getBizLine())
        } else {
          message.error(
            <div dangerouslySetInnerHTML={{ __html: res.msg }}></div>
          )
        }
      },
    })
  }
  return Promise.resolve()
}

import { sendPlanInvite } from '@/common/apis'
import { zsptConfirm } from '@/common/components/zspt/ZsptConfirm'
import { ActivityStatusAmount, ActivityStatusEnum } from '@/common/constants'
import { getBizLine } from '@/common/libs'
import { loadPlanListToModel } from '@/common/models'
import { message } from 'antd'
import { PlanOpActionHandler } from '../common/interface'

export const handleBrandSendInvite: PlanOpActionHandler = async ({
  record,
}) => {
  const createdActStat = record.activityStatusAmount?.find(
    (item: ActivityStatusAmount) =>
      item.activityStatus === ActivityStatusEnum.Created
  )
  if (!createdActStat) {
    zsptConfirm({
      type: 'error',
      title: '无可发送邀请的提报活动,可至查看页面查看提报活动的具体状态!',
      cancelButtonProps: { hidden: true },
    })
    return Promise.resolve()
  }
  if (createdActStat.amount > 0) {
    zsptConfirm({
      type: 'error',
      title: `当前有${createdActStat?.amount}个活动待发邀请，是否确认批量发送邀请?`,
      content: (
        <section style={{ maxHeight: '600px', overflowY: 'auto' }}>
          {createdActStat.activities.map((item: any, index: number) => {
            return (
              <p key={index}>
                {item.id}-{item.name}
              </p>
            )
          })}
        </section>
      ),
      async onOk() {
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
    return Promise.resolve()
  }
}

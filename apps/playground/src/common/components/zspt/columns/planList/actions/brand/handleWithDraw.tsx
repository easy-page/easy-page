import { zsptConfirm } from '@/common/components/zspt/ZsptConfirm'
import { ActivityStatusAmount, ActivityStatusEnum } from '@/common/constants'
import { Anchor, message } from 'antd'
import { planWithdraw } from '@/common/apis/planWithdraw'
import { loadPlanListToModel } from '@/common/models'
import { getBizLine } from '@/common/libs'
import { PlanOpActionHandler } from '../common/interface'

export const handleBrandWithDraw: PlanOpActionHandler = async ({ record }) => {
  //方案下活动状态不为邀请中、已终止均可被撤回
  const withdrawAbleActivitys =
    record.activityStatusAmount
      ?.filter(
        (item: ActivityStatusAmount) =>
          ![
            ActivityStatusEnum.Terminated,
            ActivityStatusEnum.Inviting,
          ].includes(item.activityStatus)
      )
      ?.reduce((result: any, item: any) => {
        return result.concat(item.activities)
      }, []) || []

  console.log('recordrecord:', record)
  const flowResourceArr = record.flowResource?.packages || []

  if (withdrawAbleActivitys.length > 0 || flowResourceArr.length > 0) {
    zsptConfirm({
      title: `确认要批量撤回吗？`,
      content: (
        <section style={{ maxHeight: '600px', overflowY: 'auto' }}>
          <p>本次将撤回以下内容，撤回后不可恢复，请再次确认。</p>
          <div>【提报活动】</div>
          {withdrawAbleActivitys.map((item: any, index: number) => {
            return (
              <p style={{ paddingLeft: '8px' }} key={index}>
                {index + 1}. {item.id}-{item.name}
              </p>
            )
          })}
          {flowResourceArr?.length > 0 ? <div>【流量资源】</div> : <></>}
          {flowResourceArr.map((item: any, index: number) => (
            <p style={{ paddingLeft: '8px' }} key={item.netFlowId}>
              {index + 1}. {item.netFlowName}
            </p>
          ))}
        </section>
      ),
      type: 'warning',
      onOk: async () => {
        const res = await planWithdraw({ planId: record.id })
        if (res.success) {
          message.success(res.msg || '撤回方案成功')
          loadPlanListToModel(getBizLine())
        } else {
          message.error(
            <div dangerouslySetInnerHTML={{ __html: res.msg }}></div>
          )
        }
      },
    })
  } else {
    zsptConfirm({
      title: '无可撤回的内容!',
      type: 'warning',
      cancelButtonProps: { hidden: true },
    })
  }
}

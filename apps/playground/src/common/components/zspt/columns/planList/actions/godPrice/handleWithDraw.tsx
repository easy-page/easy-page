import { zsptConfirm } from '@/common/components/zspt/ZsptConfirm'
import { ActivityStatusEnum } from '@/common/constants'
import { message } from 'antd'
import { planWithdraw } from '@/common/apis/planWithdraw'
import { getBizLine } from '@/common/libs'
import { loadPlanListToModel } from '@/common/models'
import './index.less'
import { PlanOpActionHandler } from '../common/interface'
export const handleGodPriceWithDraw: PlanOpActionHandler = async ({
  record,
}) => {
  let canWithdrawActArr: any[] = []
  let catNotWithdrawActArr: any[] = []

  const { activityStatusAmount = [] } = record
  console.log('activityStatusAmount:', activityStatusAmount)

  activityStatusAmount?.map((item: any) => {
    if (item?.activityStatus === ActivityStatusEnum.Terminated) {
      catNotWithdrawActArr = catNotWithdrawActArr.concat(item?.activities)
    } else {
      canWithdrawActArr = canWithdrawActArr.concat(item?.activities)
    }
  })

  zsptConfirm({
    title: '确认要批量撤回吗？',
    content: (
      <div className="widthdraw-plan-modal">
        <p>本次预期撤回结果如下，完成后不可恢复，请确认。</p>
        <p>1、未加入的合作方业务组，无法加入本次招商。</p>
        {activityStatusAmount.length > 0 && (
          <>
            <p>2、已加入的合作方创建的提报活动，将被撤回，明细如下</p>
            <div className="act-list-contianer">
              {/* <Anchor
                items={[
                  {
                    key: 'can-withdraw-list',
                    title: '可撤回活动',
                    href: 'can-withdraw-list',
                  },
                  {
                    key: 'can-not-withdraw-list',
                    title: '不可撤回活动',
                    href: 'can-not-withdraw-list',
                  },
                ]}
                getContainer={() =>
                  document.querySelector('.act-list-content') as any
                }
              /> */}

              <div className="act-list-content">
                <div className="act-list" id={'can-withdraw-list'}>
                  <div className="act-list-title">
                    可撤回{canWithdrawActArr.length}个提报活动
                  </div>
                  {canWithdrawActArr.map((item, index: number) => (
                    <div
                      className="act-list-item"
                      key={`act-list-item${index}`}
                    >
                      {index + 1}.{item.id}-{item.name}
                    </div>
                  ))}
                </div>
                <div className="act-list" id={'can-not-withdraw-list'}>
                  <div className="act-list-title">
                    不可撤回{catNotWithdrawActArr.length}个提报活动
                  </div>
                  {catNotWithdrawActArr.map((item, index: number) => (
                    <div
                      className="act-list-item"
                      key={`act-list-item${index}`}
                    >
                      {index + 1}.{item.id}-{item.name}，原因：活动状态已终止
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    ),
    onOk: async () => {
      const res = await planWithdraw({ planId: record.id })
      if (res.success) {
        message.success(res.msg || '撤回成功')
        loadPlanListToModel(getBizLine())
      } else {
        message.error(
          <div dangerouslySetInnerHTML={{ __html: res.msg }}></div>
        )
      }
    },
  })
}

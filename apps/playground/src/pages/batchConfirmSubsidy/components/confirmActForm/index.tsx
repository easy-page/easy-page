import {
  DEFAULT_COMPONENTS,
  EXTRA_COMPONENTS,
  EasyPage,
  EasyPageOnChangeContext,
  NodeInfo,
  NodeInfoWithChildren,
  PageUtil,
} from '@easy-page/antd-ui'
import { useEffect, useMemo, useState } from 'react'
import { confirmActFormInfo } from './pageInfo'
import { BatchConfirmFormState } from './interface'
import {
  ActConrirmSubTabResources,
  ActSubTabResources,
  BizLineEnum,
  ChargeSideEnum,
  getPnList,
  getQueryString,
  IsMisOrgPn,
  mccModel,
  PlanAndActTabResources,
  pnListModel,
  toPlanAndActList,
} from '@/common'
import { observer } from 'mobx-react'
import { Button, message, Modal } from 'antd'
import { PreviewModalInfo } from './components/previewModalInfo'
import {
  submidBatchConfirmSubsidy,
  SubmidBatchConfirmSubsidyParams,
} from '@/common/apis/batchConfirmSubsidy'

export const ConfirmActForm = observer(() => {
  /** 用于筛选条件发生变化，刷新表单 */
  const [timestamp, setTimestamp] = useState(new Date().getTime())
  const {
    data: { brandSubsidy_mtSubsidy_ratio_map },
  } = mccModel.getData()

  const { superMarketKA = 2.8 } = brandSubsidy_mtSubsidy_ratio_map

  const onConfirm = async (data: SubmidBatchConfirmSubsidyParams) => {
    const confirm4Batch = getQueryString('confirm4Batch')
    const res = await submidBatchConfirmSubsidy({
      ...data,
      confirm4Batch: confirm4Batch === 'true',
    })
    if (res.success) {
      message.success('提交成功，确认结果请关注大象消息')
      setTimeout(() => {
        toPlanAndActList(
          {
            tab: PlanAndActTabResources.Act,
            actFilterType: ActSubTabResources.Confirm,
            bizLine: `${BizLineEnum.ShanGou}`,
            confirmSubTab: ActConrirmSubTabResources.Brand,
          },
          '_self'
        )
      }, 1000)
    }
  }

  const handleAuthCheckModal = ({ data }) => {
    const { data: mccModelData } = mccModel.getData()
    return new Promise((resolve, reject) => {
      Modal.confirm({
        centered: true,
        width: 650,
        content: (
          <div className="h-[180px]" style={{ lineHeight: '22px' }}>
            <div>批量提交结果将通过大象消息通知您，请注意查收。</div>
            <div>
              1. 品牌补贴/美补小于等于 {superMarketKA}
              的活动，需经过直属上级审批，审批通过后才可确认成功。
            </div>
            <div>2、您配置的内容将会提交至风控系统进行风险判断：</div>
            <div className="text-[#3875f6]">
              ①
              风控判定为“高危风险”的活动，将自动发起风控审批，审批通过后才可确认成功。
            </div>
            <div className="text-[#3875f6]">
              ②
              风控判定为“疑似高危”或“无法判断”的活动，需您再次核查确认内容是否有误（可联系风控同学
              {mccModelData.risk_contact_person}
              协助判定），如需修改请在活动确认周期内操作。
            </div>
          </div>
        ),
        okText: '确认并继续',
        cancelText: '返回修改',
        onOk: () => {
          return onConfirm(data)
            .then(() => {
              resolve({})
            })
            .catch((err) => {
              message.error('提交出错，请稍后重试!')
              resolve({})
            })
        },
        onCancel: () => {
          return resolve({})
        },
      })
    })
  }

  return (
    <EasyPage<BatchConfirmFormState, any>
      {...confirmActFormInfo}
      defaultValues={{}}
      context={{
        onCancel() {
          toPlanAndActList(
            {
              tab: PlanAndActTabResources.Act,
              actFilterType: ActSubTabResources.Confirm,
              bizLine: `${BizLineEnum.ShanGou}`,
              confirmSubTab: ActConrirmSubTabResources.Brand,
            },
            '_self'
          )
        },
        async onSubmit({ ...data }, { formUtil, submitType }) {
          console.log('data:::', data)

          return new Promise((resolve, reject) => {
            const instance = Modal.confirm({
              title: '二次确认',
              centered: true,
              className: 'preview-info',
              styles: {
                content: {
                  height: '600px',
                  width: '100%',
                  overflow: 'hidden',
                  padding: 0,
                },
                body: { height: '100%', overflow: 'hidden' },
              },
              content: (
                <div className="flex flex-col justify-between">
                  <PreviewModalInfo
                    actInfo={data.actInfo}
                    subsidyInfo={data.chargeDetailVos}
                  />
                </div>
              ),
              footer: (
                <div className="flex flex-col items-end">
                  <div className="self-end text-[#3c8bf8] mb-4">
                    确认结果将通过大象消息发送给您，请注意查收！
                  </div>
                  <div className="flex justify-end">
                    <Button
                      onClick={() => {
                        console.log('执行这里了吗')
                        // TODO 这里resolve为何不生效，是因为没执行modad的默认方法么
                        resolve({})
                        instance.destroy()
                      }}
                    >
                      返回修改
                    </Button>
                    <Button
                      type="primary"
                      onClick={async () => {
                        await handleAuthCheckModal({
                          data,
                        })
                        resolve({})
                      }}
                      className="ml-4"
                    >
                      确认无误，立即提交
                    </Button>
                  </div>
                </div>
              ),
              okText: '确认无误，立即提交',
              cancelText: '返回修改',
              onOk: async () => {
                await handleAuthCheckModal({
                  data,
                })
                resolve({})
              },
              onCancel: () => {
                resolve({})
              },
            })
          })
        },
      }}
      commonUIConfig={{
        formItem: {
          className: 'mb-2',
        },
      }}
      // onChange={onChange}
      key={`confirm-act-form_${timestamp}`}
      components={{ ...DEFAULT_COMPONENTS, ...EXTRA_COMPONENTS }}
      pageType="form"
    />
  )
})

import { useEffect } from 'react'
import { Modal, message } from 'antd'
import { observer } from 'mobx-react'
import {
  DEFAULT_COMPONENTS,
  EXTRA_COMPONENTS,
  EasyPage,
} from '@easy-page/antd-ui'
import {
  BizLineEnum,
  CrudPlanParams,
  CrudPlanParamsEnum,
  PlanSubTabResources,
  PlanStatusEnum,
  SavePlanParams,
  getPlanDetail,
  savePlan,
  PlanAndActTabResources,
  BaseContainer,
  toNumber,
  SubmitType,
} from '@/common'
import { isEdit, toPlanAndActList } from '@/common/routes'
import { planDetailModel, mccModel, userModel } from '@/common/models'
import { useParamsInfo } from '@/common/hooks'
import { getEditableConfig } from './utils'
import { shenQuanPageInfo } from './pageInfo'
import { ShenQuanPlanFormProps, ShenQuanPlanFormState } from './interface'
import { getPlanDefaultValues } from './utils/getDefaultValues'

export const CrudShenQuanPlan = observer(() => {
  const { data: userInfo } = userModel.getData()
  const { data: mccKeys, loading, error, msg: mccErrorMsg } = mccModel.getData()
  const {
    data: planDetail,
    loading: planDetailLoading,
    error: planDetailError,
    msg: detailErrorMsg,
  } = planDetailModel.getData()
  const { params } = useParamsInfo<CrudPlanParams>()
  useEffect(() => {
    const { planId } = params
    const planIdNum = toNumber(planId || '')
    if (planIdNum) {
      planDetailModel.loadData(
        async () =>
          await getPlanDetail({
            planId: planIdNum,
          })
      )
    }
  }, [])

  const isLoading = loading || planDetailLoading
  const isError = error || planDetailError
  const errorMsg = mccErrorMsg || detailErrorMsg

  const isPublished = planDetail.status === PlanStatusEnum.Published

  return (
    <BaseContainer loading={isLoading} error={isError} errorMsg={errorMsg}>
      <EasyPage<ShenQuanPlanFormState, ShenQuanPlanFormProps>
        pageType="form"
        commonUIConfig={{
          form: {
            labelCol: { span: 3 },
            wrapperCol: { span: 14 },
            className: 'pb-[64px]',
          },
          formItem: {
            colon: false,
            className: 'min-w-[800px]',
          },
        }}
        defaultValues={getPlanDefaultValues({ planDetail, userInfo })}
        // defaultValues={planDetail as any}
        context={{
          maxExpandLevelMcc: mccKeys.amount_limit_4_expand_in_group,
          maxSubPlanCount: mccKeys.amount_limit_4_group_in_plan,
          onCancel() {
            toPlanAndActList(
              {
                tab: PlanAndActTabResources.Plan,
                planFilterType: PlanSubTabResources.Mine,
                bizLine: `${BizLineEnum.ShanGou}`,
              },
              '_self'
            )
          },
          async onSubmit(data, { submitType }) {
            const doSave = async () => {
              const res = await savePlan({
                ...data,
                bizLine: BizLineEnum.ShanGou,
              } as SavePlanParams)
              if (res.success) {
                message.success('保存方案成功')
                setTimeout(() => {
                  if (submitType === SubmitType.Default) {
                    toPlanAndActList(
                      {
                        tab: PlanAndActTabResources.Plan,
                        planFilterType: PlanSubTabResources.Mine,
                        bizLine: `${BizLineEnum.ShanGou}`,
                      },
                      '_self'
                    )
                  } else {
                    window.location.reload()
                  }
                }, 1000)
              } else {
                message.error(res.msg || '保存方案失败')
                console.error('保存方案失败', res.msg)
              }
            }

            Modal.confirm({
              title: '确认提交？',
              centered: true,
              content: !isEdit()
                ? '提交后，在列表中点击“发布方案”，提报活动即可绑定本方案，请确认。'
                : '提交后，修改内容立即生效',
              cancelText: '取消',
              okText: '确认',
              async onOk(...args) {
                return doSave()
              },
            })
          },
          editable: getEditableConfig({
            mode: params[CrudPlanParamsEnum.OperationType],
            planStatus: planDetail.status,
          }),
        }}
        components={{
          ...DEFAULT_COMPONENTS,
          ...EXTRA_COMPONENTS,
        }}
        // key={`${new Date().getTime()}`}
        {...shenQuanPageInfo}
      />
    </BaseContainer>
  )
})

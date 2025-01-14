import { observer } from 'mobx-react'
import { message } from 'antd'
import {
  DEFAULT_COMPONENTS,
  EXTRA_COMPONENTS,
  EasyPage,
} from '@easy-page/antd-ui'
import {
  ActFullInfo,
  ActivityStatusEnum,
  ActSubTabResources,
  ActTypeEnum,
  BaseActContainer,
  BizLineEnum,
  CUSTOM_COMPONENTS,
  FactorInfo,
  PlanAndActTabResources,
  prepareDataForEdit,
  saveAct,
  SubmitType,
} from '@/common'
import {
  factorModel,
  userModel,
  mccModel,
  actDetailModel,
  configListModel,
} from '@/common/models'
import { getActConfig } from '@/common/configs'
import { isEdit, toPlanAndActList } from '@/common/routes'
import { subsidyRuleTable } from './preview'
import { unionCouponPageInfo } from './pageInfo'
import { getActDefaultValues, getEditableConfig } from './lib'
import { UnionCouponFormProps, UnionCouponFormState } from './interface'
import { runChooseOperationEffects } from './effects/runChooseOperationEffects'
import { submitActConfirm } from '../../components'
import { confirmRisk, getSuccessTips } from '../../components/ConfirmRisk'
import {
  actName,
  actTime,
  inviteType,
  promotionType,
} from '../../components/PreviewInfo/fields'
import dayjs from 'dayjs'
import { useMemo } from 'react'

export const UnionCouponForm = observer(() => {
  const {
    data: {
      amount_limit_4_subactivity,
      activity_service_type_4_wm,
      invite_poi_excel_template_url,
      invite_poi_brand_excel_template_url,
    },
  } = mccModel.getData()
  const { data: actDetail } = actDetailModel.getData()
  const { data: factors } = factorModel.getData()
  const { data: userInfo } = userModel.getData()
  const { data: configs } = configListModel.getList()

  const actConfig = getActConfig({
    actType: ActTypeEnum.UNION_COUPON,
    configs,
  })

  const formContext = useMemo(() => {
    return {
      mccSubActMaxCount: amount_limit_4_subactivity,
      factors: { ...(factors || {}) } as FactorInfo,
      bizlineOptions: activity_service_type_4_wm,
      poiInviteTemplateUrl: invite_poi_excel_template_url,
      brandInviteTemplateUrl: invite_poi_brand_excel_template_url,
      onCancel() {
        toPlanAndActList(
          {
            tab: PlanAndActTabResources.Act,
            actFilterType: ActSubTabResources.Mine,
            bizLine: `${BizLineEnum.ShanGou}`,
          },
          '_self'
        )
      },
      onSubmit(data, { submitType }) {
        return submitActConfirm({
          fields: [
            promotionType,
            actName,
            actTime,
            inviteType,
            subsidyRuleTable, // 基础和膨胀补贴规则
          ],
          factors,
          data: data as any,
          async onConfirm() {
            const submitData = prepareDataForEdit(data as ActFullInfo, {
              detailInfo: actDetail,
              clearApplyControl: false, // todo 危险开关  请注意
            })

            const { promotionTime } = submitData?.activity || {}
            const { startTime } = promotionTime
            const status = actDetail?.activity?.status

            const res = await saveAct({
              ...submitData,
              actType: ActTypeEnum.UNION_COUPON,
            })
            if (res.success) {
              confirmRisk({
                saveActRes: res.data,
                onConfirm: () => {
                  message.success(getSuccessTips())

                  setTimeout(() => {
                    if (submitType === SubmitType.Default) {
                      toPlanAndActList(
                        {
                          tab: PlanAndActTabResources.Act,
                          actFilterType: ActSubTabResources.Mine,
                          bizLine: `${BizLineEnum.ShanGou}`,
                        },
                        '_self'
                      )
                    } else {
                      window.location.reload()
                    }
                  }, 1000)
                },
                onCancel: () => {},
              })
            } else {
              message.error(res.msg || '提交失败，请稍后重试')
            }
          },
        })
      },
      editable: getEditableConfig(actDetail),
    }
  }, [
    actDetail,
    activity_service_type_4_wm,
    amount_limit_4_subactivity,
    factors,
    invite_poi_brand_excel_template_url,
    invite_poi_excel_template_url,
  ])

  return (
    <BaseActContainer
      bgBuList={[]}
      factorCodes={actConfig.actFactorInfo?.factorCodes || []}
    >
      <EasyPage<UnionCouponFormState, UnionCouponFormProps>
        commonUIConfig={{
          form: {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
            className: 'pb-[64px]',
          },
          formItem: {
            colon: false,
          },
        }}
        key={'unionCoupon'}
        effects={[
          {
            changedKeys: ['chooseOperation'],
            action: runChooseOperationEffects,
          },
        ]}
        defaultValues={getActDefaultValues({ actDetail, userInfo })}
        context={formContext as any}
        components={{
          ...DEFAULT_COMPONENTS,
          ...EXTRA_COMPONENTS,
          ...CUSTOM_COMPONENTS,
        }}
        pageType="form"
        {...unionCouponPageInfo}
      />
    </BaseActContainer>
  )
})

export * from './fields'

import {
  DEFAULT_COMPONENTS,
  EXTRA_COMPONENTS,
  EasyPage,
} from '@easy-page/antd-ui'
import { wmsPageInfo } from './pageInfo'
import {
  ActCreateTypeEnum,
  ActFullInfo,
  ActSubTabResources,
  ActTypeEnum,
  ActivityStatusEnum,
  AuthTypeEnum,
  BizLineEnum,
  CUSTOM_COMPONENTS,
  ChargeSideEnum,
  GrayRuleCode,
  PlanAndActTabResources,
  PolicyTypeEnum,
  SubmitType,
  isCreate,
  isEdit,
  prepareDataForEdit,
  saveAct,
  toPlanAndActList,
} from '@/common'
import { actDetailModel, factorModel } from '@/common/models'
import { mccModel } from '@/common/models'
import { observer } from 'mobx-react'
import { BaseActContainer } from '@/common'
import { WmsActFormState, WmsActFormProps } from './interface'
import { submitActConfirm } from '../../components'
import {
  promotionType,
  actName,
  poiApplyTime,
  subActTitle,
  dishDiscountPrice,
  discountRate,
  dayStock,
  orderLimit,
  actBudgetControl,
  inviteType,
  actEffectTime,
  poiQualify,
  skuQualify,
  targetUser,
  chargeInfo,
  totalAmount,
} from '../../components/PreviewInfo/fields'
import { message } from 'antd'
import { confirmRisk, getSuccessTips } from '../../components/ConfirmRisk'
import { getDisActDefaultValues } from './lib/getDefaultValues'
import { getWmsEditableConfig } from './lib/getEditableConfig'
import { subsidyAuthModel } from '@/common/models/subsidyAuth'
import { useMemo } from 'react'
import { getActConfig } from '@/common/configs'
import { configListModel } from '@/common/models/configList'
import dayjs from 'dayjs'
import { TimeToDescConfig } from './lib/constant'

export const WmsForm = observer(() => {
  const {
    data: { amount_limit_4_subactivity },
  } = mccModel.getData()
  const { data: actDetail = {} as ActFullInfo } = actDetailModel.getData()
  const { data: resourceIdRes = [] } = subsidyAuthModel.getList()
  const { data: configs = [] } = configListModel.getList()
  const { data: factors } = factorModel.getData()
  const actConfig = getActConfig({
    actType: ActTypeEnum.WAIMA_SOURCE,
    configs,
  })

  const {
    data: {
      invite_poi_brand_excel_template_url,
      invite_poi_excel_template_url,
      factor_association_rules_map,
    },
  } = mccModel.getData()

  console.log('测试泳道发布配置是否生效')

  return (
    <BaseActContainer className="relative" key={'wms'}>
      <EasyPage<WmsActFormState, WmsActFormProps>
        commonUIConfig={{
          form: {
            labelCol: { span: 4 },
            wrapperCol: { span: 16 },
            className: 'pb-[64px]',
          },
          formItem: {
            colon: false,
          },
        }}
        defaultValues={getDisActDefaultValues({
          actDetail: actDetail as ActFullInfo,
        })}
        pageId="waima-source"
        context={useMemo(
          () => ({
            onCancel() {
              toPlanAndActList(
                {
                  tab: PlanAndActTabResources.Act,
                  actFilterType: ActSubTabResources.Mine,
                  bizLine: `${BizLineEnum.WaimaSongJiu}`,
                },
                '_self'
              )
            },
            async onSubmit({ ...data }, { formUtil, submitType }) {
              const formData = data as ActFullInfo
              const defaultValues = formUtil.getOriginFormData()

              const activityData = formData?.activity

              const isSelectSkuAdmin = !!activityData?.skuAdmin

              const { resourceInfo = [] } = activityData || {}

              const {
                data: { drunkhorse_resource_per_activity = 20 },
              } = mccModel.getData()

              if (resourceInfo.length > drunkhorse_resource_per_activity) {
                message.error(
                  `目前最多支持${drunkhorse_resource_per_activity}个资源位，当前配置了${resourceInfo.length}个资源位，请删除多余资源位`
                )
                return
              }

              if (isSelectSkuAdmin) {
                const isSelectNeedSku = resourceInfo.some(
                  (item) => item.needSku
                )

                if (!isSelectNeedSku) {
                  message.error(
                    '选择品类运营合作，需至少有一个资源位需要提报商品信息。'
                  )
                  return
                }
              }

              const isNoSelectNeedSku = resourceInfo.every(
                (item) => !item.needSku
              )

              if (!isSelectSkuAdmin && !isNoSelectNeedSku) {
                message.error(
                  '存在资源位需要提报商品信息，请在合作方中，添加品类运营。'
                )
                return
              }

              // 校验提报流程和当前时间的关系
              const errorTimeLabelArr = []

              const workFlowTime = formData?.activity.confirmTime

              const remoteDataWorkFlowTime = actDetail?.activity?.confirmTime

              Object.keys(workFlowTime).map((item) => {
                const { startTime, endTime } = workFlowTime[item]

                let isEditAndNotOverStartTime = true
                let isEditAndNotOverEndTime = true

                if (
                  isEdit() &&
                  [
                    ActivityStatusEnum.Applying,
                    ActivityStatusEnum.TobeActive,
                    ActivityStatusEnum.Active,
                  ].includes(defaultValues?.actStatus)
                ) {
                  const { startTime: remoteStartTime, endTime: remoteEndTime } =
                    remoteDataWorkFlowTime[item]

                  isEditAndNotOverStartTime = dayjs(
                    remoteStartTime * 1000
                  ).isAfter(dayjs(), 'minute')

                  isEditAndNotOverEndTime = dayjs(remoteEndTime * 1000).isAfter(
                    dayjs(),
                    'minute'
                  )
                }

                if (
                  (isEditAndNotOverStartTime || !isEdit()) &&
                  startTime &&
                  dayjs(startTime * 1000).isBefore(dayjs(), 'minute')
                ) {
                  errorTimeLabelArr.push(TimeToDescConfig[item] + '开始时间')
                }

                if (
                  (isEditAndNotOverEndTime || !isEdit()) &&
                  endTime &&
                  dayjs(endTime * 1000).isBefore(dayjs(), 'minute')
                ) {
                  errorTimeLabelArr.push(TimeToDescConfig[item] + '结束时间')
                }
              })

              // 其他时间字段只在邀请后状态判断
              if (
                isCreate() ||
                (isEdit() &&
                  [
                    ActivityStatusEnum.Created,
                    ActivityStatusEnum.Creating,
                    ActivityStatusEnum.Pause,
                  ].includes(defaultValues?.actStatus))
              ) {
                const { resourceInfo = [] } = formData?.activity || {}
                resourceInfo.map((item, index) => {
                  const { startTime, endTime } = item
                  if (
                    dayjs(startTime * 1000).isBefore(
                      dayjs().startOf('day'),
                      'minute'
                    ) ||
                    dayjs(endTime * 1000).isBefore(
                      dayjs().startOf('day'),
                      'minute'
                    )
                  ) {
                    errorTimeLabelArr.push(`资源位${index + 1}投放时间`)
                  }
                })
              }

              if (errorTimeLabelArr.length > 0) {
                message.error(`${errorTimeLabelArr.join(', ')}不可早于当前时间`)
                return
              }

              return submitActConfirm({
                checkSubActQualify: true,
                fields: [promotionType, actName, actEffectTime, totalAmount],
                factors: factors,
                data: data as any,
                async onConfirm() {
                  const res = await saveAct({
                    ...formData,
                    actType: ActTypeEnum.WAIMA_SOURCE,
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
                                bizLine: `${BizLineEnum.WaimaSongJiu}`,
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
            editable: getWmsEditableConfig(actDetail as ActFullInfo),
          }),
          [factors, actDetail]
        )}
        effects={[]}
        key={'wms'}
        components={{
          ...DEFAULT_COMPONENTS,
          ...EXTRA_COMPONENTS,
          ...CUSTOM_COMPONENTS,
        }}
        pageType="form"
        {...wmsPageInfo}
      />
    </BaseActContainer>
  )
})

export * from './interface'

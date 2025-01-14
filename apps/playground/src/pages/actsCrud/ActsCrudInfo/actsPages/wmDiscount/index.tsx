import { useMemo } from 'react'
import {
  ChildFormState,
  DEFAULT_COMPONENTS,
  EXTRA_COMPONENTS,
  EasyPage,
} from '@easy-page/antd-ui'
import { flatten } from 'lodash'
import { observer } from 'mobx-react'
import { message } from 'antd'
import {
  ActFullInfo,
  ActSubTabResources,
  ActTypeEnum,
  BaseActContainer,
  BizLineEnum,
  CUSTOM_COMPONENTS,
  ChargeSideEnum,
  FactorInfo,
  PlanAndActTabResources,
  SubmitType,
  prepareDataForEdit,
  saveAct,
  toPlanAndActList,
} from '@/common'
import { actDetailModel, factorModel, mccModel } from '@/common/models'
import { subsidyAuthModel } from '@/common/models/subsidyAuth'
import { getActConfig } from '@/common/configs'
import { configListModel } from '@/common/models/configList'
import { wmDisPageInfo } from './pageInfo'
import { getWdActDefaultValues } from './lib/getDefaultValues'
import { getWdEditableConfig } from './lib/getEditableConfig'
import { submitActConfirm } from '../../components'
import { runChooseOperationEffects } from '../../effects'
import { CommonActCrudFormProps, CommonActCrudFormState } from '../../fields'
import {
  promotionType,
  actName,
  actTime,
  poiApplyTime,
  inviteType,
  subActTitle,
  dishDiscountPrice,
  dishDiscountPriceRate,
  dayStock,
  orderLimit,
  targetUser,
  wmDisChargeInfo,
  poiQualify,
  skuQualify,
  wmActTime,
} from '../../components/PreviewInfo/fields'
import { confirmRisk, getSuccessTips } from '../../components/ConfirmRisk'
import { clearWmDiscountSubsidyEffects } from './effects/clearSubsidyEffects'

export const WdForm = observer(() => {
  const { data: factors } = factorModel.getData()
  const { data: actDetail = {} as ActFullInfo } = actDetailModel.getData()
  const { data: resourceIdRes = [] } = subsidyAuthModel.getList()
  const { data: configs = [] } = configListModel.getList()

  const actConfig = getActConfig({
    actType: ActTypeEnum.WM_DISCOUNT,
    configs,
  })

  const {
    data: {
      invite_poi_brand_excel_template_url,
      invite_poi_excel_template_url,
      activity_service_type_4_wm,
      amount_limit_4_subactivity_wm_discount,
      activity_scene_tag_config,
    },
  } = mccModel.getData()

  return (
    <BaseActContainer
      className="relative"
      bgBuList={[ChargeSideEnum.MeiTuanWaiMai]}
      factorCodes={actConfig?.actFactorInfo?.factorCodes || []}
      resourceIdList={actConfig.resourceIdList}
      key={'wd'}
    >
      <EasyPage<CommonActCrudFormState, CommonActCrudFormProps>
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
        defaultValues={getWdActDefaultValues({
          actDetail: actDetail as ActFullInfo,
        })}
        pageId="wm_discount"
        context={useMemo(
          () => ({
            bizlineOptions: activity_service_type_4_wm,
            poiInviteTemplateUrl: invite_poi_excel_template_url,
            brandInviteTemplateUrl: invite_poi_brand_excel_template_url,
            activitySceneTagConfig: activity_scene_tag_config,
            onCancel() {
              toPlanAndActList(
                {
                  tab: PlanAndActTabResources.Act,
                  actFilterType: ActSubTabResources.Mine,
                  bizLine: `${BizLineEnum.WaiMai}`,
                },
                '_self'
              )
            },
            async onSubmit({ ...data }, { formUtil, submitType }) {
              const formData = data as ActFullInfo
              const subActFields = flatten(
                (formData.subActivity || []).map((e, index) => {
                  return [
                    subActTitle(index),
                    poiQualify(index),
                    skuQualify(index),
                    dishDiscountPrice(index, '菜品折扣价格'),
                    dishDiscountPriceRate(index),
                    dayStock(index, '菜品优惠库存'),
                    orderLimit(index),
                    targetUser(index, '优惠面向人群'),
                    wmDisChargeInfo(index),
                  ]
                })
              )
              return submitActConfirm({
                fields: [
                  promotionType,
                  inviteType,
                  actName,
                  wmActTime, // 活动时间
                  poiApplyTime,
                  ...subActFields,
                ],
                factors,
                data: data as any,
                async onConfirm() {
                  const submitData = prepareDataForEdit(data as ActFullInfo, {
                    detailInfo: actDetail,
                    clearApplyControl: false,
                  })
                  console.log('submitData', submitData)

                  const res = await saveAct({
                    ...submitData,
                    actType: ActTypeEnum.WM_DISCOUNT,
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
                                bizLine: `${BizLineEnum.WaiMai}`,
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
            mccSubActMaxCount: amount_limit_4_subactivity_wm_discount,
            factors: { ...(factors || {}) } as FactorInfo,
            resourceIdRes,
            editable: getWdEditableConfig(actDetail as ActFullInfo),
          }),
          [
            resourceIdRes,
            invite_poi_brand_excel_template_url,
            invite_poi_excel_template_url,
            activity_service_type_4_wm,
            factors,
            amount_limit_4_subactivity_wm_discount,
            actDetail,
          ]
        )}
        effects={[
          {
            changedKeys: ['chooseOperation'],
            action: (context) =>
              runChooseOperationEffects({ ...context, actDetail }),
          },

          {
            changedKeys: ['poiType'],
            action: clearWmDiscountSubsidyEffects,
          },
          {
            changedKeys: ['promotionTime.timeRange'],
            action: ({ formUtil }) => {
              const endTime = formUtil.getFieldValue('endTime')
              if (endTime) {
                formUtil.validate(['endTime'])
              }
            },
          },
        ]}
        key={'wd'}
        components={{
          ...DEFAULT_COMPONENTS,
          ...EXTRA_COMPONENTS,
          ...CUSTOM_COMPONENTS,
        }}
        pageType="form"
        {...wmDisPageInfo}
      />
    </BaseActContainer>
  )
})

export * from './interface'

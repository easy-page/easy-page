import {
  DEFAULT_COMPONENTS,
  EXTRA_COMPONENTS,
  EasyPage,
} from '@easy-page/antd-ui'
import { disPageInfo } from './pageInfo'
import {
  ActCreateTypeEnum,
  ActFullInfo,
  ActSubTabResources,
  ActTypeEnum,
  AuthTypeEnum,
  BizLineEnum,
  CUSTOM_COMPONENTS,
  ChargeSideEnum,
  GrayRuleCode,
  PlanAndActTabResources,
  PolicyTypeEnum,
  SubmitType,
  prepareDataForEdit,
  saveAct,
  toPlanAndActList,
} from '@/common'
import { actDetailModel, factorModel } from '@/common/models'
import { mccModel } from '@/common/models'
import { observer } from 'mobx-react'
import { BaseActContainer } from '@/common'
import { DisActFormState, DisActFormProps } from './interface'
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
} from '../../components/PreviewInfo/fields'
import { message } from 'antd'
import { confirmRisk, getSuccessTips } from '../../components/ConfirmRisk'
import { getDisActDefaultValues } from './lib/getDefaultValues'
import { getDisEditableConfig } from './lib/getEditableConfig'
import { runChooseOperationEffects } from '../../effects'
import { subsidyAuthModel } from '@/common/models/subsidyAuth'
import { useMemo } from 'react'
import { getActConfig } from '@/common/configs'
import { configListModel } from '@/common/models/configList'
import { flatten } from 'lodash'
import { clearSubsidyEffects } from '../../effects/clearSubsidyEffects'
import { checkPn } from '../../utils'

export const DisForm = observer(() => {
  const {
    data: { amount_limit_4_subactivity },
  } = mccModel.getData()
  const { data: actDetail = {} as ActFullInfo } = actDetailModel.getData()
  const { data: resourceIdRes = [] } = subsidyAuthModel.getList()
  const { data: configs = [] } = configListModel.getList()
  const { data: factors } = factorModel.getData()
  const actConfig = getActConfig({
    actType: ActTypeEnum.DISCOUNT_NON_BRAND,
    configs,
  })

  console.log('factorsfactors:', factors)

  const {
    data: {
      invite_poi_brand_excel_template_url,
      invite_poi_excel_template_url,
      factor_association_rules_map,
    },
  } = mccModel.getData()

  return (
    <BaseActContainer
      className="relative"
      factorCodes={actConfig?.actFactorInfo?.factorCodes || []}
      resourceIdList={actConfig.resourceIdList}
      bgBuList={[ChargeSideEnum.MeiTuanShanGou]}
      grayCodes={[GrayRuleCode.PoiExpScoreGray]}
      authNeededConfig={{
        activityCreateType: ActCreateTypeEnum.Discount,
        activityType: PolicyTypeEnum.SKU_DISCOUNT,
        authTypes: [AuthTypeEnum.SuperMtCharge],
      }}
      key={'dis'}
    >
      <EasyPage<DisActFormState, DisActFormProps>
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
        pageId="discount_non_brand"
        context={useMemo(
          () => ({
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
            async onSubmit({ ...data }, { formUtil, submitType }) {
              const checkPnRes = await checkPn(data as ActFullInfo, formUtil)
              if (!checkPnRes) {
                return Promise.resolve()
              }
              const formData = data as ActFullInfo

              const subActFields = flatten(
                (formData.subActivity || []).map((e, index) => {
                  return [
                    subActTitle(index),
                    poiQualify(index),
                    skuQualify(index),
                    discountRate(index), // 折扣范围
                    dishDiscountPrice(index, '价格范围'),
                    dayStock(index, '单日库存'),
                    orderLimit(index),
                    targetUser(index),
                    chargeInfo(index),
                  ]
                })
              )
              return submitActConfirm({
                checkSubActQualify: true,
                checkGuideCreate: true,
                fields: [
                  promotionType,
                  inviteType,
                  actName,
                  actEffectTime,
                  poiApplyTime,
                  ...subActFields,
                  actBudgetControl,
                ],
                factors: factors,
                data: data as any,
                async onConfirm() {
                  const submitData = prepareDataForEdit(data as ActFullInfo, {
                    detailInfo: actDetail,
                    clearApplyControl: false,
                  })

                  console.log('submitData', submitData)

                  const res = await saveAct({
                    ...submitData,
                    actDetail,
                    actType: ActTypeEnum.DISCOUNT_NON_BRAND,
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
            mccSubActMaxCount: amount_limit_4_subactivity,
            resourceIdRes,
            factorAssociationRulesMap: factor_association_rules_map,
            editable: getDisEditableConfig(actDetail as ActFullInfo),
          }),
          [
            resourceIdRes,
            invite_poi_brand_excel_template_url,
            invite_poi_excel_template_url,
            factors,
            amount_limit_4_subactivity,
            actDetail,
            factor_association_rules_map,
          ]
        )}
        effects={[
          {
            changedKeys: ['chooseOperation'],
            action: (context) => {
              return runChooseOperationEffects({
                ...context,
                actDetail,
              })
            },
          },
          {
            changedKeys: ['poiType', 'chargeFlowType'],
            action: clearSubsidyEffects,
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
        key={'dis'}
        components={{
          ...DEFAULT_COMPONENTS,
          ...EXTRA_COMPONENTS,
          ...CUSTOM_COMPONENTS,
        }}
        pageType="form"
        {...disPageInfo}
      />
    </BaseActContainer>
  )
})

export * from './interface'

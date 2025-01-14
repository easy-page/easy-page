import {
  ActFullInfo,
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
  DEFAULT_COMPONENTS,
  EXTRA_COMPONENTS,
  EasyPage,
} from '@easy-page/antd-ui'
import { observer } from 'mobx-react'
import { shenhuiyuanPageInfo } from './pageInfo'
import { factorModel, userModel } from '@/common/models'
import { mccModel } from '@/common/models'
import { ShenhuiyuanFormState, ShenhuiyuanFormProps } from './interface'
import { submitActConfirm } from '../../components'
import {
  actName,
  actTime,
  inviteType,
  promotionType,
} from '../../components/PreviewInfo/fields'
import { subsidyRuleTable } from './preview'
import { message } from 'antd'
import { toPlanAndActList } from '@/common/routes'
import { actDetailModel } from '@/common/models'
import { getActDefaultValues, getEditableConfig } from './lib'
import { confirmRisk, getSuccessTips } from '../../components/ConfirmRisk'
import { runPoiTypeEffects } from './effects/runPoiTypeEffects'
import { runSbsidyRuleInfoEffects } from './effects'
import { configListModel } from '@/common/models/configList'
import { getActConfig } from '@/common/configs'
import { runChooseOperationEffects } from '../../effects'

export const ShenHuiyuanForm = observer(() => {
  const {
    data: {
      amount_limit_4_subactivity,
      activity_service_type_4_wm,
      invite_poi_excel_template_url,
      invite_poi_brand_excel_template_url,
      activity_scene_tag_config,
    },
  } = mccModel.getData()
  const { data: actDetail } = actDetailModel.getData()
  const { data: factors } = factorModel.getData()
  const { data: userInfo } = userModel.getData()
  const { data: configs } = configListModel.getList()

  const actConfig = getActConfig({
    actType: ActTypeEnum.SHEN_HUI_YUAN,
    configs,
  })
  return (
    <BaseActContainer
      bgBuList={[]}
      factorCodes={actConfig.actFactorInfo?.factorCodes || []}
    >
      <EasyPage<ShenhuiyuanFormState, ShenhuiyuanFormProps>
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
        key={'shenhuiyuan'}
        effects={[
          {
            changedKeys: ['subsidyRuleInfo'],
            action: runSbsidyRuleInfoEffects,
          },
          {
            changedKeys: ['chooseOperation'],
            action: (context) =>
              runChooseOperationEffects({ ...context, actDetail }),
          },
          {
            changedKeys: ['poiType'],
            action: runPoiTypeEffects,
          },
        ]}
        defaultValues={getActDefaultValues({ actDetail, userInfo })}
        context={{
          mccSubActMaxCount: amount_limit_4_subactivity,
          factors: { ...(factors || {}) } as FactorInfo,
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
          onSubmit(data, { submitType }) {
            return submitActConfirm({
              fields: [
                promotionType,
                actName,
                actTime,
                inviteType,
                subsidyRuleTable,
              ],
              factors,
              data: data as any,
              async onConfirm() {
                const submitData = prepareDataForEdit(data as ActFullInfo, {
                  detailInfo: actDetail,
                  clearApplyControl: true,
                })
                const res = await saveAct({
                  ...submitData,
                  actType: ActTypeEnum.SHEN_HUI_YUAN,
                })
                if (res.success) {
                  confirmRisk({
                    saveActRes: res.data,
                    onConfirm: () => {
                      message.success(getSuccessTips())

                      if (submitType === SubmitType.Continue) {
                        setTimeout(() => {
                          window.location.reload()
                        }, 1000)
                        return
                      }

                      setTimeout(() => {
                        toPlanAndActList(
                          {
                            tab: PlanAndActTabResources.Act,
                            actFilterType: ActSubTabResources.Mine,
                            bizLine: `${BizLineEnum.WaiMai}`,
                          },
                          '_self'
                        )
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
        }}
        components={{
          ...DEFAULT_COMPONENTS,
          ...EXTRA_COMPONENTS,
          ...CUSTOM_COMPONENTS,
        }}
        pageType="form"
        {...shenhuiyuanPageInfo}
      />
    </BaseActContainer>
  )
})

export * from './fields'

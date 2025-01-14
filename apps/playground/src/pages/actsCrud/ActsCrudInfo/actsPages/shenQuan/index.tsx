import { observer } from 'mobx-react'
import { message } from 'antd'
import {
  DEFAULT_COMPONENTS,
  EXTRA_COMPONENTS,
  EasyPage,
} from '@easy-page/antd-ui'
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
  factorModel,
  userModel,
  mccModel,
  actDetailModel,
  configListModel,
} from '@/common/models'
import { getActConfig } from '@/common/configs'
import { toPlanAndActList } from '@/common/routes'
import { subsidyRuleTable } from './preview'
import { shenQuanPageInfo } from './pageInfo'
import { getActDefaultValues, getEditableConfig } from './lib'
import { ShenQuanFormProps, ShenQuanFormState } from './interface'
import { submitActConfirm } from '../../components'
import { confirmRisk, getSuccessTips } from '../../components/ConfirmRisk'
import {
  actName,
  actTime,
  inviteType,
  promotionType,
} from '../../components/PreviewInfo/fields'
import { runChooseOperationEffects } from '../../effects'

export const ShenQuanForm = observer(() => {
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
    actType: ActTypeEnum.SG_SHEN_QUAN,
    configs,
  })
  return (
    <BaseActContainer
      bgBuList={[]}
      factorCodes={actConfig.actFactorInfo?.factorCodes || []}
    >
      <EasyPage<ShenQuanFormState, ShenQuanFormProps>
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
        key={'shenQuan'}
        effects={[
          {
            changedKeys: ['chooseOperation'],
            action: (context) =>
              runChooseOperationEffects({ ...context, actDetail }),
          },
        ]}
        defaultValues={getActDefaultValues({ actDetail, userInfo })}
        context={{
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
                  clearApplyControl: true,
                })
                const res = await saveAct({
                  ...submitData,
                  actType: ActTypeEnum.SG_SHEN_QUAN,
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
        }}
        components={{
          ...DEFAULT_COMPONENTS,
          ...EXTRA_COMPONENTS,
          ...CUSTOM_COMPONENTS,
        }}
        pageType="form"
        {...shenQuanPageInfo}
      />
    </BaseActContainer>
  )
})

export * from './fields'

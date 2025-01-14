import {
  DEFAULT_COMPONENTS,
  EXTRA_COMPONENTS,
  EasyPage,
} from '@easy-page/antd-ui'
import { collectPageInfo } from './pageInfo'
import {
  ActFullInfo,
  ActSubTabResources,
  ActTypeEnum,
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
import { actDetailModel, factorModel } from '@/common/models'
import { mccModel } from '@/common/models'
import { pnListModel } from '@/common/models'
import { observer } from 'mobx-react'
import { BaseActContainer } from '@/common'
import { CsActFormState, CsActFormProps } from './interface'
import { submitActConfirm } from '../../components'
import {
  actBudgetControl,
  actEffectTime,
  actName,
  inviteType,
  poiApplyTime,
  promotionType,
} from '../../components/PreviewInfo/fields'
import { message } from 'antd'
import { confirmRisk, getSuccessTips } from '../../components/ConfirmRisk'
import { getCsActDefaultValues } from './lib/getDefaultValues'
import { getCsEditableConfig } from './lib/getEditableConfig'
import { runChooseOperationEffects } from '../../effects'
import { needOtherOrgModel } from '@/common/models/needOtherOrgPnAudit'
import { subsidyAuthModel } from '@/common/models/subsidyAuth'
import { configListModel } from '@/common/models/configList'
import { getActConfig } from '@/common/configs'
import { useMemo } from 'react'
import { checkPn } from '../../utils'

export const CollectStoreForm = observer(() => {
  const {
    data: { amount_limit_4_subactivity },
  } = mccModel.getData()
  const { data: factors } = factorModel.getData()
  const { data: pnList } = pnListModel.getList()
  const { data: actDetail = {} as ActFullInfo } = actDetailModel.getData()
  const { data: resourceIdRes = [] } = subsidyAuthModel.getList()
  const { data: configs } = configListModel.getList()

  const actConfig = getActConfig({
    actType: ActTypeEnum.COLLECT_STORE,
    configs,
  })
  const {
    data: {
      invite_poi_brand_excel_template_url,
      invite_poi_excel_template_url,
    },
  } = mccModel.getData()
  const bgBuList = useMemo(() => [ChargeSideEnum.MeiTuanShanGou], [])
  const contextMemo = useMemo(() => {
    return {
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
        return submitActConfirm({
          fields: [
            promotionType,
            inviteType,
            actName,
            actEffectTime,
            poiApplyTime,
            actBudgetControl,
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
              actType: ActTypeEnum.COLLECT_STORE,
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
      factors: { ...(factors || {}) } as FactorInfo,
      resourceIdRes,
      pnListData: pnList || [],
      editable: getCsEditableConfig(actDetail as ActFullInfo),
    }
  }, [
    resourceIdRes,
    pnList,
    invite_poi_brand_excel_template_url,
    invite_poi_excel_template_url,
    factors,
    amount_limit_4_subactivity,
    actDetail,
  ])
  return (
    <BaseActContainer
      className="relative"
      bgBuList={bgBuList}
      factorCodes={actConfig?.actFactorInfo?.factorCodes || []}
      resourceIdList={actConfig.resourceIdList}
      key={'collect-store'}
    >
      <EasyPage<CsActFormState, CsActFormProps>
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
        defaultValues={getCsActDefaultValues({
          actDetail: actDetail as ActFullInfo,
        })}
        pageId="collectStore"
        context={contextMemo}
        effects={[
          {
            changedKeys: ['chooseOperation'],
            action: (context) =>
              runChooseOperationEffects({ ...context, actDetail }),
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
          {
            changedKeys: ['chargeFlowType'],
            action: ({ formUtil }) => {
              formUtil.setField(
                'actRule',
                {
                  allPass: false,
                  pn: [],
                  actStashList: [],
                  actRule: null,
                },
                { validate: false }
              )
            },
          },
          {
            changedKeys: ['actRule'],
            action: () => {
              needOtherOrgModel.resetData()
            },
          },
          {
            changedKeys: ['jhdType'],
            action: ({ formUtil }) => {
              formUtil.setField(
                'actRule',
                {
                  allPass: false,
                  pn: [],
                  actStashList: [],
                  actRule: null,
                },
                { validate: false }
              )
              formUtil.setField('inputId', '', { validate: false })
              formUtil.setField('uploadId', [], { validate: false })
            },
          },
        ]}
        key={'collect-store'}
        components={{
          ...DEFAULT_COMPONENTS,
          ...EXTRA_COMPONENTS,
          ...CUSTOM_COMPONENTS,
        }}
        pageType="form"
        {...collectPageInfo}
      />
    </BaseActContainer>
  )
})

export * from './interface'

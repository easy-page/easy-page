import {
  DEFAULT_COMPONENTS,
  EXTRA_COMPONENTS,
  EasyPage,
  EditableConfig,
  PageInfo,
} from '@easy-page/antd-ui'
import {
  ShyInviteSettingFormProps,
  ShyInviteSettingFormState,
} from './interface'

import { SceneEnum, invitePoi } from '@/common/apis/invitePoi'
import { message } from 'antd'
import { getInvitationDefaultValues } from './utils'
import { ActFullInfo } from '@/common/apis'
import { CUSTOM_COMPONENTS } from '@/common/components'
import { ActionTypeEnum, ActTypeEnum } from '@/common/constants'
import { ConfigListInfo } from '@/common/apis/getConfigList'
import { getActConfig } from '@/common/configs'
import { getBizLine, loadActListToModel, mccModel } from '@/common'
import {
  commonInviteSettingsPageInfo,
  shenquanInviteSettingsPageInfo,
  shyInviteSettingsPageInfo,
} from '@/pages/actsCrud/ActsCrudInfo'
import { observer } from 'mobx-react'
import { wmDiscountInviteSettings } from '@/pages/actsCrud/ActsCrudInfo/fields/inviteSettings/wmDiscountInviteSettings'
import { useMemo } from 'react'

export type ActInviteSettingsProps = {
  actInfo: ActFullInfo
  onClose: () => void
  configs: ConfigListInfo[]
}
export type InviteSettingsConfig = {
  /** 邀请设置编辑页面表单信息 */
  pageInfo: PageInfo<any, any>
  /** 邀请设置编辑模式下可编辑字段配置 */
  editable?: EditableConfig<Record<string, any>>
}

const commonSgConfig: InviteSettingsConfig = {
  pageInfo: commonInviteSettingsPageInfo,
  editable: true,
}

const wmDiscountConfig: InviteSettingsConfig = {
  pageInfo: wmDiscountInviteSettings,
  editable: true,
}

const InviteSettingsMap: Record<ActTypeEnum, InviteSettingsConfig> = {
  [ActTypeEnum.SHEN_HUI_YUAN]: {
    pageInfo: shyInviteSettingsPageInfo,
    editable: true,
  },
  [ActTypeEnum.SG_SHEN_QUAN]: {
    pageInfo: shenquanInviteSettingsPageInfo,
    editable: true,
  },
  [ActTypeEnum.UNION_COUPON]: {
    pageInfo: shenquanInviteSettingsPageInfo,
    editable: true,
  },
  [ActTypeEnum.SINGLE_BRAND_COUPON_UNITE]: commonSgConfig,
  [ActTypeEnum.UNITE_BRAND_COUPON_UNITE]: commonSgConfig,
  [ActTypeEnum.SINGLE_BRAND_COUPON_ENTIRE]: commonSgConfig,
  [ActTypeEnum.UNITE_BRAND_COUPON_ENTIRE]: commonSgConfig,
  [ActTypeEnum.DISCOUNT_NON_BRAND]: commonSgConfig,
  [ActTypeEnum.PRODUCT_COUPON]: commonSgConfig,
  [ActTypeEnum.GOD_PRICE]: commonSgConfig,
  [ActTypeEnum.NEW_CUSTOMER_EXPLOSIVE_PRODUCT]: commonSgConfig,
  [ActTypeEnum.EXPLOSIVE_PRODUCT_PROMOTION]: commonSgConfig,
  [ActTypeEnum.X_YUAN_PICKUP]: commonSgConfig,
  [ActTypeEnum.TEAM_BUYING]: commonSgConfig,
  [ActTypeEnum.COLLECT_STORE]: commonSgConfig,
  [ActTypeEnum.WM_DISCOUNT]: wmDiscountConfig,
  [ActTypeEnum.WAIMA_SOURCE]: commonSgConfig,
}

export const ActInviteSettings = observer(
  ({ actInfo, onClose, configs }: ActInviteSettingsProps) => {
    const {
      data,
    } = mccModel.getData()
    const config = getActConfig({ templateId: actInfo.templateId, configs })
    console.log('ActInviteSettings:', actInfo.templateId, config)
    const { pageInfo, editable } = InviteSettingsMap[config.actType] || {}
    if (!pageInfo) {
      return (
        <div className="w-full h-full items-center justify-center">
          暂无此活动邀请设置
        </div>
      )
    }

    /**
     * - 如果上下文不进行 memo，会导致刷新问题
     * - 副作用执行 action 存在时序问题
     */
    const contextMemo = useMemo(() => {
      return {
        onCancel() {
          onClose()
        },
        brandInviteTemplateUrl: data?.invite_poi_brand_excel_template_url,
        poiInviteTemplateUrl: data?.invite_poi_excel_template_url,
        async onSubmit(data) {
          const info = data as ActFullInfo

          const isNoOperation =
            info.invitation?.actionType === ActionTypeEnum.NoChange
          if (isNoOperation) {
            onClose()
            return Promise.resolve()
          }
          const res = await invitePoi({
            activityId: info.activity?.id,
            actionType: info.invitation?.actionType,
            inputData: info.invitation?.inputData,
            inputType: info?.invitation?.inputType,
            dataType: info?.invitation?.dataType,
            scene: SceneEnum.Create,
          })
          if (res.success) {
            message.success(
              res.msg ||
                '已提交，系统正在校验数据中，最终结果将以大象的形式通知'
            )
            loadActListToModel({ bizLine: getBizLine() })
            onClose()
          } else {
            message.error(res.msg || '提交失败，请稍后重试')
          }
        },
        editable: editable as any,
      }
    }, [
      editable,
      data?.invite_poi_brand_excel_template_url,
      data?.invite_poi_excel_template_url,
    ])
    return (
      <EasyPage<ShyInviteSettingFormState, ShyInviteSettingFormProps>
        commonUIConfig={{
          form: {
            labelCol: { span: 6 },
            labelAlign: 'right',
            wrapperCol: { span: 14 },
            className: 'h-full relative flex flex-col p-4',
          },
          formItem: {
            colon: false,
          },
        }}
        context={contextMemo}
        defaultValues={getInvitationDefaultValues(actInfo)}
        components={{
          ...DEFAULT_COMPONENTS,
          ...EXTRA_COMPONENTS,
          ...CUSTOM_COMPONENTS,
        }}
        pageType="form"
        {...pageInfo}
      />
    )
  }
)
export * from './utils'

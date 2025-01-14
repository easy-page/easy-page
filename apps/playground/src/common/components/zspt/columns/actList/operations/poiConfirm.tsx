import { ActInfo } from '@/common/apis'
import {
  ActSubTabResources,
  CheckSubsidyItem,
  ConfirmChargeEnum,
  FlowNodeCodeEnum,
  OperationEnum,
} from '@/common/constants'
import { Operation } from '../../../Operations'
import { getActFilterType } from '@/common/routes'
import { toPoiConfirmPage } from '@/common/routes/toUrls/old'
import { getBizLine } from '@/common/libs'
import { getShowConfig } from '../../utils'
import { getAuthConfig } from '../../utils/getAuthConfig'

/** 测试活动：60122405 */
export const actPoiConfirm: Operation<ActInfo> = {
  id: OperationEnum.PoiConfirm,
  label: '合作运营确认',
  show(context) {
    const { record } = context
    const configShow = getShowConfig((fullConfig) => {
      return fullConfig.showActPoiConfirmBtn
    })(context)

    if (!configShow) {
      return false
    }

    const hasKaConfirmNode = Boolean(
      (record.flowNode || []).find(
        (e) => e.flowNodeCode === FlowNodeCodeEnum.KaMerchantOperateConfirm
      )
    )
    const needConfirm =
      record?.actStatsInfo?.opConfig?.confirmCharge === ConfirmChargeEnum.Yes
    return hasKaConfirmNode && needConfirm
  },
  action({ record }) {
    toPoiConfirmPage(
      {
        activityId: record.id,
        bizLine: getBizLine(),
      },
      '_blank'
    )
  },
  auth: getAuthConfig((fullConfig) => {
    return fullConfig.actPoiConfirmAuths
  }),
}

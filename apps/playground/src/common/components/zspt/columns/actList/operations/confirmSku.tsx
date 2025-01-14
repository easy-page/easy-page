import { ActInfo, ButtonEnableEnum } from '@/common/apis'
import { withdrawAct } from '@/common/apis/withdrawAct'
import { authOperationFromBackend } from '@/common/auths'
import { Operation } from '../../../Operations'
import {
  ActTypeEnum,
  ActivityStatusEnum,
  AuthFromBackendResEnum,
  BizLineEnum,
  OperationEnum,
} from '@/common/constants'
import { getBizLine } from '@/common/libs'
import { loadActListToModel } from '@/common/models'
import { Modal, message } from 'antd'
import { getAuthConfig } from '../../utils/getAuthConfig'
import { getShowConfig } from '../../utils'
import { toActConfimGoods } from '@/common/routes/toUrls/toActConfimGoods'
import { getActConfig } from '@/common/configs/utils/getActConfigs'

export const confirmSku: Operation<ActInfo> = {
  id: OperationEnum.ConfirmSku,
  label: '确认商品',
  show: (context) => {
    const show = getShowConfig((fullConfig) => {
      return fullConfig.showConfirmSkuBtn
    })(context)
    if (show) {
      return (
        context.record?.buttonControl?.[0]?.buttonEnable ===
        ButtonEnableEnum.Show
      )
    }
    return false
  },

  action({ record, sence, configs }) {
    const actConfig = getActConfig({
      templateId: record.templateId,
      configs: configs,
    })
    toActConfimGoods(
      {
        promotionType: actConfig.actType,
        // promotionType: ActTypeEnum.WAIMA_SOURCE,
        activityId: `${record.id}`,
        // planId: `${record.planId}`,
        // groupId: `${record.groupId}`,
        // bizLine: record.bizLine ?? BizLineEnum.WaiMai,
      },
      '_blank'
    )
    return
  },
  // auth: getAuthConfig((fullConfig) => {
  //   return fullConfig.actWithdrawAuths
  // }),
  auth: [],
}

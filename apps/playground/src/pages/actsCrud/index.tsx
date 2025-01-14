import {
  ActTypeEnum,
  CrudActParams,
  getActivityId,
  getBizLine,
  getEnv,
  getOperationType,
  userModel,
} from '@/common'
import { useParamsInfo } from '@/common/hooks'
import { useEffect } from 'react'
import { OverWatchScenceTypeEnum } from '@/common/overwatch/constant'
import { useOverWatch } from '@/common/overwatch'
import {
  checkAuthOfCrudAct,
  CollectStoreForm,
  ShenHuiyuanForm,
  DisForm,
  //${{import}},
} from './ActsCrudInfo'
import { observer } from 'mobx-react'
import { configListModel } from '@/common/models/configList'
import { getActConfig } from '@/common/configs'
import { WdForm } from './ActsCrudInfo/actsPages/wmDiscount'
import { ShenQuanForm } from './ActsCrudInfo/actsPages/shenQuan'
import { WmsForm } from './ActsCrudInfo/actsPages/waimaSource'
import { UnionCouponForm } from './ActsCrudInfo/actsPages/unionCoupon'

export const ActsCrudPageMap: Record<ActTypeEnum, React.ReactNode> = {
  [ActTypeEnum.SHEN_HUI_YUAN]: <ShenHuiyuanForm />,
  [ActTypeEnum.SG_SHEN_QUAN]: <ShenQuanForm />, // 闪购-神券招商
  [ActTypeEnum.UNION_COUPON]: <UnionCouponForm />,
  [ActTypeEnum.SINGLE_BRAND_COUPON_UNITE]: <></>,
  [ActTypeEnum.UNITE_BRAND_COUPON_UNITE]: <></>,
  [ActTypeEnum.SINGLE_BRAND_COUPON_ENTIRE]: <></>,
  [ActTypeEnum.UNITE_BRAND_COUPON_ENTIRE]: <></>,
  [ActTypeEnum.PRODUCT_COUPON]: <></>,
  [ActTypeEnum.GOD_PRICE]: <></>,
  [ActTypeEnum.NEW_CUSTOMER_EXPLOSIVE_PRODUCT]: <></>,
  [ActTypeEnum.EXPLOSIVE_PRODUCT_PROMOTION]: <></>,
  [ActTypeEnum.X_YUAN_PICKUP]: <></>,
  [ActTypeEnum.TEAM_BUYING]: <></>,
  [ActTypeEnum.COLLECT_STORE]: <CollectStoreForm />,
  [ActTypeEnum.DISCOUNT_NON_BRAND]: <DisForm />,
  [ActTypeEnum.WM_DISCOUNT]: <WdForm />,
  [ActTypeEnum.WAIMA_SOURCE]: <WmsForm />,
}

export const ActsCrud = observer(() => {
  const { data: userInfo } = userModel.getData()
  const { data: configs } = configListModel.getList()
  const { params } = useParamsInfo<CrudActParams>()
  const { actType = ActTypeEnum.SHEN_HUI_YUAN } = params || {}
  const config = getActConfig({ actType, configs: configs })
  useOverWatch(
    {
      // 获取操作类型
      scenarioId: getOperationType(),
      // 活动提交场景
      teamId: OverWatchScenceTypeEnum.ActivitySubmit,
      // 获取活动ID
      pageId: `${getActivityId()}`,
      // 获取业务线信息
      bizType: `${getBizLine()}`,
      // 促销类型获取
      subProjectId: config?.templateInfo?.[getEnv()],
      // 活动来源
      formId: '',
    },
    userInfo
  )

  useEffect(() => {
    if (userInfo.mis) {
      checkAuthOfCrudAct(userInfo, actType, { configs })
    }
  }, [])
  return ActsCrudPageMap[actType]
})

import { ConfigListInfo } from '@/common/apis/getConfigList'
import {
  ActTypeEnum,
  ConfigEnv,
  ConfigType,
  EnvEnum,
  IsConfigTemplate,
} from '@/common/constants'
import { getBizLine, getEnv } from '@/common/libs'

// 模版索引，暂时维护在项目中
export const templatesSortIdConfig = {
  /** 单品牌券(共补) */
  [ActTypeEnum.SINGLE_BRAND_COUPON_UNITE]: 12,
  /** 品牌联合券(共补) */
  [ActTypeEnum.UNITE_BRAND_COUPON_UNITE]: 11,
  /** 单品牌券(全品补) */
  [ActTypeEnum.SINGLE_BRAND_COUPON_ENTIRE]: 10,
  /** 品牌联合券(全品补) */
  [ActTypeEnum.UNITE_BRAND_COUPON_ENTIRE]: 9,
  /** 折扣（非品牌） */
  [ActTypeEnum.DISCOUNT_NON_BRAND]: 1,
  /** 商品券 */
  [ActTypeEnum.PRODUCT_COUPON]: 6,
  /** 神价 */
  [ActTypeEnum.GOD_PRICE]: 5,
  /** 新客爆品 */
  [ActTypeEnum.NEW_CUSTOMER_EXPLOSIVE_PRODUCT]: 3,
  /** 爆品活动 */
  [ActTypeEnum.EXPLOSIVE_PRODUCT_PROMOTION]: 2,
  /** x 元自提 */
  [ActTypeEnum.X_YUAN_PICKUP]: 4,
  /** 拼团招商 */
  [ActTypeEnum.TEAM_BUYING]: 7,
  /** 集合店招商 */
  [ActTypeEnum.COLLECT_STORE]: 8,
}

const isValidTemplate = (temp: ConfigListInfo) => {
  const env = getEnv()
  if (env === EnvEnum.Test) {
    return true
  }
  if (env === EnvEnum.St) {
    return temp.env !== ConfigEnv.TEST
  }
  if (env === EnvEnum.Online) {
    return temp.env === ConfigEnv.Prod
  }
  return true
}

export const getActTemplateOptions = ({
  configs,
  userMis,
}: {
  configs: ConfigListInfo[]
  userMis: string
}) => {
  const bizLine = getBizLine()
  const env = getEnv() === EnvEnum.Test ? 'test' : 'prod'
  return configs
    .filter((x) => {
      const inWhiteList =
        (x.whiteList || []).length === 0 || x.whiteList.includes(userMis)
      const notTemplate = x.isTemplate === IsConfigTemplate.No
      const isValidTemp = isValidTemplate(x)
      return (
        notTemplate &&
        (bizLine === null || x.bizLine === bizLine) &&
        x.type === ConfigType.Act &&
        inWhiteList &&
        isValidTemp
      )
    })
    .map((item) => {
      return {
        ...item,
        sortIndex: templatesSortIdConfig[item.config?.actType] || -1,
      }
    })
    .sort((pre, after) => pre.sortIndex - after.sortIndex)
    .map((e) => ({
      label: e.config?.templateInfo?.name || e.name,
      value: e.config?.templateInfo?.[env],
    }))
}

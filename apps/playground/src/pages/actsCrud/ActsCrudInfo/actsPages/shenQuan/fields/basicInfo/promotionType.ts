import { ActivitySourceEnum, ActTypeEnum } from '@/common'
import { promotionType } from '@/pages/actsCrud/ActsCrudInfo/fields'

export const shenQuanActType = promotionType(ActTypeEnum.SG_SHEN_QUAN, {
  source: ActivitySourceEnum.Activity,
})

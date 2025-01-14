import { ActivitySourceEnum, ActTypeEnum } from '@/common'
import { promotionType } from '@/pages/actsCrud/ActsCrudInfo/fields'

export const shenhuiyuanActType = promotionType(ActTypeEnum.SHEN_HUI_YUAN, {
  source: ActivitySourceEnum.Activity,
})

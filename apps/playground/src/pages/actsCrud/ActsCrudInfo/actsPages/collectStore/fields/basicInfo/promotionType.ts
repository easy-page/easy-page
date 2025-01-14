import { ActivitySourceEnum, ActTypeEnum } from '@/common/constants'
import { promotionType } from '@/pages/actsCrud/ActsCrudInfo/fields'

export const collectStoreActType = promotionType(ActTypeEnum.COLLECT_STORE, {
  source: ActivitySourceEnum.Activity,
})

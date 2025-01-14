import { ISubActivity, PromotionKey } from '@/common'
import { RangeState } from '@/common/fields'

export const getKeyListInfo = ({
  defaultValues,
  key,
}: {
  defaultValues?: ISubActivity
  key: PromotionKey
}): RangeState | undefined => {
  const keyList = defaultValues?.contentList?.[0]?.keyList || []
  const promotion = keyList.find((x) => x.key === key)
  if (!promotion) {
    return undefined
  }
  return {
    min: promotion?.minValue !== undefined ? `${promotion?.minValue}` : '',
    max: promotion?.maxValue !== undefined ? `${promotion?.maxValue}` : '',
  }
}

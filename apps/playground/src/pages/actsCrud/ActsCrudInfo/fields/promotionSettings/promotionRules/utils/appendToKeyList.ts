import {
  IPromotionKeyList,
  ISubActivity,
  PromotionKey,
  PromotionRuleInfo,
  SubsidyOptEnum,
} from '@/common'
import { RangeState } from '@/common/fields'

/** postprocess 中使用 */
export const appendToKeyList = ({
  processedFormData,
  value,
  fieldKey,
  content,
}: {
  value?: RangeState
  fieldKey: PromotionKey
  processedFormData: Partial<ISubActivity>
  content?: IPromotionKeyList
}) => {
  const contentList = processedFormData['contentList'] || []
  const firstContentList = contentList?.[0] || ({} as PromotionRuleInfo)
  const keyList = firstContentList?.keyList || []
  if (!value && !content) {
    throw Error('value 和 content 二选一传入')
  }
  if (value && (value.max || value.min)) {
    // 填写了才传递
    keyList.push(
      content || {
        key: fieldKey,
        opt: SubsidyOptEnum.CloseInterval,
        minValue: value.min || '',
        maxValue: value.max || '',
      }
    )
  }
  if (content) {
    keyList.push(content)
  }
  firstContentList.keyList = [...keyList]
  return {
    contentList: [firstContentList],
  }
}

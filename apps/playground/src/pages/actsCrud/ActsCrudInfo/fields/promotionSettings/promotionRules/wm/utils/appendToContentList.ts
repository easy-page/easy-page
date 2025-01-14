import { RangeState } from '@/common/fields'
import { Empty, PostprocessContext } from '@easy-page/antd-ui'
import { IPromotionKeyList, ISubsidy, SubsidyInfoOfFront } from '@/common'
import { CommonActCrudFormState } from '../../../../interface'

export const appendKeyListToContentList = (
  context: PostprocessContext<RangeState, CommonActCrudFormState, Empty>,
  {
    appendValue,
  }: {
    appendValue: IPromotionKeyList
  }
) => {
  const { processedFormData } = context
  const processedContentList = processedFormData.contentList || []
  if (processedContentList.length === 0) {
    processedContentList.push({
      keyList: [],
      subsidy: {
        subsidy: {},
      },
    })
  }
  processedContentList[0].keyList.push(appendValue)
  return {
    contentList: processedContentList,
  }
}

export const appendSubsidyListToContentList = (
  context: PostprocessContext<any, CommonActCrudFormState, Empty>,
  {
    appendValue,
  }: {
    appendValue:
      | Partial<SubsidyInfoOfFront>
      | ((chargeDetailVo: SubsidyInfoOfFront) => SubsidyInfoOfFront[])
  }
) => {
  const { processedFormData } = context
  const processedContentList = processedFormData.contentList || []
  if (processedContentList.length === 0) {
    processedContentList.push({
      keyList: [],
      subsidy: {
        id: undefined,
        chargeDetailVos: [{}],
      },
    })
  }
  console.log('processedContentList[0]:', processedContentList[0])
  processedContentList[0].subsidy = processedContentList[0].subsidy || {
    id: undefined,
    chargeDetailVos: [{}],
  }
  const chargeDetailVos = processedContentList[0].subsidy.chargeDetailVos
  const chargeDetailVo = chargeDetailVos?.[0]
  processedContentList[0].subsidy.chargeDetailVos =
    typeof appendValue === 'function'
      ? appendValue(chargeDetailVo)
      : [
          {
            ...chargeDetailVo,
            ...appendValue,
          },
        ]

  console.log('processedContentList', processedContentList)
  return {
    contentList: processedContentList,
  }
}

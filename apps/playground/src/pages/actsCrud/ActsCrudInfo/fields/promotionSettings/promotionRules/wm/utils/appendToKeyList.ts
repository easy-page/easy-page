import { IPromotionKeyList } from '@/common'
import { PostprocessContext, Empty } from '@easy-page/antd-ui'
import {
  CommonActCrudFormState,
  CommonSubActPageProps,
  CommonSubActPageState,
} from '../../../../interface'

export const appendToKeyList = (
  context: PostprocessContext<
    any,
    CommonSubActPageState,
    CommonSubActPageProps
  >,
  {
    appendValue,
  }: {
    appendValue: (keyList: IPromotionKeyList[]) => IPromotionKeyList[]
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

  const newKeyList = appendValue(processedContentList[0].keyList)
  processedContentList[0].keyList = newKeyList
  return {
    contentList: processedContentList,
  }
}

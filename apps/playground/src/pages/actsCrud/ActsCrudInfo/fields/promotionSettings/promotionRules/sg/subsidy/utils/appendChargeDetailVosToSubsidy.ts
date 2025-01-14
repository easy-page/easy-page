import { ISubActivity, SubsidyInfoOfFront } from '@/common'

export const appendChargeDetailVosToSubAct = (
  data: Partial<SubsidyInfoOfFront>,
  processedData: Partial<ISubActivity>
) => {
  const contentList = processedData.contentList || []
  if (contentList.length === 0) {
    contentList.push({
      keyList: [],
      subsidy: {
        chargeDetailVos: [],
      },
    })
  }
  contentList[0].subsidy = contentList[0].subsidy || {
    chargeDetailVos: [],
  }
  const chargeDetailVos = contentList[0].subsidy.chargeDetailVos
  if (chargeDetailVos.length === 0) {
    // 新增
    chargeDetailVos.push({
      ...data,
    } as SubsidyInfoOfFront)
  } else {
    // 修改 chargeDetailVos
    const chargeDetailVo = chargeDetailVos[0]
    const newSubsidyInfos = {
      ...chargeDetailVo,
    }
    Object.keys(data).forEach((each) => {
      newSubsidyInfos[each] = {
        ...(newSubsidyInfos[each] || {}),
        ...(data[each] || {}),
      }
    })

    chargeDetailVos[0] = newSubsidyInfos
  }

  return { contentList }
}

export const appendSubsidyIdVosToSubAct = (
  id: number,
  processedData: Partial<ISubActivity>
) => {
  const contentList = processedData.contentList || []
  if (contentList.length === 0) {
    contentList.push({
      keyList: [],
      subsidy: {
        chargeDetailVos: [],
        id,
      },
    })
  }
  contentList[0].subsidy.id = id

  console.log('contentListcontentList:', contentList)
  return { contentList }
}

export const appendContentListIdVosToSubAct = (
  id: number,
  processedData: Partial<ISubActivity>
) => {
  const contentList = processedData.contentList || []
  if (contentList.length === 0) {
    contentList.push({
      keyList: [],
      id,
      subsidy: {
        chargeDetailVos: [],
      },
    })
  }
  contentList[0].id = id

  return { contentList }
}

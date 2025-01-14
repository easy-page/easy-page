import {
  ChargeSideInfo,
  ISubActivity,
  MtChargeSidePn,
  SubsidyInfoOfFront,
} from '@/common'

export const appendToChageSidePn = (
  processedData: Partial<ISubActivity>,
  mtChargeSizePn: MtChargeSidePn[]
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
  const chargeDetailVos = contentList[0].subsidy.chargeDetailVos
  if (chargeDetailVos.length === 0) {
    chargeDetailVos.push({
      meituan: {
        pns: mtChargeSizePn,
      },
    } as SubsidyInfoOfFront)
  } else {
    chargeDetailVos[0].meituan =
      chargeDetailVos[0].meituan || ({} as ChargeSideInfo)
    chargeDetailVos[0].meituan.pns = mtChargeSizePn
  }
  return {
    contentList,
  }
}

import { PoiTypeEnum, SubsidyInfoOfFront } from '@/common'

import { SubsidyPreviewInfo } from './SubsidyInfo'

// const getRedText = (text: string) => {
//   return `<font color="#FF4A47">${text}</font>`
// }

type ChargePreviewInfoProps = {
  chargeDetailVos: SubsidyInfoOfFront[]
  poiType: PoiTypeEnum
}

export const ChargePreviewInfo = (props: ChargePreviewInfoProps) => {
  const { chargeDetailVos = [], poiType } = props
  const curChargeDetailVo = chargeDetailVos?.[0]
  if (!curChargeDetailVo) {
    return <>-</>
  }

  const showDirect = [PoiTypeEnum.All, PoiTypeEnum.Direct].includes(poiType)
  const showAgent = [PoiTypeEnum.All, PoiTypeEnum.Agent].includes(poiType)

  return (
    <div>
      {showDirect && (
        <SubsidyPreviewInfo
          chargeDetailVos={chargeDetailVos}
          title="直营门店："
        />
      )}
      {showAgent && (
        <SubsidyPreviewInfo
          chargeDetailVos={chargeDetailVos}
          title="代理门店："
        />
      )}
    </div>
  )
}

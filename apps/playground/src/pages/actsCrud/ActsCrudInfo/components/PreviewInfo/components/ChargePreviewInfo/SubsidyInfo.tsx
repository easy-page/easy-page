import {
  SubsidyInfoOfFront,
  PoiTypeEnum,
  ChargeSideInfo,
  ChargeTypeEnum,
  ChargeTypeEnumDesc,
  ChargeSideOperatingDesc,
} from '@/common'

type ChargePreviewInfoProps = {
  chargeDetailVos: SubsidyInfoOfFront[]
  title: string
}

const RedText: React.FC<any> = ({ children }: { children: any }) => (
  <span
    style={{
      color: '#FF4A47',
    }}
  >
    {children}
  </span>
)

export const SubsidyPreviewInfo = (props: ChargePreviewInfoProps) => {
  const { chargeDetailVos = [], title } = props
  const curChargeDetailVo = chargeDetailVos?.[0]
  if (!curChargeDetailVo) {
    return <>-</>
  }
  console.log('chargeDetailVoschargeDetailVos:', chargeDetailVos)

  // 补贴方式
  const chargeType = curChargeDetailVo.chargeType
  const isByPercent = chargeType === ChargeTypeEnum.Percentage
  const isByAmount = chargeType === ChargeTypeEnum.Amount

  const meituanCharge = curChargeDetailVo.meituan
  console.log('meituanChargemeituanCharge:', meituanCharge)
  const mtPns = meituanCharge?.pns || []

  const otherChargeSideInfos: ChargeSideInfo[] = []
  if (curChargeDetailVo.merchant) {
    otherChargeSideInfos.push(curChargeDetailVo.merchant)
  }
  if (curChargeDetailVo.agent) {
    otherChargeSideInfos.push(curChargeDetailVo.agent)
  }

  return (
    <div>
      {title}
      <RedText>{ChargeTypeEnumDesc[chargeType]}</RedText>
      补贴。
      {meituanCharge && (
        <span>
          美团补贴
          <RedText>
            {meituanCharge.chargeAmt}
            {chargeType === ChargeTypeEnum.Amount ? '元' : '%'}
          </RedText>
          {chargeType === ChargeTypeEnum.Percentage ? (
            <>
              ，最高不超过
              <RedText>
                {meituanCharge.maxAmount ? meituanCharge.maxAmount : 0}元
              </RedText>
            </>
          ) : (
            <></>
          )}
          ；
        </span>
      )}
      {otherChargeSideInfos.map((each, index) => (
        <span key={`direct${index}`}>
          {ChargeSideOperatingDesc[each.chargeSideCode]}
          <RedText>
            {each.chargeAmt}
            {isByAmount ? '元' : '%'}
          </RedText>
          {each.maxAmount !== undefined && isByPercent && (
            <span>
              ，最高不超过<RedText>{each.maxAmount || 0}元</RedText>
            </span>
          )}
          {index === otherChargeSideInfos.length - 1 ? '。' : '；'}
        </span>
      ))}
      {mtPns.length > 0 && (
        <div>
          <div style={{ marginTop: 4 }}>美补承担组织:</div>
          {mtPns.map((each, index) => (
            <div key={`direct${index}`}>
              <RedText>{each.pnName}</RedText>，承担
              <RedText>
                {each.chargeAmt}
                {isByAmount ? '元' : '%'}
              </RedText>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

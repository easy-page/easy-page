import React, { FC } from 'react'
import { IPromotionKeyList, PromotionKey } from '@/common'

export interface WmDisChargePreviewInfoProps {
  keyList: IPromotionKeyList[]
  promotionKey: PromotionKey
}

export const WmDisChargePreviewInfo: FC<WmDisChargePreviewInfoProps> = ({
  keyList,
  promotionKey,
}) => {
  const keyItem = keyList?.find((item) => item.key === promotionKey)
  return (
    <>
      {promotionKey !== PromotionKey.AgentSubsidyMax ? (
        <>
          {keyItem?.minValue ? (
            <>
              <span className="text-[#FF0000]">{keyItem?.minValue}</span>
              %-
              <span className="text-[#FF0000]">{keyItem?.maxValue}</span>%
            </>
          ) : (
            '-'
          )}
        </>
      ) : (
        <>
          {keyItem?.minValue ? (
            <>
              <span className="text-[#FF0000]">{keyItem?.minValue}</span>元
            </>
          ) : (
            '-'
          )}
        </>
      )}
    </>
  )
}

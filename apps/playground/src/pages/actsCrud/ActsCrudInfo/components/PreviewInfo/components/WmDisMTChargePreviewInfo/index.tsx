import React, { FC } from 'react'
import { ChargeSideInfo } from '@/common'

export interface MeiTuanPreviewChargeProps {
  type: 'chargeAmt' | 'maxAmount'
  mt: ChargeSideInfo
}

export const MeiTuanPreviewCharge: FC<MeiTuanPreviewChargeProps> = ({
  mt,
  type,
}) => {
  return (
    <>
      {mt?.[type] ? (
        <>
          <span className="text-[#FF0000]">{mt?.[type]}</span>
          {type === 'chargeAmt' ? '%' : '元'}
        </>
      ) : (
        '-'
      )}
    </>
  )
}

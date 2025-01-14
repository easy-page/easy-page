import { ActFullInfo, FactorInfo } from '@/common/apis'
import React from 'react'

export type PreviewColumnInfo = {
  properties?: string | React.ReactNode
  content: (
    data: ActFullInfo,
    options: {
      factors: FactorInfo
    }
  ) => React.ReactNode
}

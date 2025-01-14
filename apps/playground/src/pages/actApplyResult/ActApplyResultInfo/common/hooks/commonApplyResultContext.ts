import { createContext } from 'react'
import { CommonApplyResultTabTypeEnum } from '../constants'

export const CommonApplyResultContext = createContext<{
  tabRef: { current: { setTab: (tab: string) => void; presentTab: string } }
  // setTab: (tab: string) => void
  // presentTab: CommonApplyResultTabTypeEnum
}>(undefined)

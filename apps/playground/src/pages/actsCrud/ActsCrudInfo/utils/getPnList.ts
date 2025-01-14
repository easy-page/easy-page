import { flatten, get, uniqBy } from 'lodash'
import { CommonSubActPageState } from '../fields'
import { PnInfo } from '@/common'

/** 全量 */
export const getFullChoosedPnOptions = (
  subActOriFormdata: Partial<CommonSubActPageState>[],
  {
    pns = [],
  }: {
    pns: PnInfo[]
  }
) => {
  const pnList = flatten(
    subActOriFormdata.map((each) => {
      const pnFormsInfo = get(each, 'pns.chargeSidePnform')
      const pnFormUtils = pnFormsInfo?.formUtils || {}
      return Object.values(pnFormUtils)
        .map((e) => e.getOriginFormData())
        .filter((x) => Boolean(x))
    })
  )
  console.log('pnListpnList:', pnList)
  return (pnList || [])
    .map((each) => {
      const choosedPn = pns.find((e) => e.pn === each.pn?.choosed)
      if (!choosedPn) {
        return undefined
      }
      return {
        value: choosedPn?.pn as string,
        label: choosedPn?.pnName as string,
        balance: choosedPn?.balance,
        // budget: each
      }
    })
    .filter((x) => Boolean(x))
}

/** 基于子表单中的 pn ，生成选项, 去重 */
export const getPnListOptions = (
  subActOriFormdata: Partial<CommonSubActPageState>[],
  {
    pns = [],
  }: {
    pns: PnInfo[]
  }
) => {
  return uniqBy(getFullChoosedPnOptions(subActOriFormdata, { pns }), 'value')
}

import { PnInfo } from '@/common'
import { lowerCase } from 'lodash'

/** 最多只能有 5 个不一样的承担组织 */
const MAX_UNIQ_PNS_COUNT = 5

const getChoosedCount = (
  allSubActChoosedPns: string[],
  curChoosedPn: string
) => {
  let count = 0
  allSubActChoosedPns.forEach((x) => {
    if (x === curChoosedPn) {
      count = count + 1
    }
  })
  return count
}

const matchKeyword = (pnName: string, keyword: string) => {
  return lowerCase(pnName).includes(lowerCase(keyword))
}

export const getCanChoosePnOptions = ({
  fullPnList: oriFullPnList,
  curSubActChoosedPns,
  allSubActChoosedPns,
  allSubActChoosedUniqPns,
  curChoosedPn,
  keyword,
}: {
  fullPnList: PnInfo[]
  curSubActChoosedPns: string[]
  allSubActChoosedPns: string[]
  allSubActChoosedUniqPns: string[]
  /** 当前 pn 选项已经选择的值 */
  curChoosedPn?: string
  keyword?: string
}) => {
  /** 如果有关键词，则基于关键词过滤 */
  const fullPnList = keyword
    ? oriFullPnList.filter((x) => matchKeyword(x.pnName, keyword))
    : oriFullPnList
  console.log('1212213123: fullPnList', keyword, oriFullPnList)
  // 如果当前去重的 pn 之和 < 5
  if (allSubActChoosedUniqPns.length < MAX_UNIQ_PNS_COUNT) {
    // 当前下拉框可选选项为：排除当前子活动已经选择的选项
    const pns = fullPnList.map((e) => ({
      label: e.pnName,
      value: e.pn,
      balance: e.balance,
      disabled:
        e.balance <= 0 ||
        (e.pn !== curChoosedPn && (curSubActChoosedPns || []).includes(e.pn)),
    }))
    return pns
  } else {
    const curPnChoosedCount = curChoosedPn
      ? getChoosedCount(allSubActChoosedPns, curChoosedPn)
      : 0
    // 如果当前选择的选项，在所有子活动选项中，选择次数超过 1 次或者当前还没有选择 pn，则选项，则只能从：allSubActChoosedUniqPns 里选择，其余禁用
    if (!curChoosedPn || curPnChoosedCount > 1) {
      const pns = fullPnList.map((e) => ({
        label: e.pnName,
        value: e.pn,
        balance: e.balance,
        disabled:
          e.balance <= 0 ||
          (e.pn !== curChoosedPn &&
            ((curSubActChoosedPns || []).includes(e.pn) ||
              !(allSubActChoosedUniqPns || []).includes(e.pn))),
      }))
      return pns
    } else {
      // 当前选择的选项，在所有子活动中选择了 1 次，则他可以选择任意其他非当前子活动选择过的选项
      const pns = fullPnList.map((e) => ({
        label: e.pnName,
        value: e.pn,
        balance: e.balance,
        disabled:
          e.balance <= 0 ||
          (e.pn !== curChoosedPn && (curSubActChoosedPns || []).includes(e.pn)),
      }))
      return pns
    }
  }
}

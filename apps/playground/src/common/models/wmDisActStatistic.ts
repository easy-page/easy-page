import { Empty } from '@easy-page/antd-ui'
import {
  StatisticInfo,
  getSkuApplyStatistics,
} from '@/common/apis'
import { ListModel } from './base/list'

export const wmActStatisticModel = new ListModel<StatisticInfo, Empty>({
  defaultFilters: {},
  disablePage: true,
})

export const loadWmDiscountActStatisticToModel = (actId: number, staticType: number) => {
  return wmActStatisticModel.loadList(
    async () => {
      const res = await getSkuApplyStatistics({
        actId: actId,
        // statisticsType: staticType,
      })
      return {
        data: res?.data,
        total: res?.data?.length,
        error: !res.success,
        msg: res.msg,
      }
    },
    {
      refresh: true,
    }
  )
}

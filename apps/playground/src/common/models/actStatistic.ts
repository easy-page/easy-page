import { StatisticInfo, getPoiApplyStatistics } from '@/common/apis'
import { ListModel } from './base/list'
import { Empty } from '@easy-page/antd-ui'

export const actStatisticModel = new ListModel<StatisticInfo, Empty>({
  defaultFilters: {},
  disablePage: true,
})

export const loadActStatisticToModel = (actId: number, staticType: number) => {
  return actStatisticModel.loadList(
    async () => {
      const res = await getPoiApplyStatistics({
        activityId: actId,
        statisticsType: staticType,
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

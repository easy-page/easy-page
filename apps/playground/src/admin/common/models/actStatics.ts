import { ListModel, ListModelOptions } from '@/common/models/base/list'
import { getActApplyStatistics } from '../apis/getActApplyStatistics'
import { BaseModelOptions } from '@/common/models/base/base'
import { ActInfoItem, getActs, GetActsParams } from '../apis/getActivities'
import { BizLineEnum, EnvEnum, getEnv, toNumber } from '@/common'
import { ConfigListInfo, convertBizline } from '@/common/apis/getConfigList'
import { getZsptActConfig } from '@/admin/pages/zsptData/utils/getZsptActConfig'
import dayjs from 'dayjs'
import { flattenDeep } from 'lodash'

export type ActStaticInfo = {
  templateId: number
  templateName: string
  /** 已经报名的门店数 */
  applyCount: number
  /** 已经邀请的门店数 */
  invitePoiCount: number
  /** 已报名商品数 */
  applyGoodCount: number

  /** 报名率 */
  applyRate: number

  /** 当前统计活动数量 */
  actCounts: number

  /** 业务线 */
  bizLine: BizLineEnum
}

// 同一种类型查询活动数据，最多查询 20 个

export type ActStaticFilters = GetActsParams & {
  maxActCount: number
  maxReq: number
}

class ActStaticInfoModel extends ListModel<ActStaticInfo, ActStaticFilters> {
  constructor(
    options: ListModelOptions<ActStaticFilters> & BaseModelOptions<{}>
  ) {
    super(options)
  }

  loadInfo(configs: ConfigListInfo[]) {
    return this.loadList(async (filters) => {
      const actsRes = await getActs(filters)
      const actsMap: Record<number, ActInfoItem[]> = {}

      ;(actsRes?.data || []).forEach((x) => {
        actsMap[x.templateId] = actsMap[x.templateId] || []
        actsMap[x.templateId].push(x)
      })
      const templateIds: number[] = Object.keys(actsMap).map((e) => toNumber(e))

      const results: ActStaticInfo[] = flattenDeep(
        await Promise.all(
          templateIds.map(async (template) => {
            const config = getZsptActConfig({
              templateId: template,
              configs: configs,
            })
            const actIds = (actsMap[template] || [])
              .slice(0, filters.maxActCount)
              .map((e) => e.id)
            const res = await getActApplyStatistics({
              actIdList: actIds,
              bizLine: config.bizLine,
            })
            if (res.success && res.data) {
              const inviteCount =
                res.data.find((x) => x.label === '已邀请门店数')?.value || 0
              const applyCount =
                res.data.find((x) => x.label === '已报名门店数')?.value || 0
              const applyGoodCount =
                res.data.find((x) => x.label === '已报名商品数')?.value || 0
              const staticRes: ActStaticInfo = {
                templateId: template,
                templateName: config.name,
                applyCount: applyCount,
                invitePoiCount: inviteCount,
                actCounts: actIds.length,
                applyGoodCount: applyGoodCount,
                bizLine: convertBizline(config.bizLine as any),
                applyRate: inviteCount
                  ? toNumber((applyCount / inviteCount).toFixed(2)) || 0
                  : 1,
              }
              return staticRes
            }
          })
        )
      )

      return {
        loading: false,
        data: results,
        total: results.length,
        success: true,
      }
    })
  }
}

export const actStaticInfoModel = new ActStaticInfoModel({
  defaultFilters: {
    // templateIds: [1622, 1189, 853, 1186],
    //
    templateIds:
      getEnv() === EnvEnum.Test
        ? [1622, 1189, 853, 1186]
        : [130, 349, 236, 1, 2],
    startTime: dayjs().subtract(1, 'week').startOf('day').valueOf(),
    endTime: dayjs().endOf('day').valueOf(),
    maxActCount: 5,
    maxReq: 5,
  },
  disablePage: true,
})

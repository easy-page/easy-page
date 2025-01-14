import {
  ActListColumnId,
  ActListScene,
  ActSubTabResources,
  BizLineEnum,
  OPERATION_COL_KEY,
} from '../constants'

export type ColumnHander = (options: {
  /** 展示更多和默认的场景 */
  showMore: boolean
  /** 当前子 Tab */
  actSubTab: ActSubTabResources
}) => ActListColumnId[]

export type ActColumnsConfig = Record<ActListScene, ColumnHander>

export const ActColumnsInfo: Record<BizLineEnum, ActColumnsConfig> = {
  [BizLineEnum.WaiMai]: {
    [ActListScene.Home]: ({ showMore }) => {
      const excludeIds: ActListColumnId[] = [
        ActListColumnId.ActStatsInfo,
        ActListColumnId.ConfirmStatus,
      ]
      if (!showMore) {
        excludeIds.push(ActListColumnId.PlanIdAndNameAndCreator)
      }
      return getActColumns({
        excludes: excludeIds,
      })
    },
    [ActListScene.CrudPlan]: () =>
      getActColumns({
        excludes: [ActListColumnId.ActStatsInfo, ActListColumnId.ConfirmStatus],
      }),
    [ActListScene.JoinPlan]: () =>
      getActColumns({
        excludes: [ActListColumnId.ActStatsInfo, ActListColumnId.ConfirmStatus],
      }),
  },
  [BizLineEnum.ShanGou]: {
    [ActListScene.Home]: ({ showMore, actSubTab }) => {
      const excludeIds: ActListColumnId[] = [ActListColumnId.ServiceTypeDesc]
      if (!showMore) {
        excludeIds.push(ActListColumnId.PlanIdAndNameAndCreator)
      }
      if (actSubTab !== ActSubTabResources.Confirm) {
        excludeIds.push(ActListColumnId.ConfirmStatus)
      }
      return getActColumns({
        excludes: excludeIds,
      })
    },
    [ActListScene.CrudPlan]: () =>
      getActColumns({
        excludes: [ActListColumnId.ServiceTypeDesc],
      }),
    [ActListScene.JoinPlan]: () =>
      getActColumns({
        excludes: [ActListColumnId.ServiceTypeDesc],
      }),
  },
  [BizLineEnum.WaimaSongJiu]: {
    [ActListScene.Home]: ({ actSubTab }) => {
      const excludeIds: ActListColumnId[] = [
        ActListColumnId.ServiceTypeDesc,
        ActListColumnId.PlanIdAndNameAndCreator,
        ActListColumnId.ActStatsInfo,
      ]

      if (actSubTab !== ActSubTabResources.Confirm) {
        excludeIds.push(ActListColumnId.ConfirmStatus)
      }
      return getActColumns({
        excludes: excludeIds,
      })
    },
    [ActListScene.CrudPlan]: () =>
      getActColumns({
        excludes: [ActListColumnId.ServiceTypeDesc],
      }),
    [ActListScene.JoinPlan]: () =>
      getActColumns({
        excludes: [ActListColumnId.ServiceTypeDesc],
      }),
  },
}

export const getActColumns = ({
  excludes,
}: {
  excludes: ActListColumnId[]
}): ActListColumnId[] => {
  return [...Object.values(ActListColumnId), OPERATION_COL_KEY].filter(
    (e) => !excludes.includes(e as ActListColumnId)
  ) as ActListColumnId[]
}

import { observer } from 'mobx-react'
import { filterContainer } from '../common/filterContainer'
import { CommonListFilter } from '../common'
import { actCreateTime } from './actCreateTime'
import { actId } from './actId'
import { actName } from './actName'
import { actStatus } from './actStatus'
import { actTime } from './actTime'
import { creator } from './creator'
import { planCreatorOfAct } from './planCreatorOfAct'
import { planIdOfAct } from './planIdOfAct'
import { planNameOfAct } from './planNameOfAct'
import { actListModel, loadActListToModel, userModel } from '@/common/models'

import { useParamsInfo } from '@/common/hooks'
import { getActFilterType, PlanAndActListParams } from '@/common/routes'
import { actTemplateId } from './actTemplateId'
import { useMemo } from 'react'
import {
  ACTIVITY_STATUS_OPTIONS,
  ALL,
  ActivityStatusEnum,
  OPTION_ALL,
  BizLineEnum,
  ActSubTabResources,
  ACTIVITY_CONFIRM_STATUS_OPTIONS,
  ActivityConfirmStatusEnum,
} from '@/common/constants'
import { kaConfirmTime } from './kaConfirmTime'
import { activityConfirmStatus } from './activityConfirmStatus'
import { getQueryNumber, getQueryString, toNumber } from '@/common/libs'
import { ConfigListInfo } from '@/common/apis/getConfigList'
import { getActTemplateOptions } from '@/common/configs/utils/getActTemplateOptions'
import { configListModel } from '@/common/models/configList'
import { inviteBrandIds } from './inviteBrandIds'
import { inviteBrandName } from './inviteBrandName'

/**
 * - 方案列表的过滤条件
 * - 每个列表的过滤条件不一样，难以通过 dom 判断个数，因此最佳方案是自己计算一下
 * - 下面是将：curFilterCount 挂在到当前节点上
 *  */
const actFilterContainer = (
  bizLine: BizLineEnum,
  defaultFilterCount: number,
  {
    configs,
    userMis,
  }: {
    configs: ConfigListInfo[]
    userMis: string
  }
) =>
  filterContainer({
    id: 'act-filter-container',
    defaultValues: {
      ctime: [undefined, undefined],
      sendTime: [undefined, undefined],
      activityStatus: {
        choosed: ALL as ActivityStatusEnum,
        options: ACTIVITY_STATUS_OPTIONS,
      },
      activityConfirmStatus: {
        choosed: ALL as ActivityConfirmStatusEnum,
        options: ACTIVITY_CONFIRM_STATUS_OPTIONS,
      },
      templateId: {
        choosed: ALL,
        options: [OPTION_ALL, ...getActTemplateOptions({ configs, userMis })],
      },
      activityTime: [undefined, undefined],
      kaConfirmTime: [undefined, undefined],
      creator: [],
      planCreator: [],
      activityId: getQueryString('activityId') || '',
      planId: '',
      planName: '',
      activityName: '',
    },
    onClickReset: () => {
      actListModel.resetFilters({
        excludeKeys: ['filterType'],
      })

      loadActListToModel({ bizLine })
    },
    onClickSearch(filters) {
      const oriFilters = actListModel.filters
      // 当点击搜索的时候，将搜索条件存入：model
      actListModel.replaceFilters({
        filterType: oriFilters.filterType,
        activityConfirmStatus: oriFilters.activityConfirmStatus,
        kaConfirmTime: oriFilters.kaConfirmTime,
        ...filters,
      })

      const { pageSize, pageNo } = actListModel.pageInfo
      if (pageNo !== 1) {
        actListModel.changePage({ pageNo: 1, pageSize })
        return
      }

      loadActListToModel({ bizLine })
    },
    lineFilterCount: 4,
    defaultFilterCount: defaultFilterCount,
  })

const getConfirmActFilters = (bizline: BizLineEnum) => {
  if (bizline === BizLineEnum.WaimaSongJiu) {
    return [
      actId,
      actName,
      actTemplateId,
      actStatus,
      creator,
      actTime,
      activityConfirmStatus,
      actCreateTime,
    ]
  }

  return [
    actId,
    actName,
    actTemplateId,
    actStatus,
    // inviteBrandIds,
    // inviteBrandName,
    creator,
    actTime,
    kaConfirmTime,
    activityConfirmStatus,
    actCreateTime,
    planIdOfAct,
    planNameOfAct,
    planCreatorOfAct,
  ]
}

const getMineActFilters = (bizline: BizLineEnum) => {
  if (bizline === BizLineEnum.WaimaSongJiu) {
    return [actId, actName, actTemplateId, actStatus, actTime, actCreateTime]
  }

  return [
    actId,
    actName,
    actTemplateId,
    actStatus,
    // inviteBrandIds,
    // inviteBrandName,
    actTime,
    actCreateTime,
    planIdOfAct,
    planNameOfAct,
    planCreatorOfAct,
  ]
}

const getAllActFilters = (bizline: BizLineEnum) => {
  if (bizline === BizLineEnum.WaimaSongJiu) {
    return [
      actId,
      actName,
      actTemplateId,
      actStatus,
      creator,
      actTime,
      actCreateTime,
    ]
  }

  return [
    actId,
    actName,
    actTemplateId,
    actStatus,
    // inviteBrandIds,
    // inviteBrandName,
    creator,
    actTime,
    actCreateTime,
    planIdOfAct,
    planNameOfAct,
    planCreatorOfAct,
  ]
}

const getFiltersAndActFilterTypeMap = (
  bizline
): Record<ActSubTabResources, any[]> => {
  return {
    [ActSubTabResources.All]: getAllActFilters(bizline),
    [ActSubTabResources.Mine]: getMineActFilters(bizline),
    [ActSubTabResources.Confirm]: getConfirmActFilters(bizline),
  }
}

/** 默认展示几个条件 */
const DefaultFilterCountMap: Record<ActSubTabResources, number> = {
  [ActSubTabResources.All]: 7,
  [ActSubTabResources.Mine]: 7,
  [ActSubTabResources.Confirm]: 7,
}

const getParamsActFilterType = () => {
  return getActFilterType() || getQueryNumber('filterType')
}

export const ActFilter = observer(() => {
  const { filterType, ...rest } = actListModel.getFilters()
  const { params } = useParamsInfo<PlanAndActListParams>()
  const { data: configs } = configListModel.getList()
  const { data: userInfo } = userModel.getData()
  const nodes = useMemo(() => {
    const actFilterType = (getParamsActFilterType() ||
      ActSubTabResources.Mine) as ActSubTabResources
    const filterNodes = getFiltersAndActFilterTypeMap(toNumber(params.bizLine))[
      actFilterType
    ]
    return [
      actFilterContainer(
        toNumber(params.bizLine) as any as BizLineEnum,
        DefaultFilterCountMap[actFilterType],
        {
          configs,
          userMis: userInfo.mis,
        }
      ).appendChildren(filterNodes),
    ]
  }, [params.bizLine, params.actFilterType, params.filterType])

  return (
    <CommonListFilter
      filterId="act-filter"
      defaultValues={{
        filterType,
        ...rest,
      }}
      onChange={({ formUtil }) => {
        const values = formUtil?.getFormData?.()
        actListModel.setFilters({
          filterType,
          ...values,
        })
      }}
      nodes={nodes}
    />
  )
})

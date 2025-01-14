import { observer } from 'mobx-react'
import {
  ActAppltResultFilter,
  CommonActApplyList,
  PoiActApplyListProps,
} from '../components'
import { loadPoiApplyListToModel, poiApplyListModel } from '@/common/models'
import { useEffect } from 'react'
import {
  ActApplyResultParams,
  BizLineEnum,
  BrandApplyListItem,
  PoiApplyListItem,
} from '@/common'
import { useParamsInfo } from '@/common/hooks'
import { loadActStatusOptionsToModel } from '@/common/models'
import { loadCitiesOptionsToModel } from '@/common/models'
import { SearchRuleId, BatchAction } from '../constants'
import { NodeInfoWithChildren } from '@easy-page/antd-ui'

export type ApplyResultConfig = {
  filters: NodeInfoWithChildren<any, any, any>[]
  operations: BatchAction[]
  filterCount?: number
}

/** 门店类活动 */
export type PoiActApplyDetailContainerProps<T> = {
  activityId: number
  batchDismiss?: React.ReactNode
  disableSelect?: boolean
  operationTips: React.ReactNode
  applyResultConfig: ApplyResultConfig
  poiActApplyListProps: Omit<
    PoiActApplyListProps<PoiApplyListItem>,
    'operations'
  >
}

export const PoiActApplyDetailContainer = observer(function <T>({
  activityId,
  batchDismiss,
  operationTips,
  applyResultConfig,
  disableSelect,
  poiActApplyListProps,
}: PoiActApplyDetailContainerProps<T>) {
  const { pageNo, pageSize, data: poiList } = poiApplyListModel.getList()
  const { params } = useParamsInfo<ActApplyResultParams>()
  const { filters, operations, filterCount } = applyResultConfig || {}

  useEffect(() => {
    loadPoiApplyListToModel({
      activityId,
      bizLine: params.bizLine ?? BizLineEnum.WaiMai,
    })
  }, [pageNo, pageSize])

  useEffect(() => {
    const poiListIds = (poiList || []).map((e) => Number(e.poiId))
    // loadActStatusOptionsToModel();
    loadCitiesOptionsToModel({
      activityId,
      poiIds: poiListIds,
    })
  }, [poiList])

  return (
    <div className="flex flex-col">
      <ActAppltResultFilter<PoiApplyListItem>
        filters={filters}
        activityId={activityId}
        listModel={poiActApplyListProps.listModel}
        loadListData={loadPoiApplyListToModel}
        filterCount={filterCount}
      />
      <div className="mt-4">
        <CommonActApplyList<PoiApplyListItem>
          batchDismiss={batchDismiss}
          operations={operations}
          disableSelect={disableSelect}
          operationTips={operationTips}
          {...poiActApplyListProps}
        />
      </div>
    </div>
  )
})

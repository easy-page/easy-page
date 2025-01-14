import { observer } from 'mobx-react'
import { useEffect } from 'react'
import {
  ActApplyResultParams,
  BizLineEnum,
  BrandApplyListItem,
  SkuApplyListItem,
} from '@/common'
import { useParamsInfo } from '@/common/hooks'
import {
  loadActStatusOptionsToModel,
  statusOptionsModel,
} from '@/common/models'
import { loadCitiesOptionsToModel } from '@/common/models'
// import { SearchRuleId, BatchAction } from '../constants'
import { NodeInfoWithChildren } from '@easy-page/antd-ui'
import { BatchAction } from '../../constants'
import {
  skuApplyListModel,
  loadSkuApplyListToModel,
} from '@/common/models/wmDiscount'
import { ActAppltResultFilter, CommonActApplyList } from '../../components'
import {
  CommonSkuActApplyList,
  SkuActApplyListProps,
} from '../../components/CommonSkuActApplyList'

export type ApplyResultConfig = {
  filters: NodeInfoWithChildren<any, any, any>[]
  operations: BatchAction[]
  filterCount?: number
}

/** 门店类活动 */
export type SkuActApplyDetailContainerProps<T> = {
  activityId: number
  batchDismiss?: React.ReactNode
  disableSelect?: boolean
  operationTips: React.ReactNode
  applyResultConfig: ApplyResultConfig
  skuActApplyListProps: Omit<
    SkuActApplyListProps<SkuApplyListItem>,
    'operations'
  >
}

export const WmDisCountActApplyDetailContainer = observer(function <T>({
  activityId,
  batchDismiss,
  operationTips,
  applyResultConfig,
  disableSelect,
  skuActApplyListProps,
}: SkuActApplyDetailContainerProps<T>) {
  const { pageNo, pageSize, data: poiList } = skuApplyListModel.getList()
  const { params } = useParamsInfo<ActApplyResultParams>()
  const { filters, operations,filterCount } = applyResultConfig || {}

  useEffect(() => {
    loadSkuApplyListToModel({
      activityId,
      bizLine: params.bizLine ?? BizLineEnum.WaiMai,
    })
  }, [pageNo, pageSize])

  useEffect(() => {
    const poiListIds = (poiList || []).map((e) => Number(e.poiId))

    loadCitiesOptionsToModel({
      activityId,
      poiIds: poiListIds,
    })
  }, [poiList])

  useEffect(() => {
    loadActStatusOptionsToModel()
  }, [])
  const { data: statusOptions } = statusOptionsModel.getList()

  return (
    <div className="flex flex-col">
      <ActAppltResultFilter<SkuApplyListItem>
        filters={filters}
        activityId={activityId}
        statusOptions={statusOptions}
        listModel={skuActApplyListProps.listModel}
        loadListData={loadSkuApplyListToModel}
        filterCount={filterCount}
      />
      <div className="mt-4">
        <CommonSkuActApplyList<SkuApplyListItem>
          batchDismiss={batchDismiss}
          operations={operations}
          disableSelect={disableSelect}
          operationTips={operationTips}
          {...skuActApplyListProps}
        />
      </div>
    </div>
  )
})

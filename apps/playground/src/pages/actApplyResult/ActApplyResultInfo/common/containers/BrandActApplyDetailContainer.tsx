import { observer } from 'mobx-react'
import {
  ActAppltResultFilter,
  CommonActApplyList,
  PoiActApplyListProps,
} from '../components'
import { useEffect } from 'react'
import { ActApplyResultParams, BizLineEnum, BrandApplyListItem } from '@/common'
import { useParamsInfo } from '@/common/hooks'
import { SearchRuleId, BatchAction } from '../constants'
import { NodeInfoWithChildren } from '@easy-page/antd-ui'
import {
  brandApplyListModel,
  loadBrandApplyListToModel,
} from '@/common/models/brandApplyList'

export type ApplyResultConfig = {
  filters: NodeInfoWithChildren<any, any, any>[]
  operations: BatchAction[]
}

/** 门店类活动 */
export type BrandActApplyDetailContainerProps<T> = {
  activityId: number
  batchDismiss?: React.ReactNode
  disableSelect?: boolean
  operationTips: React.ReactNode
  applyResultConfig: ApplyResultConfig
  poiActApplyListProps: Omit<
    PoiActApplyListProps<BrandApplyListItem>,
    'operations'
  >
}

export const BrandActApplyDetailContainer = observer(function <T>({
  activityId,
  batchDismiss,
  operationTips,
  applyResultConfig,
  disableSelect,
  poiActApplyListProps,
}: BrandActApplyDetailContainerProps<T>) {
  const { pageNo, pageSize, data: poiList } = brandApplyListModel.getList()
  const { params } = useParamsInfo<ActApplyResultParams>()
  const { filters, operations } = applyResultConfig || {}

  useEffect(() => {
    loadBrandApplyListToModel({
      activityId,
      bizLine: params.bizLine ?? BizLineEnum.WaiMai,
    })
  }, [activityId, pageNo, pageSize, params.bizLine])

  return (
    <div className="flex flex-col">
      <ActAppltResultFilter<BrandApplyListItem>
        filters={filters}
        activityId={activityId}
        listModel={poiActApplyListProps.listModel}
        loadListData={loadBrandApplyListToModel}
      />
      <div className="mt-4">
        <CommonActApplyList<BrandApplyListItem>
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

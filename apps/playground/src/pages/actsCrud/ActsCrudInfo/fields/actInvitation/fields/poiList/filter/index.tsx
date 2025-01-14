import { ZsptButton, downloadPoiList } from '@/common'
import { CommonListFilter, filterContainer } from '@/common/fields'
import { loadPoiListToModel, poiListModel } from '@/common/models'
import { poiBrandId, poiId } from './fields'
import { DownloadOutlined } from '@ant-design/icons'
import { Button, message } from 'antd'
import { observer } from 'mobx-react'
import { useMemo } from 'react'

const poiListFilterContainer = ({ actId }: { actId: number }) =>
  filterContainer({
    id: 'poi-list-filter-container',
    defaultValues: {
      poiBrandId: '',
      poiId: '',
    },
    onClickSearch(filters) {
      // 当点击搜索的时候，将搜索条件存入：model
      poiListModel.replaceFilters({ ...filters })
      // 使用方案列表 model 进行搜索
      loadPoiListToModel(actId)
    },
    buttonGroupRightNode: (
      <ZsptButton
        className="ml-2"
        icon={<DownloadOutlined />}
        onClick={async () => {
          const res = await downloadPoiList({ activityId: actId })
          if (res.success) {
            message.success(res.msg || '下载成功，结果将会通过大象通知')
          } else {
            message.error(res.msg || '下载失败')
          }
        }}
      >
        下载
      </ZsptButton>
    ),
    // 每行默认展示 4 个条件
    lineFilterCount: 3,
    disabledRest: true,
  })

export const PoiListFilter = observer(({ actId }: { actId: number }) => {
  const filters = poiListModel.getFilters()
  const nodes = useMemo(() => {
    return [
      poiListFilterContainer({ actId }).appendChildren([poiId, poiBrandId]),
    ]
  }, [actId])
  return (
    <CommonListFilter
      filterId="act-apply-result-filter"
      defaultValues={filters}
      onChange={({ formUtil }) => {
        const values = formUtil?.getFormData?.()
        poiListModel.setFilters({
          ...values,
        })
      }}
      nodes={nodes}
    />
  )
})

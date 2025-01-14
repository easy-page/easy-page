import { actStaticInfoModel } from '@/admin/common/models/actStatics'
import React, { useEffect } from 'react'
import { ActStatisticsFilter } from './ZsptAnalysisFilters'
import { ActStatisticsTable } from './ZsptAnalysisTable'
import { observer } from 'mobx-react'
import {
  fullConfigsModel,
  loadFullConfigs,
} from '@/admin/common/models/fullConfigs'

export const ActStatisticsPage: React.FC = observer(() => {
  const { data, loading } = actStaticInfoModel.getList()
  const { data: configs } = fullConfigsModel.getList()

  useEffect(() => {
    const initData = async () => {
      if (configs.length > 0) {
        actStaticInfoModel.loadInfo(configs)
      } else {
        const res = await loadFullConfigs()
        if (res.data?.length > 0) {
          actStaticInfoModel.loadInfo(res.data)
        }
      }
    }
    initData()
  }, [])

  return (
    <div>
      <ActStatisticsFilter
        onFilter={() => {
          actStaticInfoModel.loadInfo(configs)
        }}
      />
      <ActStatisticsTable data={data} loading={loading} />
    </div>
  )
})

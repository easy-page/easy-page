import { BaseContainer, StatisticInfo } from '@/common'
import { actStatisticModel, loadActStatisticToModel } from '@/common/models'
import { observer } from 'mobx-react'
import { useContext, useEffect } from 'react'
import { CommonApplyResultTabTypeEnum } from '../constants'
import { CommonApplyResultContext } from '../hooks/commonApplyResultContext'

type StatisticProps = {
  statisticInfo: StatisticInfo[]
}

export type StatisticContainerProps = {
  activityId: number
  item: React.FC<StatisticProps>
}

export const TabTypeToStatisticMap = {
  [CommonApplyResultTabTypeEnum.BRAND_APPLY_RESULT]: 2,
  [CommonApplyResultTabTypeEnum.POI_APPLY_RESULT]: 1,
}

export const StatisticContainer = observer(
  ({ activityId, item }: StatisticContainerProps) => {
    const { data, error, loading, msg: errorMsg } = actStatisticModel.getList()

    const Item = item
    return (
      <BaseContainer
        isPanel
        error={error}
        loading={loading}
        errorMsg={errorMsg}
      >
        <Item statisticInfo={data} />
      </BaseContainer>
    )
  }
)

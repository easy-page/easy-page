import { observer } from 'mobx-react'
import { useContext, useEffect } from 'react'
import { BaseContainer, StatisticInfo } from '@/common'
import { actStatisticModel, loadActStatisticToModel } from '@/common/models'
import { CommonApplyResultTabTypeEnum } from '../../constants'
import { CommonApplyResultContext } from '../../hooks/commonApplyResultContext'
import { wmActStatisticModel } from '@/common/models/wmDisActStatistic'

type StatisticProps = {
  statisticInfo: StatisticInfo[]
}

type StatisticContainerProps = {
  activityId: number
  item: React.FC<StatisticProps>
}

const TabTypeToStatisticMap = {
  [CommonApplyResultTabTypeEnum.BRAND_APPLY_RESULT]: 2,
  [CommonApplyResultTabTypeEnum.POI_APPLY_RESULT]: 1,
}

export const WmDiscountStatisticContainer = observer(
  ({ activityId, item }: StatisticContainerProps) => {
    const {
      data,
      error,
      loading,
      msg: errorMsg,
    } = wmActStatisticModel.getList()

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

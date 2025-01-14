import { getActDetail } from '@/common/apis'
import { BaseContainer } from '@/common/container/BaseContainer'
import { useParamsInfo } from '@/common/hooks'
import { toNumber } from '@/common/libs'
import {
  actDetailModel,
  poiApplyListModel,
  poiListModel,
} from '@/common/models'
import { ActApplyResultParams } from '@/common/routes'
import classNames from 'classnames'
import { observer } from 'mobx-react'
import { useEffect } from 'react'

export type BaseActResultContainerProps = {
  children: React.ReactNode
  className?: string
}
/** 门店类活动数据加载 */
export const BasePoiActResultContainer = observer(
  ({ children, className }: BaseActResultContainerProps) => {
    const {
      error: actDetailError,
      loading: actDetailLoading,
      msg: actErrorMsg,
    } = actDetailModel.getData()

    const { error: applyListError, msg: applyListErrorMsg } =
      poiApplyListModel.getList()

    const isLoading = actDetailLoading
    const isError = actDetailError || applyListError
    const { params } = useParamsInfo<ActApplyResultParams>()
    const actId = toNumber(params.activityId)

    useEffect(() => {
      const init = async () => {
        actDetailModel.loadData(async () => {
          const res = await getActDetail({ activityId: actId })
          return res
        })
      }
      if (actId) {
        init()
      }
    }, [actId])

    return (
      <BaseContainer
        loading={isLoading}
        error={isError}
        errorMsg={actErrorMsg || applyListErrorMsg}
      >
        <div className={classNames('p-6', className)}>{children}</div>
      </BaseContainer>
    )
  }
)
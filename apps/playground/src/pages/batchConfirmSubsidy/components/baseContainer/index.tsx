import {
  AuthTypeEnum,
  BaseActContainer,
  BaseContainer,
  getQueryString,
  queryResourceStatus,
  toJson,
} from '@/common'
import { getBatchActStat } from '@/common/apis/getBatchActStat'
import { batchConfirmActStatModel } from '@/common/models/btachConfirmActStat'
import { subsidyAuthModel } from '@/common/models/subsidyAuth'
import classNames from 'classnames'
import { observer } from 'mobx-react'
import { useEffect } from 'react'

export type BaseConfirmContainerProps = {
  children: React.ReactNode
}

export const BaseConfirmContainer = observer(
  ({ children }: BaseConfirmContainerProps) => {
    const {
      error: batchConfirmError,
      loading: batchConfirmLoading,
      msg: actErrorMsg,
    } = batchConfirmActStatModel.getData()

    const brandIdsStr = getQueryString('brandIds')
    const brandIds = toJson(brandIdsStr, {
      defaultValue: [],
    })

    useEffect(() => {
      subsidyAuthModel.loadList(async () => {
        const res = await queryResourceStatus({
          resourceIdList: [AuthTypeEnum.PoiConfirmMtCharge],
        })
        return res
      })
    })

    useEffect(() => {
      const init = async () => {
        batchConfirmActStatModel.loadData(async () => {
          const res = await getBatchActStat({
            brandIds,
          } as any)
          return res
        })
      }
      init()
    }, [])

    return (
      <BaseContainer
        loading={batchConfirmLoading}
        error={batchConfirmError}
        errorMsg={actErrorMsg || '页面出错了'}
      >
        <div className={classNames('p-6', 'batch-confirm-subsidy')}>
          {children}
        </div>
      </BaseContainer>
    )
  }
)

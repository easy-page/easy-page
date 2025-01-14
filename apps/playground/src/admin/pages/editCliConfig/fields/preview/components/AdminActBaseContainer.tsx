import { Spin } from 'antd'
import { observer } from 'mobx-react'
import React, { useEffect } from 'react'
import classNames from 'classnames'
import { actDetailModel, factorModel } from '@/common/models'
import { loadActPnListToModel, pnListModel } from '@/common/models'
import {
  AuthTypeEnum,
  ChargeSideEnum,
  useParamsInfo,
  CrudActParams,
  queryResourceStatus,
  getAllFactors,
  OperationType,
  getActDetail,
  BaseContainer,
} from '@/common'
import { subsidyAuthModel } from '@/common/models/subsidyAuth'
import { toNumber } from 'lodash'

// export type BaseComponentProps = {
//   userInfo: UserInfo;
// };

export type ActBaseContainerProps = {
  resourceIdList?: AuthTypeEnum[]
  children: React.ReactNode
  className?: string
  factorCodes?: string[]
  bgBuList: ChargeSideEnum[]
}

/**
 * - 加载因子数据、加载 PN 数据
 * - TODO: 权限判断弹窗处理
 * @param param0
 * @returns
 */
export const AdminActBaseContainer = observer(
  ({
    children,
    className,
    factorCodes = [],
    bgBuList,
    resourceIdList,
  }: ActBaseContainerProps) => {
    const { loading, error, msg: factorErrorMsg } = factorModel.getData()
    const { params } = useParamsInfo<CrudActParams>()
    const {
      loading: actLoading,
      error: actError,
      msg: actErrorMsg,
    } = actDetailModel.getData()
    const {
      loading: pnLoading,
      error: pnError,
      period,
      msg: pnErrorMsg,
    } = pnListModel.getList()
    const {
      loading: authLoading,
      error: authError,
      msg: authMsg,
    } = subsidyAuthModel.getList()

    useEffect(() => {
      if (resourceIdList && resourceIdList.length > 0) {
        subsidyAuthModel.loadList(async () => {
          const res = await queryResourceStatus({ resourceIdList })
          return res
        })
      }

      if (factorCodes?.length !== 0) {
        factorModel.loadData(async () => {
          const res = await getAllFactors({ factorCodes: factorCodes })
          return res
        })
      }

      if (
        [OperationType.EDIT, OperationType.COPY, OperationType.VIEW].includes(
          params.operationType
        )
      ) {
        if (params.actId) {
          /** 查活动详情 */
          actDetailModel.loadData(async () => {
            const res = await getActDetail({
              activityId: toNumber(params.actId),
            })
            return res
          })
        }
      }
    }, [params.actId, params.operationType])

    useEffect(() => {
      loadActPnListToModel({ bgBuList, period: new Date().getTime() / 1000 })
    }, [])

    const isLoading = loading || pnLoading || actLoading || authLoading
    const isError = error || actError || pnError || authError
    const msg = factorErrorMsg || actErrorMsg || pnErrorMsg || authMsg
    console.log('actError:', actError)

    return (
      <BaseContainer loading={isLoading} error={isError} errorMsg={msg}>
        <div className={classNames('p-6 min-w-[1100px]', className)}>
          {children}
        </div>
      </BaseContainer>
    )
  }
)

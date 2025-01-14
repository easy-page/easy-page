import { Spin } from 'antd'
import { observer } from 'mobx-react'
import React, { useEffect, useMemo } from 'react'
import classNames from 'classnames'
import { factorModel, loadBatchGray } from '@/common/models'
import {
  CheckAuthNeedParams,
  getActDetail,
  getAllFactors,
  queryResourceStatus,
  QueryResourceStatusParams,
} from '../apis'
import { loadActPnListToModel, pnListModel } from '@/common/models'
import { ChargeSideEnum } from '../constants/subsidy'
import { BaseContainer } from './BaseContainer'
import { actDetailModel } from '@/common/models'
import { useParamsInfo } from '@/common/hooks'
import { toNumber } from '../libs'
import { CrudActParams, isCopy, isCreate, isEdit } from '../routes'
import { AuthTypeEnum, GrayRuleCode, OperationType } from '../constants'
import { subsidyAuthModel } from '../models/subsidyAuth'
import { crudPnListModal, loadCurdActPnListToModel } from '../models/crudPnList'
import { authNeededModel, loadNeededInfo } from '../models/authNeeded'

// export type BaseComponentProps = {
//   userInfo: UserInfo;
// };

export type ActBaseContainerProps = {
  resourceIdList?: AuthTypeEnum[]
  children: React.ReactNode
  className?: string
  factorCodes?: string[]
  bgBuList?: ChargeSideEnum[]
  /** 目前用于因子质量分 */
  grayCodes?: GrayRuleCode[]

  /** 超出美补 10 元后的权限弹窗信息查询配置 */
  authNeededConfig?: CheckAuthNeedParams
}

/**
 * - 加载因子数据、加载 PN 数据
 * - TODO: 权限判断弹窗处理
 * @param param0
 * @returns
 */
export const BaseActContainer = observer(
  ({
    children,
    className,
    factorCodes = [],
    bgBuList,
    grayCodes,
    authNeededConfig,
    resourceIdList,
  }: ActBaseContainerProps) => {
    const { loading, error, msg: factorErrorMsg } = factorModel.getData()
    const { params } = useParamsInfo<CrudActParams>()
    const {
      loading: authNeededLoading,
      error: authNeededError,
      msg: authNeededErrorMsg,
    } = authNeededModel.getList()
    const {
      loading: actLoading,
      error: actError,
      msg: actErrorMsg,
      data: actDetail,
    } = actDetailModel.getData()
    // const {
    //   loading: pnLoading,
    //   error: pnError,
    //   msg: pnErrorMsg,
    // } = pnListModel.getList()
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

      if (authNeededConfig) {
        loadNeededInfo(authNeededConfig)
      }

      if (factorCodes?.length !== 0) {
        factorModel.loadData(async () => {
          const res = await getAllFactors({ factorCodes: factorCodes })
          return res
        })
      }

      if (grayCodes && grayCodes?.length !== 0) {
        loadBatchGray({ ruleCodes: grayCodes, extend: {} })
      }

      if (
        [OperationType.EDIT, OperationType.COPY, OperationType.VIEW].includes(
          params.operationType
        )
      ) {
        /** 查活动详情 */
        actDetailModel.loadData(async () => {
          const res = await getActDetail({
            activityId: toNumber(params.actId),
          })
          return res
        })
      }
    }, [])

    // useEffect(() => {
    //   if (bgBuList?.length > 0) {
    //     loadActPnListToModel({ bgBuList, period: new Date().getTime() / 1000 })
    //   }
    // }, [bgBuList])

    const hasData = useMemo(() => {
      if (isCreate()) {
        return true
      }
      return Boolean(actDetail?.activity?.id)
    }, [actDetail])

    const isLoading =
      loading ||
      // pnLoading ||
      actLoading ||
      authLoading ||
      !hasData ||
      authNeededLoading
    const isError =
      error ||
      actError ||
      // || pnError
      authError ||
      authNeededError
    const msg =
      factorErrorMsg ||
      actErrorMsg ||
      // pnErrorMsg ||
      authMsg ||
      authNeededErrorMsg
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

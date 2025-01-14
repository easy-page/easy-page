import { Spin } from 'antd'
import classNames from 'classnames'
import React from 'react'
import { ErrorPage } from '../components/zspt/ErrorPage'
import { PageErrorIconEnum } from '../constants/images'
import { BaseModel } from '../models/base/base'
import { MapModel } from '../models/base/map'
import { ListModel } from '../models/base/list'
import { observer } from 'mobx-react'

export type BaseContainerProps = {
  children: React.ReactNode
  loading?: boolean
  error?: boolean
  errorMsg?: string
  models?: (MapModel<any> | ListModel<any>)[]
  /** 是否是局部 panel,如果是，则样式会有点差别 */
  isPanel?: boolean
  panelClassName?: string
}

const getLoadInfo = ({
  models = [],
  loading,
  error,
  errorMsg,
}: {
  loading?: boolean
  error?: boolean
  errorMsg?: string
  models?: (MapModel<any> | ListModel<any>)[]
}) => {
  const result = {
    loading,
    error,
    errorMsg,
  }

  models.forEach((e) => {
    const getData = (e as any).getData?.bind(e) || (e as any).getList?.bind(e)
    const { error, loading, msg } = getData()
    result.error = result.error || error
    result.loading = result.loading || loading
    result.errorMsg = result.errorMsg || msg
  })
  return result
}

/**
 */
export const BaseContainer = observer(
  ({
    children,
    loading,
    error,
    errorMsg,
    isPanel,
    models,
    panelClassName,
  }: BaseContainerProps) => {
    const loadingClasses = classNames({
      'flex h-[100vh] w-full items-center justify-center': !isPanel,
      'flex  w-full items-center justify-center': isPanel && !panelClassName,
      panelClassName,
    })
    const errorClasses = classNames({
      'flex h-[100vh] w-full items-center justify-center': !isPanel,
      'flex w-full items-center justify-center': isPanel && !panelClassName,
      panelClassName,
    })
    const loadInfo = getLoadInfo({ models, loading, error, errorMsg })
    if (loadInfo.loading) {
      return (
        <div className={loadingClasses}>
          <Spin />
        </div>
      )
    }
    if (loadInfo.error) {
      return (
        <div className={errorClasses}>
          <ErrorPage
            desc={loadInfo.errorMsg}
            error={PageErrorIconEnum.NetworkError}
          />
        </div>
      )
    }
    return children
  }
)

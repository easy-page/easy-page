import { getUserInfo } from '@/common/apis/getUserInfo'
import { userModel } from '@/common/models'
import { Spin } from 'antd'
import { observer } from 'mobx-react'
import React, { useEffect } from 'react'
import classNames from 'classnames'
import { GrayRuleCode, MccKeysEnum } from '@/common/constants'
import { mccModel } from '@/common/models'
import { getMcc } from '@/common/apis/getMcc'
import { BaseContainer } from './BaseContainer'
import { ErrorPage } from '../components/zspt/ErrorPage'
import { PageErrorIconEnum } from '../constants/images'
import { configListModel, loadConfigList } from '../models/configList'
import { batchGray } from '../apis/batchGray'
import { grayConfigModel } from '../models/grayConfig'

// export type BaseComponentProps = {
//   userInfo: UserInfo;
// };

export type RootContainerProps = {
  children: React.ReactNode
  className?: string
  mccKeys?: MccKeysEnum[]
  // customLoad?: () => Promise<{
  //   loading: boolean;
  //   success: boolean;
  // }>;
}

/**
 * - 加载基础数据，并放入 model 中
 * - 加载异常页面处理、网络异常统一处理
 * @param param0
 * @returns
 */
export const RootContainer = observer(
  ({ children, className, mccKeys }: RootContainerProps) => {
    const { loading, error, msg: userErrorMsg } = userModel.getData() || {}
    const {
      loading: mccLoading,
      error: mccError,
      msg: mccErrorMsg,
    } = mccModel.getData() || {}

    const {
      data: configList,
      loading: configLoading,
      error: configListError,
      msg: configListMsg,
    } = configListModel.getList()
    useEffect(() => {
      userModel.loadData(async () => {
        const userInfo = await getUserInfo({})
        return userInfo
      })
      loadConfigList()
      mccModel.loadData(async () => await getMcc({ keys: mccKeys || [] }))
    }, [])

    useEffect(() => {
      grayConfigModel.loadData(
        async () =>
          await batchGray({
            ruleCodes: [
              GrayRuleCode.BatchConfirm4ButtonGray,
              GrayRuleCode.BatchConfirm4ListGray,
            ],
            extend: {},
          })
      )
    }, [])

    const hasLoading =
      loading || mccLoading || configLoading || configList.length === 0

    if (hasLoading) {
      return <Spin className="flex h-full w-full items-center justify-center" />
    }
    const hasLoadError = error || mccError || configListError
    const errorMsg = userErrorMsg || mccErrorMsg || configListMsg

    return (
      <BaseContainer
        loading={loading || mccLoading}
        error={hasLoadError}
        errorMsg={errorMsg}
      >
        <div className={classNames(className)}>{children}</div>
      </BaseContainer>
    )
  }
)

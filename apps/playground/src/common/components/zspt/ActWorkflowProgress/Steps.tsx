/**
 * 活动进度展示组件
 */
import React, { useEffect, useMemo, useState } from 'react'
import { StepItem } from './StepItem'
import { ACTIVITY_STATUS_DESC, ActivityStatusEnum } from '@/common/constants'
import { flowNodeModel } from '@/common/models/flowNode'
import { observer } from 'mobx-react'
import { FlowNode, getFlowNode } from '@/common/apis'
import { PrimaryHeader } from './PrimaryHeader'
import { formateDate, FormatStyle } from '@/common/libs'
import { Alert } from 'antd'
import { BaseContainer } from '@/common/container'
import { WarningOutlined } from '@ant-design/icons'
import './index.less'

interface Iprops {
  activityId?: number
}
export const ActivitySteps: React.FC<Iprops> = observer(({ activityId }) => {
  const { data, loading, error } = flowNodeModel.getData()
  useEffect(() => {
    if (!activityId) {
      return
    }
    flowNodeModel.loadData(() => getFlowNode({ activityId }))
  }, [activityId])

  const stopStatus = useMemo(() => {
    return [
      ActivityStatusEnum.Creating,
      ActivityStatusEnum.Terminated,
      ActivityStatusEnum.Pause,
    ].includes(data.activityStatus as ActivityStatusEnum)
  }, [data.activityStatus])
  const flowNodes = data?.flowNode || []

  const transformDataSource = useMemo(() => {
    const arr: Array<Array<FlowNode>> = flowNodes
      .filter((item) => !item?.sameFlowNodeKey)
      .map((item) => [{ ...item }])

    flowNodes
      .filter((item) => item?.sameFlowNodeKey)
      .map((each) => {
        const sameFlowNodeArr = arr.find(
          (item) => item[0].flowNodeCode === each?.sameFlowNodeKey
        )
        if (sameFlowNodeArr) {
          sameFlowNodeArr.push(each)
          sameFlowNodeArr.sort(
            (pre, aft) => pre.flowNodeCode - aft.flowNodeCode
          )
        }
      })

    return arr
  }, [flowNodes])
  const isExistParallelNode = useMemo(() => {
    return transformDataSource.some((nodeArr) => nodeArr.length > 1)
  }, [transformDataSource])
  return (
    <div className=" w-full">
      <PrimaryHeader
        description={
          <div>
            <span className="px-2">|</span>
            <span style={{ marginRight: 3, fontSize: 12 }}>
              当前日期：
              {formateDate(new Date().getTime() / 1000, FormatStyle.YYYYMMDD)}
            </span>
          </div>
        }
      >
        提报进度
      </PrimaryHeader>
      <BaseContainer isPanel loading={loading} error={error}>
        <>
          {stopStatus && (
            <Alert
              className="mb-2"
              message={`活动${
                ACTIVITY_STATUS_DESC[data?.activityStatus as ActivityStatusEnum]
              }，提报进度不可流转`}
              type="error"
              icon={<WarningOutlined />}
            />
          )}
          <div className="uoc-act-steps">
            <ul className="roo-steps vertical ">
              {(transformDataSource || []).map((nodeArr, index) => {
                if (nodeArr.length === 1) {
                  return (
                    <StepItem
                      key={index}
                      item={nodeArr[0]}
                      stopStatus={stopStatus}
                      activityStatus={
                        data?.activityStatus as ActivityStatusEnum
                      }
                      isExistParallelNode={isExistParallelNode}
                      isLast={index === transformDataSource.length - 1}
                    />
                  )
                }
                return (
                  <div key={index} className="step-group-box">
                    {index !== transformDataSource.length - 1 ? (
                      <div className="step-group-line"></div>
                    ) : (
                      <></>
                    )}
                    <div
                      className={`step-group ${
                        index !== transformDataSource.length - 1 && 'is-no-last'
                      }`}
                    >
                      <StepItem
                        item={nodeArr[0]}
                        stopStatus={stopStatus}
                        activityStatus={
                          data?.activityStatus as ActivityStatusEnum
                        }
                        isExistParallelNode={isExistParallelNode}
                      />
                      <StepItem
                        item={nodeArr[1]}
                        stopStatus={stopStatus}
                        activityStatus={
                          data?.activityStatus as ActivityStatusEnum
                        }
                        isExistParallelNode={isExistParallelNode}
                      />
                    </div>
                  </div>
                )
              })}
            </ul>
          </div>
        </>
      </BaseContainer>
    </div>
  )
})

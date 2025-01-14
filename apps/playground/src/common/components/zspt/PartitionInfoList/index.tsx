import React, { ReactNode, useCallback } from 'react'
import './index.less'
import {
  BusinessPartitionConfig,
  BusinessPartitionConfigArray,
  BusinessPartitionItem,
  IGroup,
} from '@/common/apis/saveSgPlan'
import { observer } from 'mobx-react'
import { mccModel } from '@/common/models'

export type PickIGroup = Pick<IGroup, 'name' | 'businessPartition'>

interface IProps {
  groupInfo: PickIGroup[]
  desc: string | ReactNode
  modalMinHeight?: string | number
}

export const PartitionInfoList = observer((props: IProps) => {
  const { groupInfo, desc, modalMinHeight = '240px' } = props
  const { data: mcc } = mccModel.getData()
  const organizationConfig: BusinessPartitionConfigArray =
    mcc.organization_config || []

  if (!organizationConfig || organizationConfig.length === 0) {
    return null
  }

  const getGroupNameById = useCallback(
    (oriId: number) => {
      return organizationConfig.find(
        (item: BusinessPartitionConfig) => item.oriId === oriId
      )?.oriName
    },
    [organizationConfig]
  )

  return (
    <div
      className="save-god-price-plan-modal"
      style={{ minHeight: modalMinHeight }}
    >
      <div className="modal-title">{desc}</div>
      <div className="modal-partition-list">
        {groupInfo.map((groupItem: PickIGroup, index: number) => (
          <div
            className="modal-partition-item"
            key={`modal-partition-item-${index}`}
          >
            <div className="partition-title">
              {index + 1}、子方案名称：{groupItem.name}
            </div>
            <div className="partition-desc">
              <div style={{ paddingLeft: 21 }}>
                合作业务组：
                {groupItem?.businessPartition?.map(
                  (businessItem: BusinessPartitionItem, idx: number) => {
                    const groupName = getGroupNameById(businessItem.oriId)
                    const groupIdList = businessItem.oriMisId
                    const groupIdListStr = groupIdList.join('、')
                    return (
                      <span
                        className="ori-id-span"
                        key={`business-item-${idx}`}
                      >
                        {groupName || '-'}（{groupIdListStr}）
                      </span>
                    )
                  }
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
})

import { observer } from 'mobx-react'
import { useState } from 'react'
import { CommonActList } from '../commonActList'
import { Segmented } from 'antd'
import { ConfirmBrandList } from '../confirmBrandList'
import {
  ActConrirmSubTabResources,
  getQueryNumber,
  getQueryString,
} from '@/common'

const ConfirnSubtabOptions = [
  {
    label: '提报活动维度',
    value: ActConrirmSubTabResources.Act,
  },
  {
    label: '业务品牌维度',
    value: ActConrirmSubTabResources.Brand,
  },
]

export const ConfirmTabContent = observer(() => {
  const defaultTab = getQueryString(
    'confirmSubTab'
  ) as ActConrirmSubTabResources

  const [activeTab, setActiveTab] = useState(
    defaultTab || ActConrirmSubTabResources.Act
  )

  const confirmSubTabConfig = {
    [ActConrirmSubTabResources.Act]: <CommonActList />,
    [ActConrirmSubTabResources.Brand]: <ConfirmBrandList />,
  }

  // TODO: 增加灰度返回判断
  return (
    <div>
      <div className="mb-4">
        <Segmented<ActConrirmSubTabResources>
          value={activeTab}
          onChange={(value: ActConrirmSubTabResources) => {
            setActiveTab(value)
          }}
          options={ConfirnSubtabOptions}
        />
      </div>
      {confirmSubTabConfig[activeTab]}
    </div>
  )
})

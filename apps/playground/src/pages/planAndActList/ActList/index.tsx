import {
  ActListScene,
  ActSubTabResources,
  ActSubTabText,
  BizLineEnum,
  PlanAndActListParams,
  PlanAndActParamsEnum,
  PlanAndActTabResources,
  ZsptSegmented,
  actListColumns,
  getBizLine,
  getQueryNumber,
  useParamsInfo,
} from '@/common'
import { ActFilter } from '@/common/fields'
import {
  actListModel,
  actTemplateListModel,
  loadActListToModel,
  loadActTemplateListToModel,
} from '@/common/models'
import { mccModel } from '@/common/models'
import { userModel } from '@/common/models'
import { observer } from 'mobx-react'
import { useEffect, useMemo, useState } from 'react'
import { CreateAct } from './components'
import { InviteSettings, InviteSettingsProps } from '../ActInviteSettings'
import { getTablePageinationConfig } from '@/common/utils/getTablePaginationConfig'
import { roleManager } from '@/common/roles/manager'
import { AllActSubTabs, roleAndActSubTabMap } from '@/common/roles/mappings'
import { TableOperations } from './tableOperations'
import { TemplateSceneEnum } from '@/common/apis/getCreateActItems'
import { ActColumnsInfo } from '@/common/utils/getActColumns'
import { configListModel } from '@/common/models/configList'
import { CommonActList } from './components/commonActList'
import { ConfirmTabContent } from './components/confirmTabContent'
import { grayConfigModel } from '@/common/models/grayConfig'

enum CheckIsInBlankListEnum {
  Yes = '1',
  No = '0',
}

const getSubTabId = () => {
  const subId = getQueryNumber('filterType')
  if (subId) {
    return 'filterType'
  }
  return PlanAndActParamsEnum.ActFilterType
}

export const ActList = observer(() => {
  const { data: actTemplates } = actTemplateListModel.getList()
  const { data: configs } = configListModel.getList()

  const { data: userInfo } = userModel.getData() || {}
  const tabs = useMemo(
    () =>
      roleManager.getResources(roleAndActSubTabMap, {
        userInfo,
        sortArray: AllActSubTabs,
        bizLine: getBizLine(),
      }),
    [userInfo]
  )

  const { filterType } = actListModel.getList()

  const {
    data: { batchConfirm4ListGray = CheckIsInBlankListEnum.No },
  } = grayConfigModel.getData()

  const AllTabContentConfig = useMemo(() => {
    if (String(batchConfirm4ListGray) !== CheckIsInBlankListEnum.Yes) {
      return {
        [ActSubTabResources.All]: <CommonActList />,
        [ActSubTabResources.Confirm]: <CommonActList />,
        [ActSubTabResources.Mine]: <CommonActList />,
      }
    }
    return {
      [ActSubTabResources.All]: <CommonActList />,
      [ActSubTabResources.Confirm]: <ConfirmTabContent />,
      [ActSubTabResources.Mine]: <CommonActList />,
    }
  }, [batchConfirm4ListGray])

  return (
    <div>
      <div className="flex flex-row justify-between mb-4">
        <ZsptSegmented
          paramId={getSubTabId()}
          hasTab={(id) => tabs.includes(id)}
          defaultId={ActSubTabResources.Mine}
          onChange={(val) => {
            // actListModel.resetFilters();
            actListModel.setFilters({
              filterType: val,
            })
          }}
          options={tabs.map((e) => ({
            label: ActSubTabText[e],
            value: e,
          }))}
        />
        <CreateAct
          configs={configs}
          actTemplates={actTemplates}
          userInfo={userInfo}
        />
      </div>
      {AllTabContentConfig[filterType]}
    </div>
  )
})

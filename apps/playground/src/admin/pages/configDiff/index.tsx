import {
  fullConfigsModel,
  loadFullConfigs,
} from '@/admin/common/models/fullConfigs'
import { BaseContainer, ZsptTab } from '@/common'

import { observer } from 'mobx-react'
import { useEffect } from 'react'
import { DiffField } from './components/DiffField'
import { DiffTabs, DiffTabsText } from '@/admin/common/routes/toConfigDiff'
import { DiffAct } from './components/DiffAct'

export const ConfigDiff = observer(() => {
  const { data: configs, error, loading } = fullConfigsModel.getList()
  useEffect(() => {
    loadFullConfigs()
  }, [])

  return (
    <BaseContainer error={error} loading={loading}>
      <div className="p-8 flex flex-col">
        <ZsptTab
          tabProps={{}}
          tabs={[
            {
              id: DiffTabs.DiffField,
              label: (
                <div className="font-medium text-xl">
                  {DiffTabsText.diffField}
                </div>
              ),
              content: <DiffField configs={configs} />,
            },
            {
              id: DiffTabs.DiffAct,
              label: (
                <div className="font-medium text-xl">
                  {DiffTabsText.diffAct}
                </div>
              ),
              content: <DiffAct configs={configs} />,
            },
          ]}
          defaultTab={DiffTabs.DiffField}
          id={'tab'}
        />
      </div>
    </BaseContainer>
  )
})

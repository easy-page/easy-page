import { BaseContainer, getUserInfo, userModel, ZsptTab } from '@/common'
import { FieldList } from './fieldList'
import { ConfigList } from './configList'
import { observer } from 'mobx-react'
import { AdminTabs, AdminTabsText } from '../common'
import { useEffect } from 'react'
// import { getFieldsConfig } from './test'

export const Home = observer(() => {
  const { loading, error, msg: userErrorMsg } = userModel.getData() || {}

  useEffect(() => {
    const init = async () => {
      // getFieldsConfig([
      //   'actDesc',
      //   'actName',
      //   'poiType',
      //   'actTime',
      //   'actPeriod',
      //   'weekDays',
      //   'subAct',
      //   'inputWay',
      //   'inviteWay',
      //   'poiList',
      //   'promotionType',
      //   'qualify',
      //   // 'canApplyRole',
      //   // 'ruleDesc',
      //   // 'chooseOperation',
      // ])
      userModel.loadData(async () => {
        const userInfo = await getUserInfo({})
        console.log('userInfo:', userInfo)
        return userInfo
      })
    }
    init()
  }, [])
  return (
    <BaseContainer error={error} loading={loading} errorMsg={userErrorMsg}>
      <div className="p-8">
        <ZsptTab
          tabProps={{}}
          tabs={[
            {
              id: AdminTabs.Config,
              label: (
                <div className="font-medium text-xl">
                  {AdminTabsText.config}
                </div>
              ),
              content: <ConfigList />,
            },
            {
              id: AdminTabs.Field,
              label: (
                <div className="font-medium text-xl">{AdminTabsText.field}</div>
              ),
              content: <FieldList />,
            },
          ]}
          defaultTab={AdminTabs.Config}
          id={'tab'}
        />
      </div>
    </BaseContainer>
  )
})

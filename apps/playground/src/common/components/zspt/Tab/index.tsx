import { PlanAndActTabResources } from '@/common/constants'
import { useParamsInfo } from '@/common/hooks/useParams'
import { Tabs, TabsProps } from 'antd'
import TabPane, { TabPaneProps } from 'antd/es/tabs/TabPane'
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'

export type TabInfo = {
  id: string
  label: string | React.ReactNode
  content: React.ReactNode
  icon?: string
  closable?: boolean
  forceRender?: boolean
  disabled?: boolean
}

export type ZsptTabProps = {
  tabs: TabInfo[]
  defaultTab: string
  /** 如果将参数放到路由上，参数 id */
  id?: string
  tabProps?: TabsProps
  tabPanelProps?: TabPaneProps
  checkPreventOnchange?: (tab: string) => any
}

const getDefaultTab = ({
  paramsTabId,
  defaultTab,
  tabs,
}: {
  tabs: TabInfo[]
  defaultTab: string
  paramsTabId?: string
}) => {
  const tabIds = tabs.map((e) => e.id)
  if (paramsTabId && tabIds.includes(paramsTabId)) {
    return paramsTabId
  }
  if (defaultTab && tabIds.includes(defaultTab)) {
    return defaultTab
  }
  return tabIds?.[0] || defaultTab
}

const getOldTabParmas = (params: Record<string, any>) => {
  const val = params['tabValue']
  if (!val) {
    return undefined
  }
  if (val === 'planList') {
    return PlanAndActTabResources.Plan
  }
  return PlanAndActTabResources.Act
}

const ZsptTabComp = (
  {
    tabs,
    id = '',
    defaultTab,
    tabPanelProps = {},
    tabProps = {},
    checkPreventOnchange,
  }: ZsptTabProps,
  ref: React.Ref<{ setTab: (tab: string) => void; presentTab: string }>
) => {
  const { activeKey, ...rest } = tabProps
  const { appendParamToUrl, params } = useParamsInfo()

  const [tab, setTab] = useState(
    getDefaultTab({
      /** tabValue 兼容旧的活动 */
      paramsTabId: params[id] || getOldTabParmas(params),
      defaultTab,
      tabs,
    })
  )

  useEffect(() => {
    if (id) {
      console.log('current tab: switch', tab)
      appendParamToUrl({ [id]: tab })
    }
  }, [tab])
  console.log('current tab', ref)

  useImperativeHandle(
    ref,
    () => ({
      setTab: (tab: string) => {
        setTab(tab)
        tabProps.onChange?.(tab)
      },
      presentTab: tab,
    }),
    [tab]
  )
  return (
    <Tabs
      {...rest}
      activeKey={activeKey || tab}
      onChange={(val) => {
        if (checkPreventOnchange && checkPreventOnchange(val)) {
          return
        }
        setTab(val)
        tabProps.onChange?.(val)
      }}
    >
      {tabs.map((each) => (
        <TabPane
          disabled={each?.disabled}
          {...tabPanelProps}
          id={each.id}
          key={each.id}
          forceRender={each.forceRender}
          closable={each.closable}
          icon={each.icon}
          tab={each.label}
        >
          {each.content}
        </TabPane>
      ))}
    </Tabs>
  )
}

export const ZsptTab = forwardRef(ZsptTabComp)

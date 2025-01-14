import { nodeUtil } from '@easy-page/antd-ui'
import { showBtnSwitch } from './showBtnSwitch'
import { showBtnWithStatus } from './showBtnWithStatus'
import { showBtnWithTab } from './showBtnWithTab'

export type ShowBtnOptions<Status extends number, Tab extends number> = {
  statusMap: Record<Status, string>
  statusLabel: string
  tabMap: Record<Tab, string>
  tabLabel: string
  tips?: string
}
export const showBtn = <Status extends number, Tab extends number>(
  id: string,
  label: string,
  {
    statusLabel,
    statusMap,
    tabLabel,
    tabMap,
    tips,
  }: ShowBtnOptions<Status, Tab>
) => {
  return showBtnSwitch(id, label, { tips }).appendChildren([
    showBtnWithStatus(id, label, statusMap, { statusLabel }),
    showBtnWithTab(id, label, tabMap, { tabLabel }),
  ])
}

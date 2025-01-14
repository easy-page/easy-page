import { Empty } from '@easy-page/antd-ui'
import { AuthResInfo, GetPlanDetailResult } from '../apis'
import { ListModel } from './base/list'
import { MapModel } from './base/map'

export const subsidyAuthModel = new ListModel<AuthResInfo, Empty>({
  defaultFilters: {},
  disablePage: true
})
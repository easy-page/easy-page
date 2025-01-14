import {
  checkAuthNeeded,
  CheckAuthNeedInfo,
  CheckAuthNeedParams,
} from '@/common/apis'
import { ListModel } from './base/list'
import { Empty } from '@easy-page/antd-ui'

export const authNeededModel = new ListModel<CheckAuthNeedInfo, Empty>({
  defaultFilters: {},
  disablePage: true,
})

export const loadNeededInfo = async (params: CheckAuthNeedParams) => {
  authNeededModel.loadList(async () => {
    const res = await checkAuthNeeded(params)
    return res
  })
}

import { needOtherOrgModel } from '@/common/models/needOtherOrgPnAudit'
import { CommonActCrudFormState } from '@/pages/actsCrud/ActsCrudInfo/fields/interface'
import { FormUtil } from '@easy-page/antd-ui'

export const clearAndHideApplyReason = async (
  parentFormUtil: FormUtil<CommonActCrudFormState>
) => {
  await needOtherOrgModel.loadData(() => {
    return Promise.resolve({
      data: {
        needReq: false,
        result: { needAudit: false },
      },
      success: true,
    })
  })
  parentFormUtil?.setField('submitVersion', new Date().getTime(), {
    validate: false,
  })
}

import { Operation } from '@/common/components'
import { ActivityStatusEnum, OperationEnum } from '@/common/constants'
import { ApplyStatusEnum } from '../../../constants'
import { actDetailModel } from '@/common'
import { ResourceApplyListItem } from '@/common/apis/waiMaResource'

export const hideOperationBtn: Operation<ResourceApplyListItem> = {
  id: OperationEnum.Hide,
  label: '/',
  show({ record }) {
    const { data: actDetail } = actDetailModel.getData()
    return (
      [
        ApplyStatusEnum.PASSED,
        ApplyStatusEnum.REJECT,
        ApplyStatusEnum.NONEED,
      ].includes(record.status) ||
      actDetail?.activity?.status === ActivityStatusEnum.Terminated
    )
  },
  async action({ record }) {},
  auth: [],
}

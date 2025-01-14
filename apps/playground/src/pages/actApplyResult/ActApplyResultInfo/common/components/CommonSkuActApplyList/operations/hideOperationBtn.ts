import { ResourceApplyListItem, SkuApplyListItem } from '@/common/apis'
import { Operation } from '@/common/components'
import {
  ActivityStatusEnum,
  ActivityStatusOfFilter,
  OperationEnum,
} from '@/common/constants'
import { ApplyStatusEnum } from '../../../constants'
import { actDetailModel } from '@/common'

export const hideOperationBtn: Operation<SkuApplyListItem> = {
  id: OperationEnum.Hide,
  label: '-',
  show({ record }) {
    const { data: actDetail } = actDetailModel.getData()
    return (
      [ActivityStatusOfFilter.Exit].includes(record.status) ||
      actDetail?.activity?.status === ActivityStatusEnum.Terminated
    )
  },
  async action({ record }) {},
  auth: [],
}

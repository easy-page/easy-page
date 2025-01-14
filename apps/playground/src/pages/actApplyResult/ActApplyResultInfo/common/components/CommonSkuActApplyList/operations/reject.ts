import { Modal, message } from 'antd'
import { actDetailModel, getBizLine, getQueryNumber } from '@/common'
import {
  ResourceApplyListItem,
  SkuApplyListItem,
  resourceApplyAudit,
} from '@/common/apis'
import { Operation } from '@/common/components'
import {
  ActivityStatusEnum,
  ActivityStatusOfFilter,
  OperationEnum,
} from '@/common/constants'
import RejectDialog from '../../RejectDialog'
import { AuditStatusEnum } from '../../../constants'
import { loadSkuApplyListToModel } from '@/common/models/wmDiscount'
import { rejectAct } from '@/common/apis/wmDiscount/rejectAct'

export const reject: Operation<SkuApplyListItem> = {
  id: OperationEnum.Reject,
  label: '审核驳回',
  show({ record }) {
    const { data: actDetail } = actDetailModel.getData()
    return (
      record.status === ActivityStatusOfFilter.ToAudit &&
      actDetail?.activity?.status !== ActivityStatusEnum.Terminated
    )
  },
  async action({ record }) {
    const reason: string | undefined = await RejectDialog.show({
      title: '驳回理由',
      cancelText: '取消',
      okText: '确认',
      placeholder: '请输入驳回理由',
    })
    const actId = getQueryNumber('activityId')
    if (reason) {
      Modal.confirm({
        title: '确认驳回吗？',
        centered: true,
        content: '',
        cancelText: '取消',
        okText: '确认',
        async onOk() {
          if (!actId) {
            message.error('页面路径错误，缺少：activityId')
            return
          }

          const result = await rejectAct({
            actId: record?.actId,
            poiId: record?.poiId,
            skuId: record?.skuId,
            esId: record?.esId,
            reason,
          })
          if (result.success) {
            message.success(result?.msg|| '驳回成功')
            loadSkuApplyListToModel({
              bizLine: getBizLine(),
              activityId: actId,
            })
          } else {
            message.error(result.msg || '驳回失败，请稍后重试')
          }
          return null
        },
      })
    }
  },
  auth: [],
}

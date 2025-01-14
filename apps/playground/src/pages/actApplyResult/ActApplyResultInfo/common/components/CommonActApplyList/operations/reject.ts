import { Modal, message } from 'antd'
import {
  actDetailModel,
  getQueryNumber,
  loadWaiMaSourceApplyListToModel,
} from '@/common'
import { Operation } from '@/common/components'
import { ActivityStatusEnum, OperationEnum } from '@/common/constants'
import RejectDialog from '../../RejectDialog'
import {
  ApplyStatusEnum,
  AuditStatusEnum,
  CommonApplyResultTabTypeEnum,
  WaiMaResourceTabTypeMap,
} from '../../../constants'
import {
  ResourceApplyListItem,
  resourceApplyAudit,
} from '@/common/apis/waiMaResource'

export const reject: Operation<ResourceApplyListItem> = {
  id: OperationEnum.Reject,
  label: '审核驳回',
  show({ record }) {
    const { data: actDetail } = actDetailModel.getData()
    return (
      record.status === ApplyStatusEnum.UNAPPLY &&
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
        content: '驳回后，供应商可修改素材，再次提交',
        cancelText: '取消',
        okText: '确认',
        async onOk() {
          if (!actId) {
            message.error('页面路径错误，缺少：activityId')
            return
          }
          const params = {
            activityId: actId,
            resourceId: record?.resourceId,
            auditStatus: AuditStatusEnum.REJECT,
            rejectReason: reason || '',
          }
          const result = await resourceApplyAudit(params)
          if (result.success) {
            loadWaiMaSourceApplyListToModel({
              applyType:
                WaiMaResourceTabTypeMap[
                  CommonApplyResultTabTypeEnum.SUPPLIER_APPLY_RESULT
                ],
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

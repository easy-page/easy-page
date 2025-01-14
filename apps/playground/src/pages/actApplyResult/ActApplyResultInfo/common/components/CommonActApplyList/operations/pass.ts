import { Modal, message } from 'antd'
import {
  actDetailModel,
  getQueryNumber,
  loadWaiMaSourceApplyListToModel,
} from '@/common'
import { Operation } from '@/common/components'
import { ActivityStatusEnum, OperationEnum } from '@/common/constants'
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

export const pass: Operation<ResourceApplyListItem> = {
  id: OperationEnum.Pass,
  label: '审核通过',
  show({ record }) {
    const { data: actDetail } = actDetailModel.getData()
    return (
      record.status === ApplyStatusEnum.UNAPPLY &&
      actDetail?.activity?.status !== ActivityStatusEnum.Terminated
    )
  },
  async action({ record }) {
    const actId = getQueryNumber('activityId')
    Modal.confirm({
      title: '确认审核通过？',
      centered: true,
      content: '审核通过后，供应商不可修改素材',
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
          auditStatus: AuditStatusEnum.PASS,
          rejectReason: '',
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
          message.error(result.msg || '审核通过失败，请稍后重试')
        }
        return null
      },
    })
  },
  auth: [],
}

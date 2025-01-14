import { Modal, message } from 'antd'
import { actDetailModel, getBizLine, getQueryNumber } from '@/common'
import { SkuApplyListItem } from '@/common/apis'
import { Operation } from '@/common/components'
import {
  ActivityStatusEnum,
  ActivityStatusOfFilter,
  OperationEnum,
} from '@/common/constants'

import { loadSkuApplyListToModel } from '@/common/models/wmDiscount'
import { approveAct } from '@/common/apis/wmDiscount/approveAct'

export const pass: Operation<SkuApplyListItem> = {
  id: OperationEnum.Pass,
  label: '审核通过',
  show({ record }) {
    const { data: actDetail } = actDetailModel.getData()
    return (
      record.status === ActivityStatusOfFilter.ToAudit &&
      actDetail?.activity?.status !== ActivityStatusEnum.Terminated
    )
  },
  async action({ record }) {
    const actId = getQueryNumber('activityId')
    Modal.confirm({
      title: '确认该活动审核通过吗？',
      centered: true,
      cancelText: '取消',
      okText: '确认',
      async onOk() {
        if (!actId) {
          message.error('页面路径错误，缺少：activityId')
          return
        }

        const result = await approveAct({
          actId: record?.actId,
          poiId: record?.poiId,
          skuId: record?.skuId,
          esId: record?.esId,
        })
        if (result.success) {
          message.success(result.msg || '该活动审核已通过')
          loadSkuApplyListToModel({
            bizLine: getBizLine(),
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

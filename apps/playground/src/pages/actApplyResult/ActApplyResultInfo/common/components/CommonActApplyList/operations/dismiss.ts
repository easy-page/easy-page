import { PoiApplyListItem, exitPoiApply } from '@/common/apis'
import { Operation } from '@/common/components'
import { ActivityStatusOfFilter, OperationEnum } from '@/common/constants'
import RejectDialog from '../../RejectDialog'
import { Modal, message } from 'antd'
import { getBizLine, getQueryNumber, loadPoiApplyListToModel } from '@/common'
import { showBatchCancelResult } from '../../../operations'

export const dismiss: Operation<PoiApplyListItem> = {
  id: OperationEnum.Dismiss,
  label: '清退',
  show({ record }) {
    return record.status !== ActivityStatusOfFilter.Exit
  },
  async action({ record }) {
    const reason: string | undefined = await RejectDialog.show({
      title: '写给商家的清退理由',
      cancelText: '取消',
      okText: '确认',
      centered: true,
      placeholder: '请输入清退理由',
    })
    const actId = getQueryNumber('activityId')
    const bizLine = getBizLine()
    if (reason) {
      Modal.confirm({
        title: '确认清退吗？',
        centered: true,
        content: '清退后，商家无法再次报名本活动',
        cancelText: '取消',
        okText: '确认',
        async onOk() {
          if (!actId) {
            message.error('页面路径错误，缺少：activityId')
            return
          }
          const result = await exitPoiApply({
            reason,
            actId: actId,
            list: [
              {
                id: record.id,
                poiId: record.poiId,
                poiName: record.poiName,
              },
            ],
          })
          if (result.success) {
            showBatchCancelResult(result.data, () => {
              loadPoiApplyListToModel({
                bizLine: getBizLine(),
                activityId: actId,
              })
            })
          } else {
            message.error(result.msg || '清退失败，请稍后重试')
          }
          return null
        },
      })
    }
  },
  auth: [],
}

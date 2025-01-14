import { PoiApplyListItem, SkuApplyListItem, exitPoiApply } from '@/common/apis'
import { Operation } from '@/common/components'
import { ActivityStatusOfFilter, OperationEnum } from '@/common/constants'
import RejectDialog from '../../RejectDialog'
import { Modal, message } from 'antd'
import { getBizLine, getQueryNumber, loadPoiApplyListToModel } from '@/common'
import { showBatchCancelResult } from '../../../operations'
import { CommonApplyResultTabTypeEnum } from '../../../constants'
import { exitSkuApply } from '@/common/apis/exitSkuApply'
import { loadSkuApplyListToModel } from '@/common/models/wmDiscount'

export const dismiss: Operation<SkuApplyListItem> = {
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
        content: '清退后，商品无法再次报名本活动',
        cancelText: '取消',
        okText: '确认',
        async onOk() {
          if (!actId) {
            message.error('页面路径错误，缺少：activityId')
            return
          }
          const result = await exitSkuApply({
            reason,
            actId: actId,
            esId: record.esId,
            poiId: record.poiId,
            skuId: record.skuId,
          })

          if (result.success) {
            message.success(result.msg || '清退成功')
            setTimeout(() => {
              loadSkuApplyListToModel({
                bizLine: getBizLine(),
                activityId: actId,
              })
            }, 500)
            // showBatchCancelResult(result, () => {
            //   loadPoiApplyListToModel({
            //     bizLine: getBizLine(),
            //     activityId: actId,
            //   })
            // })
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

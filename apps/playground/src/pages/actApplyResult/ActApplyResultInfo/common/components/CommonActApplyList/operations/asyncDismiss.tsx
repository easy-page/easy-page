import { PoiApplyListItem, exitPoiApply } from '@/common/apis'
import { Operation } from '@/common/components'
import { ActivityStatusOfFilter, OperationEnum } from '@/common/constants'
import RejectDialog from '../../RejectDialog'
import { Modal, message } from 'antd'
import {
  getBizLine,
  getQueryNumber,
  loadPoiApplyListToModel,
  poiApplyListModel,
} from '@/common'
import { showBatchCancelResult } from '../../../operations'
import { CommonApplyResultTabTypeEnum } from '../../../constants'
import { getBrandDismissCount } from '@/common/apis/getBrandDismissCount'
import { ListDismissTips } from '../../ListDismissTips'
import dayjs from 'dayjs'
import { exitBrandApply } from '@/common/apis/exitBrandApply'

export const asyncDismiss: Operation<PoiApplyListItem> = {
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
      const countRes = await getBrandDismissCount({
        poiBrandIds: [record.poiBrandId],
        actId: actId,
        operateTime: dayjs().unix(),
      })

      if (!countRes.success) {
        message.error(countRes.msg || '获取可清退数量失败')
      }

      Modal.confirm({
        title: '确认此业务品牌的门店全部清退吗?',
        centered: true,
        content: <ListDismissTips countInfo={countRes.data} />,
        cancelText: '取消',
        okText: '确认',
        async onOk() {
          if (!actId) {
            message.error('页面路径错误，缺少：activityId')
            return
          }
          if (countRes.data?.exitCount === 0) {
            message.warning('无可清退的门店')
            return
          }
          const result = await exitBrandApply({
            reason,
            actId: actId,
            poiBrandIds: [record.poiBrandId],
            operateTime: dayjs().unix(),
          })
          if (result.success) {
            message.success(result.msg || '已提交，请注意查看大象消息')
          } else {
            message.success(result.msg || '清退失败，请稍后重试')
          }
          return null
        },
      })
    }
  },
  auth: [],
}

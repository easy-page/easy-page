import { ActInfo } from '@/common/apis'
import { OperationEnum, ShowProgressBtn } from '@/common/constants'
import { Operation } from '../../../Operations'
import { showProgressDialog } from '../../../ActWorkflowProgress'
import { getShowConfig } from '../../utils'

export const actProgress: Operation<ActInfo> = {
  id: OperationEnum.Progress,
  label: '进度',
  show(context) {
    const { record } = context
    const configShow = getShowConfig((fullConfig) => {
      return fullConfig.showActProgressBtn
    })(context)

    if (!configShow) {
      return false
    }
    return (
      record?.actStatsInfo?.opConfig?.flowNode === ShowProgressBtn.SHOW &&
      record.flowNode.length > 1
    )
  },
  action({ record }) {
    showProgressDialog({ activityId: record.id })
  },
  auth: [],
}

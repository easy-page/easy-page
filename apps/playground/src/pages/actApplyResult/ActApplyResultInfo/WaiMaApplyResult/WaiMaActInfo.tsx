
import { observer } from 'mobx-react'
import { sourceApplyListModel } from '@/common'
import { ActTitle, AgreementField, Field } from '../common'

export const WaiMaActInfo = observer(() => {
  const {
    extraInfo,
  } = sourceApplyListModel.getList() || {}
  const { activityId, status, activityName, contractId, contractStatusDesc } =
  extraInfo || {}

  return (
    <div className="flex flex-col">
      <ActTitle title={activityName} status={status} />
      <Field label={'提报活动 ID'} value={activityId} />
      <AgreementField
        label={'关联协议 ID'}
        value={contractId}
        contractStatusDesc={contractStatusDesc}
      />
    </div>
  )
})

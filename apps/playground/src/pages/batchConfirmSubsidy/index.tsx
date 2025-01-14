import { observer } from 'mobx-react'
import { BaseConfirmContainer } from './components/baseContainer'
import { ConfirmActForm } from './components/confirmActForm'
import './index.less'

export const BatchConfirmSubsidy = observer(() => {
  return (
    <BaseConfirmContainer>
      <div className="flex flex-col">
        <h2>批量确认补贴</h2>
        <div className="mt-4">
          <ConfirmActForm />
        </div>
      </div>
    </BaseConfirmContainer>
  )
})

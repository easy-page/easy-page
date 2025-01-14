import { disabledMaxAmount, inputSuffix, subsidyTooltip } from './common'
import { commonContainer } from './common/commonContainer'
import { showDecorator } from './common/showDecorator'

export const mtSubsidyFieldInfo = showDecorator(
  'mtsubsidyField',
  commonContainer('mtsubsidyField', '美团补贴').appendChildren([
    subsidyTooltip('mtsubsidyField.tooltip'),
    inputSuffix('mtsubsidyField.inputSuffix'),
    disabledMaxAmount('mtsubsidyField.disabledMaxAmount'),
  ])
)

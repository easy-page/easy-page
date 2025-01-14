import { disabledMaxAmount, inputSuffix, subsidyTooltip } from './common'
import { commonContainer } from './common/commonContainer'
import { showDecorator } from './common/showDecorator'

export const merchantSubsidyFieldInfo = showDecorator(
  'merchantsubsidyField',
  commonContainer('merchantsubsidyField', '商家补贴').appendChildren([
    subsidyTooltip('merchantsubsidyField.tooltip'),
    inputSuffix('merchantsubsidyField.inputSuffix'),
    disabledMaxAmount('merchantsubsidyField.disabledMaxAmount'),
  ])
)

import { sqBaseLevelPrice } from './sqBaseLevelPrice'
import { baseOrExpandFieldContainer } from '../../baseOrExpandFieldContainer'
import { QuestionTooltip } from '@/common/components/base/QuestionTooltip'

export const sqBaseLevel = baseOrExpandFieldContainer(
  <QuestionTooltip
    tooltip="商家报名可享美团平台基础神券商家权益"
    text="基础档位"
  ></QuestionTooltip>
).appendChildren([sqBaseLevelPrice])

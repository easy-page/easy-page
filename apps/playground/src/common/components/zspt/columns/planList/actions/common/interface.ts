import { PlanInfo } from '@/common/apis'
import { OperaitonContext } from '@/common/auths'

export type PlanOpActionHandler = (
  context: OperaitonContext<PlanInfo, string, Record<string, any>>
) => void

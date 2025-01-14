import { PlanStatusEnum } from "@/common/constants"
import { SelectState } from "@easy-page/antd-ui"
import { Dayjs } from "dayjs"

export type RangeTimeState = [Dayjs, Dayjs]

export type PlanListFilterFormState = {
  ctime: RangeTimeState
  sendTime: RangeTimeState
  planStatus: SelectState<PlanStatusEnum>
  creator: string[]
  planId: string;
  planName: string;
}
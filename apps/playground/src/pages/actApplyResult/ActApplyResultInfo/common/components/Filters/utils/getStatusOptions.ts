import { MccData } from "@/common/apis"
import { toJson } from "@/common/libs"

export const getStatusOptions = (data: Partial<MccData>) => {
  const statusData = toJson(data.apply_result_status_4_poi, { defaultValue: {} })
  return Object.keys(statusData).map(e => ({
    label: statusData[e],
    value: e
  }))
}
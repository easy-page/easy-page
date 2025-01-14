/** 保存时，后端返回的活动信息 */

import { ActivityStatusEnum } from "@/common/constants"

export type SaveReturnActInfo = {
  id: number
  name: string
  templateId: number
  templateName: string
  activityStartTime: number
  activityEndTime: number
  brandApplyEndTime: number
  brandOperateAuditEndTime: number
  status: ActivityStatusEnum
  statusDesc: string
  ctime: number
  creator: string
  groupId: number
}
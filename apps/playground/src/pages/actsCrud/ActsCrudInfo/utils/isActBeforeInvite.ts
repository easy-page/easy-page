import { ActivityStatusEnum } from "@/common/constants"

export const isActBeforeInvite = (status: ActivityStatusEnum) => {
  return status && [
    ActivityStatusEnum.Creating,
    ActivityStatusEnum.Created,
    ActivityStatusEnum.Pause
  ].includes(status)
}
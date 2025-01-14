import { adminPostReq, RequestHandler } from '@/common'

export type GetActsParams = {
  templateIds: number[]
  startTime: number
  endTime: number
}

export type ActInfoItem = {
  id: number
  templateId: number
  bizLine: number
}

export const getActs: RequestHandler<GetActsParams, ActInfoItem[]> = (
  params
) => {
  const unixStartTime = Math.floor(new Date(params.startTime).getTime() / 1000)
  const unixEndTime = Math.floor(new Date(params.endTime).getTime() / 1000)

  return adminPostReq('/zspt-admin-api/zspt-datas/activities', {
    templateIds: params.templateIds,
    startTime: unixStartTime,
    endTime: unixEndTime,
  })
}

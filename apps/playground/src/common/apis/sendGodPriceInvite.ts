import { postReq, RequestHandler } from "../libs"
import { IGroup } from "./saveSgPlan/interfaces/Group"

export type SendGodPriceInviteParams = {
  planId: number
}

export type PickIGroup = Pick<IGroup, 'name' | 'businessPartition'>

export const sendGodPriceInvite: RequestHandler<SendGodPriceInviteParams, PickIGroup[]> = async (
  params
) => {
  return postReq(
    '/api/zspt/operation/plan/sendPreview',
    params
  )
}

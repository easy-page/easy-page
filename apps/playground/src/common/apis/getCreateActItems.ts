import { BizLineEnum } from "../constants"
import { postReq, RequestHandler } from "../libs";

/** 模板出现的场景，目前使用场景有：活动方案场景、活动场景 */
export enum TemplateSceneEnum {
  Plan = 'plan', // 通过方案创建活动
  Activity = 'activity', // 直接创建活动
  GodPrice = 'godprice' // 通过神价方案创建
}


export type GetCreateActItemsParams = {
  bizLine: BizLineEnum;
  scene: TemplateSceneEnum
  ignore?: boolean // 是否忽略模板列表网络请求
}

export type ActItemInfo = {
  tempId: number
  tempName: string
  tempDesc: string
}

export type GetCreateActItemsRes = ActItemInfo[]

export const getCreateActItemInfos: RequestHandler<GetCreateActItemsParams, GetCreateActItemsRes> = (params) => {
  return postReq('/api/zspt/operation/act/getTemplateList', params)
}
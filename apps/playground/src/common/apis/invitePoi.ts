

import { ActionTypeEnum, DataTypeEnum } from "../constants";
import { RequestHandler, postReq } from "../libs";


export enum SceneEnum {
  Create = 1, //活动创建人创建
  OperateAdd = 2, //运营负责人追加
  BrandAdd = 3 //品牌商追加门店
}

export type InvitePoiParams = {
  actionType: ActionTypeEnum;
  activityId: number;
  dataType: DataTypeEnum;
  inputData: string;
  inputType: number; // InputIdsWay
  scene: SceneEnum
}

export type InvitePoiRes = {
  invitationId: number;
}

export const invitePoi: RequestHandler<InvitePoiParams, InvitePoiRes> = (params) => {
  return postReq('/api/zspt/operation/invitation/invitePoi', params)
}
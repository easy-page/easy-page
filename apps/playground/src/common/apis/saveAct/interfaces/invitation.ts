import { ActionTypeEnum, DataTypeEnum, InputTypeEnum } from "@/common/constants"

// 活动邀请
export interface IInvitation {
  // 数据类型：1品牌商，2门店品牌，3门店
  dataType: DataTypeEnum
  // 录入动作：1设置，2追加, 本次为1
  actionType: ActionTypeEnum
  // 录入数据类型
  inputData?: string;
  // 录入数据方式
  inputType: InputTypeEnum
}

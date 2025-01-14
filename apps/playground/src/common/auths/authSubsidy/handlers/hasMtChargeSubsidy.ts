import { QueryResourceStatusRes, AuthResInfo } from "@/common/apis";
import { AuthTypeEnum } from "@/common/constants";


import { AuthResHandler } from "./interface";
import { applyConfirm } from "./applyConfirm";

export const getFailTips = ({ directChargeRes, agentChargeRes }: {
  directChargeRes?: AuthResInfo,
  agentChargeRes?: AuthResInfo
}) => {
  const noDirectCharge = directChargeRes && !directChargeRes.status;
  const noAgentCharge = agentChargeRes && !agentChargeRes.status;

  if (noDirectCharge && noAgentCharge) {
    return '当前无直营门店美补、代理门店美补权限，无法操作；请申请“直营店美补-折扣活动”、“代理商美补-折扣活动”权限';
  }
  if (noDirectCharge) {
    return '当前无直营门店美补权限，无法操作；请申请“直营店美补-折扣活动”权限';
  }
  if (noAgentCharge) {
    return '当前无代理门店美补权限，无法操作；请申请“代理商美补-折扣活动”权限';
  }
  return '';
}



export const hasMtChargeSubsidy: AuthResHandler = (data: QueryResourceStatusRes) => {
  const directCharge = data.find(
    (item: AuthResInfo) => item.resourceId === AuthTypeEnum.DirectMtCharge
  )
  const agentCharge = data.find(
    (item: AuthResInfo) => item.resourceId === AuthTypeEnum.AgentMtCharge
  )
  if (!directCharge || !agentCharge) {
    // 传了校验的：resourceId，但是未返回这两个校验结果，表示不需要对其做权限判断，默认为：true
    return true;
  }
  const failTips = getFailTips({ directChargeRes: directCharge, agentChargeRes: agentCharge });
  if (!failTips) {
    return true;
  }
  applyConfirm(failTips);
  return false;
}

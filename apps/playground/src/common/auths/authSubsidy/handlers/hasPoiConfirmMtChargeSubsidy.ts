import { QueryResourceStatusRes, AuthResInfo } from "@/common/apis";
import { ApplyChargeCodeEnum, AuthTypeEnum } from "@/common/constants";
import { AuthResHandler } from "./interface";
import { applyConfirm } from "./applyConfirm";

export const hasPoiConfirmMtChargeSubsidy: AuthResHandler = (data: QueryResourceStatusRes) => {
  const resourceObj = data.find((item: AuthResInfo) => item.resourceId == AuthTypeEnum.PoiConfirmMtCharge);
  if (resourceObj.status) {
    return true;
  }
  applyConfirm(`本活动为品牌和美补共补活动,需先申请“统一招商平台-合作运营确认美补”权限，再操作!`, { authCode: ApplyChargeCodeEnum.UniteBrandChargeCode })
  return false;
}

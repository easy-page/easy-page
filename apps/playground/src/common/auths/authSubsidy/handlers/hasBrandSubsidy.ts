import { QueryResourceStatusRes, AuthResInfo } from "@/common/apis";
import { AuthTypeEnum } from "@/common/constants";
import { AuthResHandler } from "./interface";
import { applyConfirm } from "./applyConfirm";

export const hasBrandSubsidy: AuthResHandler = (res: QueryResourceStatusRes) => {
  const resourceObj = res.find(
    (item: AuthResInfo) => item.resourceId === AuthTypeEnum.BrandCharge
  )
  if (!resourceObj) {
    // 有权限
    return true;
  }
  const hasAuth = Boolean(resourceObj && resourceObj.status)
  if (!hasAuth) {
    applyConfirm('当前无品牌补贴权限，无法操作；请申请“品牌补贴-商品券”权限。');
  }
  return hasAuth;
}

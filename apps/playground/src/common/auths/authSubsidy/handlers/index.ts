import { CheckSubsidyItem } from "@/common/constants";
import { hasBrandSubsidy } from "./hasBrandSubsidy";
import { hasMtChargeSubsidy } from "./hasMtChargeSubsidy";
import { AuthResHandler } from "./interface";
import { hasPoiConfirmMtChargeSubsidy } from "./hasPoiConfirmMtChargeSubsidy";

export const CheckHandlers: Record<CheckSubsidyItem, AuthResHandler> = {
  [CheckSubsidyItem.CheckBrandChargeAuth]: hasBrandSubsidy,
  [CheckSubsidyItem.CheckMtChargeAuth]: hasMtChargeSubsidy,
  [CheckSubsidyItem.CheckPoiConfirmMtChargeAuth]: hasPoiConfirmMtChargeSubsidy
};

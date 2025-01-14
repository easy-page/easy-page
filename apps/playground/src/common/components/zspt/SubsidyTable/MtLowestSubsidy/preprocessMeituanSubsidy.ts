import { SubsidyRule, SubsidyLevelEnum } from "@/common/apis";
import { SubsidyConditionKeyEnum } from "@/common/constants";

export type MtLowestSubsidyRecord = {
  meituanSubsidyPrice: string;
  merchantRequestPrice: string;
}

export const preprocessMeituanSubsidy = (subsidyRule: SubsidyRule[]): MtLowestSubsidyRecord[] => {
  const defaultValue = []
  if (!subsidyRule) {
    return defaultValue
  }
  const expandLevel = subsidyRule.find(e => e.scene === SubsidyLevelEnum.Expand)
  if (!expandLevel) {
    return defaultValue;
  }
  // 商家最高补贴表格
  const rules = (expandLevel.rule || []).filter(e => e.condition.key === SubsidyConditionKeyEnum.ScChargeSidePoi);

  return rules.map(each => ({
    meituanSubsidyPrice: each.charge?.[0]?.minValue,
    merchantRequestPrice: each.condition?.minValue,
  }))
}
import { SubsidyRuleDetail, SubsidyCondition, SubsidyConditionKeyEnum, SubsidyOptEnum } from "@/common";

// 将多个时段合并成 1 个时段结构
export const postprocessPeriod = (childForms: SubsidyRuleDetail[]) => {
  const newChildForms: SubsidyRuleDetail[] = [];
  const curPeriod: SubsidyRuleDetail = {
    condition: { key: SubsidyConditionKeyEnum.ScPeriod, opt: SubsidyOptEnum.In, minValue: "", maxValue: "" },
    charge: []
  }
  childForms.forEach(each => {
    if (!each.condition) {
      return;
    }
    if (each.condition.key !== SubsidyConditionKeyEnum.ScPeriod) {
      newChildForms.push(each);
    } else {
      curPeriod.condition.minValue = curPeriod.condition.minValue ? curPeriod.condition.minValue + ',' + each.condition.minValue : each.condition.minValue;
      if ((each.charge || []).length > 0) {
        curPeriod.charge = [...curPeriod.charge, ...each.charge];
      }
    }
  })
  if (curPeriod.charge.length > 0) {
    newChildForms.push(curPeriod)
  }
  return newChildForms
}

/** 将一个 period 拆分成多行 */
export const preprocessPeriod = (periodLine?: SubsidyRuleDetail): SubsidyRuleDetail[] => {
  if (!periodLine) {
    return []
  }
  const periodLines = periodLine.condition.minValue.split(',');
  return periodLines.map((e, idx) => ({
    condition: { key: SubsidyConditionKeyEnum.ScPeriod, opt: SubsidyOptEnum.In, minValue: e, maxValue: "" },
    charge: idx === 0 ? periodLine.charge : []
  }))
}
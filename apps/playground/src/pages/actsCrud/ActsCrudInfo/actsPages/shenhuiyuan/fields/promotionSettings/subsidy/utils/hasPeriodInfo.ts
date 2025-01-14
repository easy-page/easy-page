/** 
 * - 判断下是否存在时段信息
 */

import { ChildFormState } from "@easy-page/antd-ui";
import { RuleTableFormState } from "../subsidyRuleTable/interface";
import { RangeState } from "@/common/fields";


const hasRangeVal = (range: RangeState) => {
  return Boolean(range?.min) || Boolean(range?.max);
}

export const hasPeriodInfo = (ruleTable: ChildFormState<RuleTableFormState>) => {
  const formDatas = Object.values(ruleTable.formUtils || {}).map(e => e.getOriginFormData());
  return formDatas.some(each => {
    if (!each) {
      return false;
    }
    const isPeriodField = Object.keys(each || {}).includes('period');
    const hasPeriodTimeInfo = Boolean(each.period?.[0]) || Boolean(each.period?.[1])
    const hasPeriodPriceInfo = isPeriodField && (hasPeriodTimeInfo || hasRangeVal(each.chargeSideAgent) || hasRangeVal(each.chargeSideMtb) || hasRangeVal(each.chargeSidePoi))
    return hasPeriodPriceInfo
  })
}
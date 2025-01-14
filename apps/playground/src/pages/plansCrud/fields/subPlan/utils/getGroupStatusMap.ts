import { SubMarketingPlanStatus } from "@/common";

export const getGroupStatusMap = (childFormDefaultValues: Record<string, Record<string, any>>) => {
  const result: Record<string, SubMarketingPlanStatus> = {};
  Object.keys(childFormDefaultValues).forEach(each => {
    result[each] = childFormDefaultValues?.[each]?.groupStatus || SubMarketingPlanStatus.ToStart;
  })
  return result;
}
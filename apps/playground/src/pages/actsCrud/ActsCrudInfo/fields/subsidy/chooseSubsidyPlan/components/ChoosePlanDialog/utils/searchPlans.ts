import { GetSubsidyRuleList4PlanResult } from "@/common";

export const searchPlans = ({ keyword, plans }: {
  keyword: string;
  plans: GetSubsidyRuleList4PlanResult
}) => {
  const result: GetSubsidyRuleList4PlanResult = []
  if (!keyword) {
    return plans;
  }
  plans.forEach(e => {

    if (e.name.includes(keyword)) {
      result.push(e);
      return;
    }
    const filtedChildren = (e.group || []).filter(i => i.name.includes(keyword));
    if (filtedChildren.length > 0) {
      result.push({
        ...e,
        group: filtedChildren
      })
    }
  })
  return result;
}
import { subPlanBaseInfoContainer } from "@/pages/plansCrud/fields";
import { subPlanName, userGroup } from "@/pages/plansCrud/fields/subPlan";

export const subPlanBaseInfo = subPlanBaseInfoContainer().appendChildren([
  subPlanName,
  userGroup
])
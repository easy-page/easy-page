
import { SubsidyRuleList4Plan } from "../apis";
import { ListModel } from "./base/list";
import { Empty } from "@easy-page/antd-ui";


export const subsidyList4PlanModel = new ListModel<SubsidyRuleList4Plan, Empty>({
  defaultFilters: {
  },
  disablePage: true
})

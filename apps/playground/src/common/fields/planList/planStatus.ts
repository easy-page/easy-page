import { PlanStatusEnum, PLAN_STATUS_OPTIONS, ALL } from "@/common/constants";
import { nodeUtil, SelectState, UI_COMPONENTS } from "@easy-page/antd-ui";

export const planStatus = nodeUtil.createField<SelectState<PlanStatusEnum>>(
  'planStatus',
  '方案状态',
  {
    value: { choosed: ALL as PlanStatusEnum },
    mode: 'single',
    preprocess({ defaultValues }) {
      return {
        choosed: defaultValues.planStatus,
        options: PLAN_STATUS_OPTIONS,
      }
    },
    postprocess: ({ value }) => {
      return {
        planStatus: value.choosed || ALL as PlanStatusEnum,

      }
    },
  },
  {
    ui: UI_COMPONENTS.SELECT,
    select: {

    },
  },
);

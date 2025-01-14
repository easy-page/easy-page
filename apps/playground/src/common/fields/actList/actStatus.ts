import { ACTIVITY_STATUS_OPTIONS, ALL, ActivityStatusEnum } from "@/common/constants";
import { nodeUtil, SelectState, UI_COMPONENTS } from "@easy-page/antd-ui";

export const actStatus = nodeUtil.createField<SelectState<ActivityStatusEnum>>(
  'activityStatus',
  '活动状态',
  {
    value: {
      choosed: ALL as ActivityStatusEnum,
    },
    mode: 'single',
    postprocess: ({ value }) => {
      return {
        activityStatus: value.choosed
      }
    },
    preprocess: ({ defaultValues }) => {
      return {
        choosed: defaultValues['activityStatus'],
        options: ACTIVITY_STATUS_OPTIONS
      }
    }
  },
  {
    ui: UI_COMPONENTS.SELECT,
    select: {

    },
  }
);



import {
  ALL,
  ACTIVITY_CONFIRM_STATUS_OPTIONS,
  ActivityConfirmStatusEnum,
} from '@/common/constants'
import { nodeUtil, SelectState, UI_COMPONENTS } from '@easy-page/antd-ui'

export const activityConfirmStatus = nodeUtil.createField<
  SelectState<ActivityConfirmStatusEnum>
>(
  'activityConfirmStatus',
  '确认状态',
  {
    value: { choosed: ALL as ActivityConfirmStatusEnum },
    mode: 'single',
    preprocess({ defaultValues }) {
      return {
        choosed:
          defaultValues.activityConfirmStatus ||
          (ALL as ActivityConfirmStatusEnum),
        options: ACTIVITY_CONFIRM_STATUS_OPTIONS,
      }
    },
    postprocess: ({ value }) => {
      return {
        activityConfirmStatus:
          value.choosed || (ALL as ActivityConfirmStatusEnum),
      }
    },
  },
  {
    ui: UI_COMPONENTS.SELECT,
    select: {},
  }
)

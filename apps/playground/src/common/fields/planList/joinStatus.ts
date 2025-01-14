import {
  ALL,
  PlanJoinStatusEnum,
  PLAN_JOIN_STATUS_OPTIONS,
} from '@/common/constants'
import { nodeUtil, SelectState, UI_COMPONENTS } from '@easy-page/antd-ui'

export const joinStatus = nodeUtil.createField<SelectState<PlanJoinStatusEnum>>(
  'joinStatus',
  '加入状态',
  {
    value: { choosed: ALL as PlanJoinStatusEnum },
    mode: 'single',
    preprocess({ defaultValues }) {
      return {
        choosed: defaultValues.joinStatus ?? (ALL as PlanJoinStatusEnum),
        options: PLAN_JOIN_STATUS_OPTIONS,
      }
    },
    postprocess: ({ value }) => {
      return {
        joinStatus: value.choosed,
      }
    },
  },
  {
    ui: UI_COMPONENTS.SELECT,
    select: {},
  }
)

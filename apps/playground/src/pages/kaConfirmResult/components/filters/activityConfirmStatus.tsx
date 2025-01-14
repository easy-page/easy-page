import {
  SelectEffectType,
  SelectState,
  UI_COMPONENTS,
  nodeUtil,
} from '@easy-page/antd-ui'
import { SearchRuleId } from './constant'
import { ConfirmStatusOptions } from '@/common/apis/getBatchConfirmActList'
import {
  ActivityConfirmStatusEnum,
  ACTIVITY_CONFIRM_STATUS_OPTIONS,
  getQueryNumber,
} from '@/common'

const ALL = -1
// TODO @oujie：确认一下这个组件是单选还是多选
export const activityConfirmStatus = nodeUtil.createField<
  SelectState<ActivityConfirmStatusEnum>
>(
  SearchRuleId.ActivityConfirmStatus,
  '提报活动确认状态',
  {
    value: { choosed: ALL as ActivityConfirmStatusEnum },
    mode: 'single',
    preprocess({ defaultValues }) {
      const activityConfirmStatus = getQueryNumber('activityConfirmStatus')

      return {
        choosed: activityConfirmStatus || (ALL as ActivityConfirmStatusEnum),
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

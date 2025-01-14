import { nodeUtil } from "@easy-page/antd-ui";
import { planId } from "../planList/planId";

export const actId = nodeUtil.extends(planId, {
  id: 'activityId',
  name: '活动 ID',
  postprocess() {
    return ({ value }) => {
      return {
        activityId: value ? Number(value) : undefined,
      }
    }
  },
  preprocess: () => {
    return ({ defaultValues }) => {
      const activityId = defaultValues?.activityId
      return activityId ? `${activityId}` : ''
    }
  }
})





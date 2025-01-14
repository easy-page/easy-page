import { nodeUtil, SelectState, UI_COMPONENTS } from '@easy-page/antd-ui'
import {
  PlanTypeEnum,
  ALL,
  PLAN_TYPE_OPTIONS,
  BizLineEnum,
  WM_PLAN_TYPE_OPTIONS,
  OPTION_ALL,
} from '@/common/constants'
import { getBizLine } from '@/common/libs'
import { roleManager } from '@/common/roles'
import { userModel } from '@/common/models'
import { roleAndCrudPlanMap } from '@/common/roles/mappings/crudPlanMap'

export const planType = nodeUtil.createField<SelectState<PlanTypeEnum>>(
  'planType',
  '方案类型',
  {
    value: { choosed: ALL as PlanTypeEnum },
    mode: 'single',
    preprocess({ defaultValues }) {
      const bizLine = getBizLine()
      // const { data: userInfo } = userModel.getData()
      // const resources = roleManager.getResources(roleAndCrudPlanMap, {
      //   userInfo,
      //   bizLine,
      // })
      // const planTypeText =
      //   bizLine === BizLineEnum.ShanGou
      //     ? PLAN_TYPE_OPTIONS
      //     : WM_PLAN_TYPE_OPTIONS
      return {
        choosed: defaultValues.planStatus, // todo
        options:
          bizLine === BizLineEnum.ShanGou
            ? PLAN_TYPE_OPTIONS
            : WM_PLAN_TYPE_OPTIONS,
      }
    },
    postprocess: ({ value }) => {
      return {
        planType: value.choosed ?? (ALL as PlanTypeEnum),
      }
    },
  },
  {
    ui: UI_COMPONENTS.SELECT,
    select: {},
  }
)

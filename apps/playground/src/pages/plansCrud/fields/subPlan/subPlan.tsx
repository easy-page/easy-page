import {
  ChildFormItem,
  generateId,
  nodeUtil,
  validateAllChildForm,
} from '@easy-page/antd-ui'
import { GetPlanDetailResult, SubMarketingPlan } from '@/common'
import { CommonPlanFormProps, CommonPlanFormState } from '../interface'

import {
  DEFAULT_SUB_PLAN_INFO,
  SubPlanContainer,
  SubPlanState,
  subPlanDefaultId,
  subPlanFormPrefix,
} from './components'
import { SubPlanFormComponent } from './interface'

export const subPlan = (formComponent: SubPlanFormComponent) =>
  nodeUtil.createChildForm<
    SubPlanState,
    CommonPlanFormState,
    CommonPlanFormProps
  >(
    'subPlan',
    {
      value: DEFAULT_SUB_PLAN_INFO,
      postprocess({ value }) {
        const childForms = Object.values(value.formUtils || {}).map((e) =>
          e.getFormData()
        )
        return { group: childForms }
      },
      preprocess({ defaultValues }) {
        const detail = (defaultValues || {}) as Partial<GetPlanDetailResult>

        const childFormDefaultValues: Record<string, SubMarketingPlan> = {}

        let childFormItems: ChildFormItem[] = (detail.group || []).map(
          (each) => {
            const id = generateId(subPlanFormPrefix)
            childFormDefaultValues[id] = each
            return {
              id,
              label: each.name,
            }
          }
        )
        if (childFormItems.length === 0) {
          childFormItems = [{ id: subPlanDefaultId, label: '' }]
        }
        const firstId = childFormItems?.[0]?.id
        return {
          choosedItemId: firstId,
          childForms: childFormItems,
          childFormDefaultValues,
        }
      },
      validate: async ({ value, onChange }) => {
        const results = await validateAllChildForm(value, { onChange })
        const hasError = results.find((e) => Boolean(e.errors))
        return { success: !hasError }
      },
      childFormContext: ['maxSubPlanCount', 'maxExpandLevelMcc', 'subPlan'],
      childFormContainer: (props) => (
        <SubPlanContainer formComponent={formComponent} {...props} />
      ),
    },
    {
      childForm: {
        childFormIdPrefix: subPlanFormPrefix,
      },
      formItem: {
        className: '',
        wrapperCol: { span: 24 },
      },
    }
  )

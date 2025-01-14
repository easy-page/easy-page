import { generateId, nodeUtil, validateAllChildForm } from '@easy-page/antd-ui'
import { SubMarketingPlan, TableHeader } from '@/common'
import { MeituanLowestSubsidyForm } from './meituanLowestSubsidyForm'
import { MeituanLowestSubsidyContainerState } from './merchantMaxSubsidyForm/interface'
import { postprocessMeituanSubsidy } from './utils/meituanSubsidy'
import {
  MeituanLowestPrefix,
  handleMerchantMaxSubsidyChange,
} from './actions/meituanLowestSubisdyAction'
import { CommonSubPlanFormProps, CommonSubPlanFormState } from '../subPlan'

const DEFAULT_VALUE = {
  childForms: [],
  choosedItemId: undefined,
}

export const meituanLowestSubsidyForm = nodeUtil.createChildForm<
  MeituanLowestSubsidyContainerState,
  CommonSubPlanFormState,
  CommonSubPlanFormProps
>(
  'meituanLowestSubsidy',
  {
    name: '美团最低补贴',
    required: true,
    value: DEFAULT_VALUE,
    childFormContext: [],
    actions: [
      {
        effectedKeys: ['merchantMaxSubsidy'],
        initRun: true,
        action: handleMerchantMaxSubsidyChange,
      },
    ],
    validate: async ({ value, onChange }) => {
      const results = await validateAllChildForm(value, { onChange })
      const hasError = results.find((e) => Boolean(e.errors))
      return { success: !hasError }
    },
    postprocess({ value, processedFormData }) {
      const subsidyRule = processedFormData.subsidyRule || []
      const result = Object.values(value?.formUtils || {}).map((e) =>
        e.getFormData()
      )

      return {
        subsidyRule: postprocessMeituanSubsidy(subsidyRule, result),
      }
    },

    childFormContainer: (props) => {
      const { value, disabled } = props as any

      const { childForms } = value
      return (
        <div className="flex flex-col">
          <div className="grid grid-cols-2 gap-4 bg-[#F5F5F6] py-2 px-4 min-w-[800px]">
            <TableHeader
              className="col-span-1"
              extra="0~20，支持0.5结尾的一位小数"
              required
              tooltip="指商家的A出资，不包含差异化商补；满X元指大于等于X元。"
              name="商家实际补贴(元)"
            />
            <TableHeader
              className="col-span-1"
              extra="0~20，支持0.5结尾的一位小数"
              required
              name="美团最低补贴(元)"
            />
          </div>
          {childForms.map((each, idx) => (
            <MeituanLowestSubsidyForm
              formIndex={idx}
              formId={each.id}
              disabledAll={disabled}
              {...props}
              key={each.id}
            />
          ))}
        </div>
      )
    },
  },
  {
    childForm: {
      childFormIdPrefix: MeituanLowestPrefix,
    },

    formItem: {
      wrapperCol: { span: 9 },
    },
  }
)

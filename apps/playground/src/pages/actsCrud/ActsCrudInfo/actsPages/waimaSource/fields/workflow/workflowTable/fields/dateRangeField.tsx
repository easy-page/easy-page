import { nodeUtil, WhenType } from '@easy-page/antd-ui'
import { WmsActFormState, WmsActFormProps } from '../../../../interface'
import { ToolbarProps } from '@/common/fields'

export const dateRangeField = (
  id: string,
  options?: {
    when: WhenType<string, WmsActFormState, ToolbarProps>
  }
) =>
  nodeUtil.createContainer<WmsActFormState, WmsActFormProps>(
    `dateRangeField_${id}`,
    ({ children }) => {
      return (
        <div className="grid grid-cols-12 gap-8 py-2 px-4 workflow-table-form  workflow-table-form-border-b min-w-[900px]">
          {children}
        </div>
      )
    },
    {
      when: options?.when || undefined,
    }
  )

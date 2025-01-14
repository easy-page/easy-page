import { EmploySearch } from '@/common/components'
import { nodeUtil } from '@easy-page/antd-ui'

export const singleMisChooseField = (id: string, label: string) =>
  nodeUtil.createCustomField(
    id,
    label,
    ({ value, onChange, disabled }) => {
      return (
        <EmploySearch
          allowClear={true}
          mode="multiple"
          disabled={disabled}
          className="w-full"
          onClear={() => {
            onChange([])
          }}
          value={value}
          placeholder="请输入 mis 号"
          onChange={onChange}
        />
      )
    },
    {
      value: [],
      preprocess({ defaultValues }) {
        const creator = defaultValues?.[id]
        if (creator) {
          return [creator]
        }
        return []
      },
      postprocess({ value }) {
        if (!value || value.length === 0) {
          return {
            [id]: undefined,
          }
        }
        return {
          [id]: value[0],
        }
      },
    }
  )

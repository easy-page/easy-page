import { EmploySearch } from '@/common/components'
import { nodeUtil } from '@easy-page/antd-ui'

export const commonAuth = (id: string, label: string, submitId: string) =>
  nodeUtil.createCustomField<string[]>(
    id,
    label,
    ({ value, onChange }) => {
      return (
        <EmploySearch
          allowClear={false}
          mode="tags"
          onClear={() => onChange([])}
          className="w-full"
          value={value}
          placeholder="请输入被授权mis号，多个mis之间使用英文逗号隔开"
          onChange={onChange}
        />
      )
    },
    {
      value: [],
      preprocess({ defaultValues }) {
        const data = defaultValues?.[submitId]
        if (data) {
          return data.split(',')
        }
        return []
      },
      postprocess: ({ value }) => {
        return {
          [submitId]: value.join(','),
        }
      },
    }
  )

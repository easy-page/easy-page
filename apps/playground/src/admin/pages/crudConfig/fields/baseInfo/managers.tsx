import { EmploySearch } from '@/common'
import { nodeUtil } from '@easy-page/antd-ui'

export const managers = nodeUtil.createCustomField<string[]>(
  'managers',
  '管理员',
  ({ value, onChange }) => {
    return (
      <EmploySearch
        allowClear={false}
        mode="tags"
        onClear={() => onChange([])}
        className="w-full"
        value={value}
        placeholder="请输入 mis 号，多个mis之间使用英文逗号隔开"
        onChange={onChange}
      />
    )
  },
  {
    value: [],
    preprocess({ defaultValues }) {
      const data = defaultValues?.['managers']
      if (data) {
        return data.split(',')
      }
      return []
    },
    postprocess: ({ value }) => {
      return {
        managers: value.join(','),
      }
    },
  }
)

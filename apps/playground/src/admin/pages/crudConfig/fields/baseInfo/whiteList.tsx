import { nodeUtil } from '@easy-page/antd-ui'
import { managers } from './managers'
import { EmploySearch } from '@/common'

export const whiteList = nodeUtil.createCustomField<string[]>(
  'whiteList',
  '白名单',
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
      console.log('defaultValuesdefaultValues:', defaultValues)
      const data = defaultValues?.['whiteList'] as string
      if (data) {
        return data.split(',').filter((x) => Boolean(x))
      }
      return []
    },
    postprocess: ({ value }) => {
      return {
        whiteList: value && value.length > 0 ? value.join(',') : '',
      }
    },
  },
  {
    formItem: {
      extra: '配置后，则只对白名单用户生效，否则发布后对全量用户生效',
    },
  }
)

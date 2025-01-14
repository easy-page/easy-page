import { nodeUtil } from '@easy-page/antd-ui'
import { Button } from 'antd'

export const refreshConfig = nodeUtil.createCustomField<number>(
  'refreshConfig',
  '',
  ({ onChange }) => {
    return (
      <Button
        onClick={() => {
          onChange(new Date().getTime())
        }}
      >
        刷新配置到预览
      </Button>
    )
  },
  {
    postprocess() {
      return {}
    },
  }
)

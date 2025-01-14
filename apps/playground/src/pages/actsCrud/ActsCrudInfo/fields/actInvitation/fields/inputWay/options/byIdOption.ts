import { InputTypeEnum } from '@/common'
import { nodeUtil } from '@easy-page/antd-ui'

export const byIdOption = () =>
  nodeUtil.createNode(`${InputTypeEnum.ManualEntry}`, { name: '录入 ID' })

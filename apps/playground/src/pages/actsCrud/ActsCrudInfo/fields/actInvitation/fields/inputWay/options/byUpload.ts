import { InputTypeEnum } from '@/common'
import { nodeUtil } from '@easy-page/antd-ui'

export const byUpload = () =>
  nodeUtil.createNode(`${InputTypeEnum.File}`, { name: '上传 xls/xlsx' })

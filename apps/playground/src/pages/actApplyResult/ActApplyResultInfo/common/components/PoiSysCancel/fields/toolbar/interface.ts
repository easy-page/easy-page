import { SubmitType } from '@/common/constants'
import { FormUtil } from '@easy-page/antd-ui'

export type ToolbarProps = {
  onCancel: () => void
  onSubmit: (
    data: Record<string, any>,
    options: {
      formUtil: FormUtil<Record<string, any>>
      submitType?: SubmitType
    }
  ) => Promise<void> // 返回 promise 做 loading 使用
}

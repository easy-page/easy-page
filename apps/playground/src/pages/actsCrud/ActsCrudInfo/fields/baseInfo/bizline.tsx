import { BizLineEnum } from '@/common'
import { nodeUtil } from '@easy-page/antd-ui'

export const bizline = (bizline: BizLineEnum) =>
  nodeUtil.createCustomField<number>(
    'bizLine',
    '',
    () => {
      return <></>
    },
    {
      value: bizline,
    },
    {
      formItem: {
        noStyle: true,
        className: 'mb-0',
      },
    }
  )

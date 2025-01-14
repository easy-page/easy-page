import { nodeUtil } from '@easy-page/antd-ui'

export const submitVersion = nodeUtil.createCustomField(
  'submitVersion',
  '',
  () => {
    return <></>
  },
  {
    postprocess() {
      return {}
    },
    value: new Date().getTime(),
  }
)

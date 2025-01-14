import { nodeUtil } from '@easy-page/antd-ui'
import { SubActPnLoadState } from './interface'

/**
 * - subActPnLoadState 存储每个子活动下的 pn 的 ref 是否挂在完毕
 * - 只有所有 pn 挂在完毕的前提条件下，才允许计算 pn 下啦选项
 * - 性能优化
 */
export const subActPnLoadState = nodeUtil.createCustomField<SubActPnLoadState>(
  'subActPnLoadState',
  '',
  () => {
    return <></>
  },
  {
    postprocess() {
      return {}
    },
    value: {},
  },
  {
    formItem: {
      noStyle: true,
      className: 'mb-0',
    },
  }
)

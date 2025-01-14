import { nodeUtil } from '@easy-page/antd-ui'
import { poiList } from './common'

export const shyPoiListOfSettings = nodeUtil.extends(poiList(), {
  when: () => {
    return {
      show: () => true,
    }
  },
})

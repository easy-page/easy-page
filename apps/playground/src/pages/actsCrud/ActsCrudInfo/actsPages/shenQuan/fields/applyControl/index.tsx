import {
  applyControlContainer,
  shenquanCancancelAct,
  shenquanCanEditAct,
  shenquanNeedAuditRes,
} from '@/pages/actsCrud/ActsCrudInfo/fields'
import { nodeUtil } from '@easy-page/antd-ui'

export const applyControl = applyControlContainer().appendChildren([
  shenquanCancancelAct,
  shenquanCanEditAct,
  shenquanNeedAuditRes,
])


export const shenquanApplyRole = nodeUtil.createCustomField(
  'applyControl.canApply',
  '',
  () => {
    return <></>
  },
  {
    value: ['poi'],
    postprocess({ value }) {
      if (!value) {
        return {}
      }
      console.log('recordInfoField', value)
      return {
        'applyControl.canApply': value,
      }
    },
  },
  {
    formItem: {
      noStyle: true,
      className: 'mb-0',
    },
  }
)

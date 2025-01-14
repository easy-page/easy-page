import { nodeUtil, UI_COMPONENTS } from '@easy-page/antd-ui'
import { PoiSysCancelFormState } from '../interface'
import { CheckAndReturnEnum } from '../constant'
const MAX_ID_COUNT = 5000
export const poiId = nodeUtil.createField<string, PoiSysCancelFormState>(
  'poiIds',
  '录入清退门店',
  {
    value: '',
    required: true,
    when: {
      effectedKeys: ['isAllSelect'],
      show({ effectedData }) {
        return effectedData['isAllSelect'] !== CheckAndReturnEnum.All
      },
    },
    postprocess({ value }) {
      return {
        poiIds: value.split(','),
      }
    },
    validate: ({ value }) => {
      if (!value) {
        return {
          success: false,
          errorMsg: '请输入正确的门店ID，多个ID之间使用英文逗号隔开',
        }
      }
      const ids = value.split(',')
      if (!/^(\d+,)*\d+$/.test(value)) {
        return {
          success: false,
          errorMsg: '请输入正确的门店ID，多个ID之间使用英文逗号隔开',
        }
      }
      if (ids.length > MAX_ID_COUNT) {
        return {
          success: false,
          errorMsg: `最多只能输入${MAX_ID_COUNT}个门店ID`,
        }
      }
      return { success: true }
    },
  },
  {
    ui: UI_COMPONENTS.TEXTAREA,
    textArea: {
      placeholder: `请输入门店ID，多个ID之间使用英文逗号隔开，最多支持${MAX_ID_COUNT}个`,
      rows: 5,
    },
  }
)

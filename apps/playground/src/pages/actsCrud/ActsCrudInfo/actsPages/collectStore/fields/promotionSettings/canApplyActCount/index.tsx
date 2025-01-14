import { isEdit } from '@/common'
import {
  applyActMaxCount,
  applyActMinCount,
  baseCanApplyActCount,
} from '@/pages/actsCrud/ActsCrudInfo/fields'
import { nodeUtil } from '@easy-page/antd-ui'
import { set } from 'lodash'

import { csApplyActRestrict } from './applyActRestrice'

export const csCanApplyActCount = nodeUtil.extends(
  baseCanApplyActCount().appendChildren([
    csApplyActRestrict,
    applyActMinCount,
    applyActMaxCount,
  ]),
  {
    name: '商家可报名子活动数',
    postprocess: () => {
      return ({ defaultValues }) => {
        return {
          subActivity: [
            {
              order: 0,
              name: 'default',
              id: isEdit() ? defaultValues?.subActivity?.[0]?.id : null,
              validationRule: {
                enterMin: 1,
                enterMax: -1,
              },
            },
          ],
          'applyControl.subactivityRule': {
            enterMin: 1,
            enterMax: -1,
          },
        }
      }
    },
    fieldUIConfig(oldFieldUIConfig) {
      const newConfig = oldFieldUIConfig || {}
      set(
        newConfig,
        'formItem.tooltip',
        '文件上传里的每行EXCEL规则是一条子活动'
      )
      set(newConfig, 'formItem.customExtra', null)
      return newConfig
    },
  }
)

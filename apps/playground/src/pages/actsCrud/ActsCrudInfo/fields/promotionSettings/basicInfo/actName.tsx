import { hasDuplicateElements, isEmptyStr, validateStr } from '@/common'

import { nodeUtil } from '@easy-page/antd-ui'
import {
  CommonActCrudFormState,
  CommonSubActPageProps,
  CommonSubActPageState,
} from '../../interface'

const MAX_LENGTH = 20

export const subActPromotionName = (placeholder = '展示在商家端，简要说明品类或者规格等要求') =>
  nodeUtil.createField<string, CommonSubActPageState, CommonSubActPageProps>(
    'name',
    '优惠活动名称',
    {
      required: true,
      preprocess({ defaultValues }) {
        return defaultValues['name'] || ''
      },
      validate: ({ value, pageProps }) => {
        const parentFormUtil = pageProps.getFormUtil?.()

        if (isEmptyStr(value)) {
          return { success: false, errorMsg: '请输入优惠活动名称' }
        }
        if (value.length > MAX_LENGTH) {
          return { success: false, errorMsg: `最多 ${MAX_LENGTH} 个字` }
        }
        if (!validateStr(value)) {
          return {
            success: false,
            errorMsg: '除表情字符外，汉字、英文、特殊字符等均支持输入。',
          }
        }
        if (!parentFormUtil) {
          return { success: true }
        }
        const { subActivity } = parentFormUtil.getOriginFormData()
        const formUtils = subActivity?.formUtils || {}
        // 验证是否重名
        const childFormActNames = Object.values(formUtils).map((e) =>
          e.getFieldValue('name')
        )

        /** 存在重名称且与当前重名才提示 */
        if (
          hasDuplicateElements(childFormActNames) &&
          childFormActNames.filter((x) => x === value)?.length > 1
        ) {
          return {
            success: false,
            errorMsg:
              '同一提报活动内优惠活动名称不可重复，该名称已存在，请重新设置',
          }
        }

        return { success: true }
      },
    },
    {
      input: {
        // placeholder: '展示在报名端，简要说明报名、优惠或品类要求。',
        placeholder: placeholder,
        allowClear: true,
        className: 'w-1/2',
        trigger: 'onBlur',
      },
    }
  )

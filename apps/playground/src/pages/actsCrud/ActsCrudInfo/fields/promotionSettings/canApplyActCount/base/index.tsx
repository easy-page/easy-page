import { nodeUtil } from '@easy-page/antd-ui'
import { toNumber } from 'lodash'
import {
  CommonActCrudFormState,
  CommonActCrudFormProps,
} from '../../../interface'
import { CanApplyActLimit } from '../fields'
import {
  DEFAULT_APPLY_ACT_MIN_LIMIT,
  DEFAULT_APPLY_ACT_MAX_LIMIT,
} from '../lib/constant'

export const baseCanApplyActCount = () =>
  nodeUtil.createCustomField<
    any,
    CommonActCrudFormState,
    CommonActCrudFormProps
  >(
    'can-apply-settings',
    '可报名优惠活动数',
    ({ children }) => {
      return <div className="flex flex-row">{children}</div>
    },
    {
      postprocess() {
        return {}
      },
      required: true,
      effectedKeys: [
        'subactivityRule.isRestrict',
        'subactivityRule.enterMax',
        'mccSubActMaxCount',
      ],
    },
    {
      layout: { disableLayout: true },
      formItem: {
        customExtra: ({ frameworkProps: { store } }) => {
          const pageData = store.getAllState() as CommonActCrudFormState
          const pageProps = store.getPageProps() as CommonActCrudFormProps
          const isRestrict =
            pageData['subactivityRule.isRestrict']?.choosed ===
            CanApplyActLimit.Limit
          const mccMax = pageProps['mccSubActMaxCount']
          const enterMax = toNumber(pageData['subactivityRule.enterMax'])
          const enterMin = toNumber(pageData['subactivityRule.enterMin'])

          const min = !isRestrict || !enterMax ? enterMin : enterMax

          if (min && mccMax && min > mccMax) {
            return ''
          }

          return `活动中最少需配置 ${
            min ?? DEFAULT_APPLY_ACT_MIN_LIMIT
          } 个子活动， 最大不超过 ${mccMax ?? DEFAULT_APPLY_ACT_MAX_LIMIT} 个`
        },
      },
    }
  )

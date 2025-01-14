import { Input } from 'antd'
import { toNumber } from 'lodash'
import { nodeUtil } from '@easy-page/antd-ui'
import {
  ISubActivity,
  PromotionKey,
  SubsidyOptEnum,
  checkNumberInvalid,
} from '@/common'
import { DiscountRateState } from '@/pages/actsCrud/ActsCrudInfo/fields/interface'
import { appendToKeyList } from '../../../utils'
import { getKeyListInfo } from '../../../../utils'

export type DiscountRangeOptions = {
  min: number
  max: number
  unit: string
}

export const atPercent = ({ min, max, unit }: DiscountRangeOptions) =>
  nodeUtil.createCustomField<DiscountRateState>(
    'atPercent',
    '每单代理成本占比',
    ({ value, onChange, disabled }) => {
      console.log('vvvvvvv111 1111:', value.maxValue)
      return (
        <div className="flex flex-row items-center">
          <Input
            disabled={disabled || true}
            suffix={unit}
            value={value?.minValue || ''}
            onChange={(e) => {
              onChange({
                ...value,
                minValue: e.target.value,
              })
            }}
            placeholder={`${min}-${max}之间`}
          />
          <span className="px-2">至</span>
          <Input
            disabled={disabled || true}
            suffix={unit}
            value={value?.maxValue || ''}
            onChange={(e) => {
              onChange({
                ...value,
                maxValue: e.target.value,
              })
            }}
            placeholder={`${min}-${max}之间`}
          />
          {/* <span className="ml-2">{unit}</span> */}
        </div>
      )
    },
    {
      preprocess: ({ defaultValues }) => {
        const info = getKeyListInfo({
          defaultValues: defaultValues as ISubActivity,
          key: PromotionKey.AgentSubsidyRatio,
        })
        console.log('vvvvvvv111:', info?.min)
        return {
          minValue: info?.min || '0',
          maxValue: info?.max || '0',
        }
      },
      postprocess(context) {
        const { value } = context
        if (!value?.minValue && !value?.maxValue) return
        return appendToKeyList(context, {
          appendValue(keyList) {
            const { value } = context
            const atInfo = keyList.find(
              (x) => x.key === PromotionKey.AgentSubsidyRatio
            )
            if (!atInfo) {
              keyList.push({
                key: PromotionKey.AgentSubsidyRatio,
                minValue: value.minValue,
                maxValue: value.maxValue,
                opt: SubsidyOptEnum.CloseInterval,
              })
              return keyList
            }
            return keyList.map((e) => {
              if (e.key === PromotionKey.AgentSubsidyRatio) {
                return {
                  ...e,
                  minValue: value.minValue,
                  maxValue: value.maxValue,
                  opt: SubsidyOptEnum.CloseInterval,
                }
              }
              return e
            })
          },
        })
      },
      effectedKeys: ['atMaxMoney', 'mtPercent'],
      validate: ({ value, pageState }) => {
        if (pageState['atMaxMoney'] && !value?.minValue && !value?.maxValue) {
          return {
            success: false,
            errorMsg: '请设置每单代理成本占比范围',
          }
        }
        if (
          toNumber(pageState['mtPercent']) + toNumber(value?.maxValue) >
          100
        ) {
          return {
            success: false,
            errorMsg:
              '【每单美团成本占比】与【每单代理成本占比】最大值之和需小于等于100',
          }
        }
        if (
          toNumber(value.minValue) > toNumber(value.maxValue) &&
          value.minValue !== '' &&
          value.maxValue !== ''
        ) {
          return {
            success: false,
            errorMsg: '每单代理成本占比最小值需小于等于最大值',
          }
        }

        const checkValid = (val: string) => {
          return checkNumberInvalid(val, {
            checkNumber: true,
            checkInteger: true,
            checkInRange: {
              min: 0,
              max: 100,
            },
          })
        }
        const minCheckRes = checkValid(value.minValue)
        const maxCheckRes = checkValid(value.maxValue)

        if (
          (value.maxValue && !maxCheckRes.success) ||
          (value.minValue && !minCheckRes.success)
        ) {
          return {
            success: false,
            errorMsg: '可输入0-100之间的数字，仅支持整数。',
          }
        }

        return { success: true }
      },
    }
    // {
    //   formItem: {
    //     tooltip: `指商品可报名的折扣率范围，支持设置 ${min} - ${max} 折。`,
    //   },
    // }
  )

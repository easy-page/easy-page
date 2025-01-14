import React from 'react'
import { nodeUtil } from '@easy-page/antd-ui'
import { Input } from 'antd'
import {
  NumberOperator,
  QuanqianJiaState,
  checkNumberInvalid,
  compareNumber,
  removeLeadingZeros,
  toNumber,
} from '@/common'
import { MerchantMaxSubsidyFormProps } from '../interface'
import { MerchantMaxSubsidyFormState } from '../../../subPlan'

const QuanQianPriceRange = {
  Max: 999999,
  Min: 0,
}
export type QuanqianPriceOptions = {
  suffix?: React.ReactNode
}

export const quanqianPrice = ({ suffix }: QuanqianPriceOptions) =>
  nodeUtil.createCustomField<
    QuanqianJiaState,
    MerchantMaxSubsidyFormState,
    MerchantMaxSubsidyFormProps
  >(
    'quanqianPrice',
    '',
    ({ value, onChange, frameworkProps: { store }, disabled }) => {
      const { formIndex = 0, total = 0 } = (store.getPageProps() ||
        {}) as MerchantMaxSubsidyFormProps
      return (
        <div className="flex flex-row items-center">
          <Input
            value={value?.min}
            className="w-[100px]"
            disabled={true}
            onChange={(e) => {
              const val = e.target.value
              if (
                !val ||
                checkNumberInvalid(val, { checkInteger: true }).success
              ) {
                onChange({
                  ...value,
                  min: e.target.value,
                })
              }
            }}
          />
          <div className="px-2">
            {suffix ? (
              <span className="mx-1">≤</span>
            ) : (
              <>
                {formIndex === 0 ? (
                  <span className="mx-1">&lt;</span>
                ) : (
                  <span className="mx-1">≤</span>
                )}
              </>
            )}
            {suffix ? <>{suffix} &lt;</> : <>券前价 &lt;</>}
          </div>
          {total === formIndex + 1 ? (
            <div>不限 </div>
          ) : (
            <Input
              value={value?.max || ''}
              className="w-[100px]"
              placeholder="请输入"
              disabled={disabled}
              onChange={(e) => {
                const val = e.target.value
                if (
                  !val ||
                  checkNumberInvalid(val, {
                    checkInteger: true,
                    checkInRange: {
                      min: QuanQianPriceRange.Min,
                      max: QuanQianPriceRange.Max,
                    },
                  }).success
                ) {
                  onChange({
                    ...value,
                    max: removeLeadingZeros(val),
                  })
                }
              }}
            />
          )}
        </div>
      )
    },
    {
      effectedKeys: ['formIndex', 'total'],
      postprocess: ({ value }) => {
        return {
          quanqianPrice: {
            min: value?.min ? `${value.min}` : '',
            max: value?.max ? `${value.max}` : '',
          },
        }
      },
      preprocess({ defaultValues }) {
        return {
          min: defaultValues.quanqianPrice?.min || '0',
          max: defaultValues.quanqianPrice?.max,
        }
      },
      validate: ({ value, pageProps }) => {
        const { formIndex, total } = pageProps
        if (!value || !value.max) {
          // 只有最后一样的最大值，可以不填写
          return {
            success: formIndex === total - 1,
            errorMsg: '必填，仅支持整数，右边的值需大于左边',
          }
        }
        if (compareNumber(value.min, value.max, NumberOperator.Gte)) {
          return {
            success: false,
            errorMsg: '必填，仅支持整数，右边的值需大于左边',
          }
        }
        return { success: true }
      },
    },
    {
      formItem: {
        className: 'col-span-3 mb-0',
      },
    }
  )

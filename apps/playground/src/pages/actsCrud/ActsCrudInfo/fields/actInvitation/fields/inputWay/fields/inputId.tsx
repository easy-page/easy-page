import { nodeUtil } from '@easy-page/antd-ui'
import { Input } from 'antd'
import { isOnlyNumbersAndCommas } from '@/common/libs/string'
import { get } from 'lodash'
import {
  ANTD_ERROR_CLASS,
  ActionTypeEnum,
  InputTypeEnum,
  getIdCount,
} from '@/common'
import {
  InviteWay,
  type CommonActCrudFormProps,
  type CommonActCrudFormState,
} from '../../../../interface'
import { useContext } from 'react'
import { FormItemInputContext } from 'antd/es/form/context'
import classNames from 'classnames'

export type InputIdEffectedType = {
  placeholder?: string
  disabled?: boolean
}

const MAX_IDS = 5000
export const inputId = () =>
  nodeUtil.createCustomField<
    string,
    CommonActCrudFormState,
    CommonActCrudFormProps,
    InputIdEffectedType
  >(
    'inputId',
    ' ',
    ({
      value,
      onChange,
      frameworkProps: { effectedResult, store },
      disabled: curDisabled,
    }) => {
      const count = getIdCount(value)
      const { status } = useContext(FormItemInputContext)
      const hasError = status === 'error'
      const dataType = store.getState('dataType') as InviteWay
      const isBrandWay = dataType === InviteWay.ByMerchantBrand
      const disabled = curDisabled || effectedResult?.disabled
      return (
        <div className="flex flex-col">
          <Input.TextArea
            value={value}
            disabled={disabled}
            className={classNames('min-h-[200px]', {
              [`input-${ANTD_ERROR_CLASS}`]: hasError,
            })}
            placeholder={effectedResult?.placeholder}
            onChange={(e) => onChange(e.target.value)}
          ></Input.TextArea>
          <div className="flex flex-row  font-sm">
            {disabled ? (
              <></>
            ) : (
              <div
                className="text-[#1677FF] cursor-pointer"
                onClick={() => {
                  onChange('')
                }}
              >
                清空
              </div>
            )}
            <div className="text-sec">
              （已输入{count}个{isBrandWay ? '品牌' : '门店'} ID {count}/
              {MAX_IDS}）
            </div>
          </div>
        </div>
      )
    },
    {
      value: '',
      validate: ({ value }) => {
        const count = getIdCount(value)
        const ids = value.split(',')
        if (count > MAX_IDS) {
          return {
            success: false,
            errorMsg: '超过上限5000个，请删除或使用上传方式',
          }
        }
        const hasEmptyStr = ids.some((x) => !x)
        console.log('hasEmptyStr:', Boolean(hasEmptyStr))
        if (hasEmptyStr || !isOnlyNumbersAndCommas(value)) {
          return {
            success: false,
            errorMsg: '仅支持录入数字和英文逗号，请检查后修改。',
          }
        }
        return { success: true }
      },
      preprocess: ({ defaultValues }) => {
        const inputIdsWay = get(defaultValues, 'invitation.inputType')
        if (inputIdsWay !== InputTypeEnum.ManualEntry) {
          return ''
        }
        return get(defaultValues, 'invitation.inputData')
      },
      postprocess: ({ value }) => {
        return {
          'invitation.inputData': value,
        }
      },
      actions: [
        {
          effectedKeys: ['dataType', 'chooseOperation'],
          initRun: true,
          action: ({ effectedData }) => {
            const isBrandWay =
              effectedData['dataType'] === InviteWay.ByMerchantBrand
            const placeholder = isBrandWay
              ? '请输入业务品牌ID，以英文逗号间隔，上限5000个，若超过请使用上传方式'
              : '请输入门店ID，以英文逗号间隔，上限5000个，若超过请使用上传方式'

            const chooseOperation = effectedData['chooseOperation']
            const isNoChange = chooseOperation === `${ActionTypeEnum.NoChange}`

            return {
              effectResult:
                chooseOperation && isNoChange
                  ? {
                      placeholder,
                      disabled: true,
                    }
                  : { placeholder },
            }
          },
        },
      ],
    }
  )

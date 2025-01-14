import { nodeUtil, UI_COMPONENTS } from '@easy-page/antd-ui'
import { Input } from 'antd'
import { isOnlyNumbersAndCommas } from '@/common/libs/string'
import { get, toNumber } from 'lodash'
import {
  ANTD_ERROR_CLASS,
  ActivityStatusEnum,
  InputTypeEnum,
  InviteInputTypeEnum,
  getIdCount,
  isEdit,
} from '@/common'
import { useContext } from 'react'
import { FormItemInputContext } from 'antd/es/form/context'
import classNames from 'classnames'
import {
  CommonActCrudFormState,
  CommonActCrudFormProps,
  InviteWay,
} from '@/pages/actsCrud/ActsCrudInfo/fields'
import { checkSupplier } from '@/common/apis/waiMaResource/checkSupplier'

export type InputIdEffectedType = {
  placeholder?: string
}

const MAX_IDS = 1
export const wmsInputId = () =>
  nodeUtil.createField<
    string,
    CommonActCrudFormState,
    CommonActCrudFormProps,
    InputIdEffectedType
  >(
    'invitation.inputData',
    ' ',
    {
      value: '',
      when: {
        effectedKeys: ['invitation.inputType'],
        show({ effectedData }) {
          console.log(
            'effectedData',
            effectedData['invitation.inputType'],
            effectedData['invitation.inputType'] ===
              InviteInputTypeEnum.ManualEntry
          )

          return (
            effectedData['invitation.inputType'] ===
            InviteInputTypeEnum.ManualEntry
          )
        },
      },
      validate: async ({ value, pageState }) => {
        const count = getIdCount(value)
        const ids = value.split(',')
        if (count > MAX_IDS) {
          return {
            success: false,
            errorMsg: '仅支持1个供应商ID',
          }
        }
        const hasEmptyStr = ids.some((x) => !x)
        if (hasEmptyStr || !toNumber(value)) {
          return {
            success: false,
            errorMsg: '仅支持录入数字，请检查后修改。',
          }
        }

        if (isEdit()) {
          const { activity } = pageState
          const { status } = activity
          if (
            [
              ActivityStatusEnum.Applying,
              ActivityStatusEnum.TobeActive,
              ActivityStatusEnum.Active,
            ].includes(status)
          ) {
            return { success: true }
          }
        }

        // 远程校验供应商ID
        const res = await checkSupplier({
          supplierId: value,
        })

        if (!res.success || !res?.data?.supplierName) {
          return {
            success: false,
            errorMsg: '供应商ID错误，请重新输入。',
          }
        }

        return { success: true }
      },
      preprocess: ({ defaultValues }) => {
        return get(defaultValues, 'invitation.inputData')
      },
      postprocess: ({ value }) => {
        return {
          'invitation.inputData': value,
        }
      },
      actions: [],
    },
    {
      ui: UI_COMPONENTS.TEXTAREA,
      textArea: {
        className: 'min-h-[200px]',
      },
      formItem: {
        validateTrigger: 'onBlur',
      },
    }
  )

import { nodeUtil } from '@easy-page/antd-ui'
import { Input } from 'antd'
import { isOnlyNumbersAndCommas } from '@/common/libs/string'
import { get } from 'lodash'
import { ANTD_ERROR_CLASS, InputTypeEnum, getIdCount } from '@/common'
import { useContext } from 'react'
import { FormItemInputContext } from 'antd/es/form/context'
import classNames from 'classnames'
import {
  CommonActCrudFormState,
  CommonActCrudFormProps,
  InviteWay,
} from '@/pages/actsCrud/ActsCrudInfo/fields'

export type InputIdEffectedType = {
  placeholder?: string
}

export const wmsActRule = () =>
  nodeUtil.createCustomField<
    string,
    CommonActCrudFormState,
    CommonActCrudFormProps,
    InputIdEffectedType
  >(
    'ruleDesc',
    '活动规则',
    ({
      value,
      onChange,
      frameworkProps: { effectedResult, store },
      disabled,
    }) => {
      return (
        <div className="flex flex-col">
          <Input.TextArea
            value={value}
            disabled={disabled}
            className={classNames('min-h-[200px]')}
            placeholder={'请输入活动规则'}
            onChange={(e) => onChange(e.target.value)}
          ></Input.TextArea>
        </div>
      )
    },
    {
      required: true,
      value: '',
      validate: ({ value }) => {
        const trimValue = value.trim()
        if (!trimValue) {
          return {
            success: false,
            errorMsg: '请输入活动规则',
          }
        }
        return { success: true }
      },
      preprocess({ defaultValues }) {
        return get(defaultValues, 'activity.ruleDesc') || ''
      },
      postprocess: ({ value }) => {
        return {
          'activity.ruleDesc': value,
        }
      },
      actions: [],
    }
  )

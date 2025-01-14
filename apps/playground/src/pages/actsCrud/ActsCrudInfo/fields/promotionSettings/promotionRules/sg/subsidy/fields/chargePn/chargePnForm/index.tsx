import React, { useMemo } from 'react'
import {
  ChildFormContainerProps,
  ChildFormItem,
  ChildFormState,
  ComponentProps,
  DEFAULT_COMPONENTS,
  DefaultPageProps,
  EasyPage,
  FormUtil,
} from '@easy-page/antd-ui'
import { chargeSidePnPageInfo } from './pageInfo'

import { ChargeSidePnPageProps } from './interface'
import { clearAndHideApplyReason, isEmptyMtChargeAmt } from '../utils'
import {
  CommonSubActPageState,
  CommonSubActPageProps,
  ChargeSidePnPageState,
  CommonActCrudFormState,
} from '@/pages/actsCrud/ActsCrudInfo/fields/interface'

export type ChargeSidePnFormProps = ComponentProps<
  ChildFormContainerProps,
  ChildFormState,
  any,
  CommonSubActPageState,
  CommonSubActPageProps & DefaultPageProps<CommonSubActPageState>
> & {
  childFormItem: ChildFormItem
}

export const ChargeSidePnForm = ({
  childFormContextData,
  disabled,
  setChildFormRef,
  onChildFormChanged,
  onRemove,
  childFormItem,

  value,
}: ChargeSidePnFormProps) => {
  const defaultValues = value?.childFormDefaultValues?.[childFormItem.id]
  const mtChargeAmt = childFormContextData['meituan.chargeAmt'] as string

  const disabledForm = disabled ? true : isEmptyMtChargeAmt(mtChargeAmt)
  const contextMemo = useMemo(() => {
    const parentFormUtil = childFormContextData[
      'getFormUtil'
    ]?.() as FormUtil<CommonActCrudFormState>
    return {
      ...childFormContextData,
      editable: disabledForm ? false : true,
      onRemove: () => {
        clearAndHideApplyReason(parentFormUtil)
        onRemove(childFormItem.id)
      },
    }
  }, [childFormContextData, disabledForm, onRemove, childFormItem])
  return (
    <EasyPage<ChargeSidePnPageState, ChargeSidePnPageProps>
      components={DEFAULT_COMPONENTS}
      context={contextMemo}
      setFormUtil={(util) => {
        setChildFormRef(util, childFormItem.id)
      }}
      onChange={({ value }) => {
        if (value.pn) {
          const parentFormUtil = childFormContextData[
            'getFormUtil'
          ]?.() as FormUtil<CommonActCrudFormState>
          // 在切换的时候，清空预算申请理由，提交的时候再继续校验
          clearAndHideApplyReason(parentFormUtil)
        }
        onChildFormChanged()
      }}
      defaultValues={defaultValues}
      layout={({ childen }) => (
        <div className="items-start mb-2 bg-[#F8F8F8] pt-2">
          {childen as any}
        </div>
      )}
      pageId="charge_side"
      commonUIConfig={{
        form: {
          labelCol: { span: 6 },
          wrapperCol: { span: 14 },
          labelAlign: 'right',
          colon: false,
        },
      }}
      pageType="form"
      {...chargeSidePnPageInfo}
    />
  )
}

import React from 'react'
import {
  ChildFormItem,
  ChildFormState,
  Empty,
  FormUtil,
  generateId,
  getChildrenFormData,
  nodeUtil,
  validateAllChildForm,
} from '@easy-page/antd-ui'
import { ChargeSidePnForm } from './chargePnForm'
import { Button } from 'antd'
import './index.less'

import { PlusCircleOutlined } from '@ant-design/icons'

import { ISubActivity, MtChargeSidePn } from '@/common'
import {
  appendToChageSidePn,
  clearAndHideApplyReason,
  getFromChargeSidePn,
  isEmptyMtChargeAmt,
} from './utils'
import {
  ChargeSidePnPageState,
  CommonSubActPageState,
  CommonSubActPageProps,
  CommonActCrudFormState,
} from '@/pages/actsCrud/ActsCrudInfo/fields/interface'

const CHARGE_SIDE_CHILD_FORM_PREFIX = 'charge-side'
const defaultId = generateId(CHARGE_SIDE_CHILD_FORM_PREFIX)
const MAX_PNS = 5

export const chargeSidePnForm = () => {
  return nodeUtil.createChildForm<
    ChildFormState<ChargeSidePnPageState>,
    CommonSubActPageState,
    CommonSubActPageProps
  >(
    'pns.chargeSidePnform',
    {
      value: {
        childForms: [
          {
            label: '',
            id: defaultId,
          },
        ],
        choosedItemId: defaultId,
      },
      childFormContext: [
        'chargeType',
        'meituan.chargeAmt',
        'pns.chargeSidePnform',
        'getFormUtil',
      ],
      actions: [
        {
          effectedKeys: ['promotionTime.timeRange'],
          action: ({ value, pageProps }) => {
            console.log('pageProps:', pageProps)
            return {
              // fieldValue:
            }
          },
        },
        {
          effectedKeys: ['meituan.chargeAmt'],
          action: ({ effectedData }) => {
            const chargeAmt = effectedData['meituan.chargeAmt']

            // 美团承担比例为 0 时也只保留一个
            if (isEmptyMtChargeAmt(chargeAmt)) {
              const id = generateId('charge-side-pn')
              // 清空美团承担时，清空 pn 组织
              return {
                fieldValue: {
                  childForms: [
                    {
                      label: '',
                      id: id,
                    },
                  ],
                  choosedItemId: id,
                },
              }
            }
            return {}
          },
        },
      ],
      postprocess({ value, processedFormData }) {
        const data = getChildrenFormData(
          value.formUtils
        ) as any as MtChargeSidePn[]
        return appendToChageSidePn(processedFormData, data)
      },
      preprocess({ defaultValues }) {
        const pns = getFromChargeSidePn(defaultValues as ISubActivity)
        const childFormDefaultValues: Record<string, MtChargeSidePn> = {}
        const childFormItems: ChildFormItem[] = []
        if (pns.length === 0) {
          const id = generateId(CHARGE_SIDE_CHILD_FORM_PREFIX)
          childFormItems.push({
            id: id,
            label: '',
          })
        }
        pns.forEach((each) => {
          const id = generateId(CHARGE_SIDE_CHILD_FORM_PREFIX)
          childFormItems.push({
            id: id,
            label: '',
          })
          childFormDefaultValues[id] = each
        })
        return {
          choosedItemId: undefined,
          childForms: childFormItems,
          formUtils: {},
          childFormDefaultValues: childFormDefaultValues,
        }
      },
      when: {
        effectedKeys: ['chargeFlowType'],
        show({ effectedData }) {
          const showSubsidy = effectedData['chargeFlowType']
          return showSubsidy && showSubsidy.length > 0
        },
      },
      childFormContainer: (props) => {
        const { value, onAdd, childFormContextData, disabled } = props
        const { childForms = [] } = value || {}
        console.log('pageProps childFormContextData', childFormContextData)
        const mtChargeAmt = childFormContextData['meituan.chargeAmt'] as string

        const diableAdd =
          disabled ||
          isEmptyMtChargeAmt(mtChargeAmt) ||
          childForms.length === MAX_PNS
        return (
          <div className="w-full flex flex-col p-2 subsidy-child-form">
            <i className="icon-arrow"></i>
            {childForms.map((e) => (
              <ChargeSidePnForm key={e.id} childFormItem={e} {...props} />
            ))}
            <div className="flex flex-row mt-2 items-center">
              <Button
                onClick={() => {
                  onAdd()
                  setTimeout(() => {
                    const parentFormUtil = childFormContextData[
                      'getFormUtil'
                    ]?.() as FormUtil<CommonActCrudFormState>
                    clearAndHideApplyReason(parentFormUtil)
                  })
                }}
                type="default"
                disabled={diableAdd}
                icon={<PlusCircleOutlined />}
              >
                添加承担组织
              </Button>
              <div className="ml-2 color-[#CBCBCB]">最多添加 5 个组织</div>
            </div>
          </div>
        )
      },
      validate: async ({ value, onChange }) => {
        const results = await validateAllChildForm(value, {})
        const hasError = results.find((e) => Boolean(e.errors))
        return { success: !hasError, errorMsg: '' }
      },
    },
    {
      childForm: {
        childFormIdPrefix: CHARGE_SIDE_CHILD_FORM_PREFIX,
      },
      formItem: {
        labelCol: { span: undefined },
        wrapperCol: { span: undefined },
        validateTrigger: 'onChange',
      },
    }
  )
}

export { getCanChoosePnOptions } from './utils'

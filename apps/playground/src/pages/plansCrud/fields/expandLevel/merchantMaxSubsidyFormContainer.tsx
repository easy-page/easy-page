import { Table } from 'antd'
import classNames from 'classnames'
import {
  ChildFormState,
  PageInfo,
  generateId,
  nodeUtil,
  validateAllChildForm,
} from '@easy-page/antd-ui'
import {
  AddIcon,
  SubMarketingPlan,
  SubsidyConditionKeyEnum,
  SubsidyLevelEnum,
  SubsidyRule,
  TableHeader,
  preprocessExpandMerchantMaxSubsidy,
} from '@/common'
import {
  MerchantMaxSubsidyFormField,
  MerchantMaxSubsidyFormInfoProps,
  MerchantMaxSubsidyFormPrefix,
} from './merchantMaxSubsidyForm'
import { postprocessMerchantMaxSubsidy } from './utils'
import { MerchantMaxSubsidyContainerState } from './merchantMaxSubsidyForm/interface'
import { merchantMaxSubsidyFormInfo } from './merchantMaxSubsidyForm/pageInfo'
import {
  CommonSubPlanFormProps,
  CommonSubPlanFormState,
  MerchantMaxSubsidyFormState,
} from '../subPlan'

const defaultId = generateId(MerchantMaxSubsidyFormPrefix)
const MAX_PERIOD = 5

const DEFAULT_MAX_EXPAND_COUNT = 10

const DEFAULT_VALUE = {
  childForms: [
    {
      id: defaultId,
      label: '',
    },
  ],
  choosedItemId: defaultId,
}

export type MerchantMaxSubsidyFormOptions = Pick<
  MerchantMaxSubsidyFormInfoProps,
  'validateMerchantRequestPrice'
> & {
  orderTitle?: string
  orderTitleTips?: string
  merchantRequestExtra?: string
  pageInfo?: PageInfo<any, any>
  postprocess?: (data: Partial<MerchantMaxSubsidyFormState>[]) => SubsidyRule
  subsidyConditionKey?: SubsidyConditionKeyEnum
  subsidyScene?: SubsidyLevelEnum
}

export const merchantMaxSubsidyForm = ({
  orderTitle,
  orderTitleTips,
  pageInfo = merchantMaxSubsidyFormInfo,
  merchantRequestExtra,
  postprocess = postprocessMerchantMaxSubsidy,
  subsidyConditionKey,
  validateMerchantRequestPrice,
  subsidyScene
}: MerchantMaxSubsidyFormOptions) => {
  return nodeUtil.createChildForm<
    MerchantMaxSubsidyContainerState,
    CommonSubPlanFormState,
    CommonSubPlanFormProps
  >(
    'merchantMaxSubsidy',
    {
      name: '商家最高补贴要求',
      required: true,
      value: DEFAULT_VALUE,
      postprocess({ value, processedFormData }) {
        const result = Object.values(value?.formUtils || {}).map((e) =>
          e.getFormData()
        )
        const subsidyRule = processedFormData.subsidyRule || []
        subsidyRule.push(postprocess(result))
        return {
          subsidyRule: subsidyRule,
        }
      },
      preprocess({ defaultValues }) {
        const data = preprocessExpandMerchantMaxSubsidy({
          subsidyRule: (defaultValues as SubMarketingPlan).subsidyRule,
          subsidyConditionKey: subsidyConditionKey,
          subsidyScene: subsidyScene
        })

        const childFormDefaultValues: MerchantMaxSubsidyContainerState['childFormDefaultValues'] =
          {}
        const childForms = data.map((e) => {
          const id = generateId(MerchantMaxSubsidyFormPrefix)
          childFormDefaultValues[id] = e
          return {
            id: id,
            label: '',
          }
        })
        const firstId = childForms?.[0]?.id
        return childForms.length === 0
          ? DEFAULT_VALUE
          : {
              childForms: childForms,
              choosedItemId: firstId,
              childFormDefaultValues,
            }
      },
      validate: async ({ value, onChange }) => {
        const results = await validateAllChildForm(value, { onChange })
        const hasError = results.find((e) => Boolean(e.errors))
        return { success: !hasError }
      },
      childFormContext: ['maxExpandLevelMcc'],
      childFormContainer: (props) => {
        const {
          value,
          onAdd,
          childFormContextData,
          disabled,
          onRemove,
          onChange,
          ...restProps
        } = props

        const mccMaxLevelCount =
          childFormContextData['maxExpandLevelMcc'] || DEFAULT_MAX_EXPAND_COUNT
        const { childForms } = value
        const disableAdd = disabled || childForms.length >= mccMaxLevelCount
        return (
          <div className="flex flex-col">
            <div className="grid grid-cols-8 gap-4 bg-[#F5F5F6] py-2 px-4 min-w-[900px]">
              <TableHeader className="col-span-1" name="阶梯" />
              <TableHeader
                className="col-span-3"
                extra="可输入整数"
                tooltip={
                  orderTitleTips ??
                  '指用券前的实付订单金额=商品现价+打包费-所有优惠金额（不含配送费）'
                }
                required
                name={orderTitle || '订单券前价（元）'}
              />
              <TableHeader
                className="col-span-3"
                extra={merchantRequestExtra || '0~20，支持0.5结尾的一位小数'}
                required
                // tooltip="xxx"
                name="商家最高补贴要求（元）"
              />

              <TableHeader className="col-span-1" name="操作" />
            </div>
            {childForms.map((each, idx) => (
              <MerchantMaxSubsidyFormField
                formIndex={idx}
                pageInfo={pageInfo}
                formId={each.id}
                {...restProps}
                onChange={onChange}
                onRemove={onRemove}
                disabledAll={disabled}
                validateMerchantRequestPrice={validateMerchantRequestPrice}
                childFormContextData={childFormContextData}
                onAdd={onAdd}
                value={value as MerchantMaxSubsidyContainerState}
                key={each.id}
              />
            ))}
            <div className="expand-level-form p-4   flex flex-row items-center min-w-[900px]">
              <div
                onClick={() => {
                  if (!disableAdd) {
                    onAdd()
                  }
                }}
                className={classNames(
                  'flex flex-row text-[#386AFD]  items-center w-[300px]',
                  {
                    'text-sec cursor-not-allowed': disableAdd,
                    'cursor-pointer': !disableAdd,
                  }
                )}
              >
                <AddIcon color={disableAdd ? '#858692' : '#386BFF'} />
                <div className="ml-1 ">
                  添加补贴阶梯（{childForms.length}/{mccMaxLevelCount})
                </div>
              </div>
            </div>
          </div>
        )
      },
    },
    {
      childForm: {
        childFormIdPrefix: MerchantMaxSubsidyFormPrefix,
      },
      formItem: {
        wrapperCol: { span: 10 },
      },
    }
  )
}

import {
  ChildFormContainerProps,
  ComponentProps,
  DEFAULT_COMPONENTS,
  DefaultPageProps,
  EXTRA_COMPONENTS,
  EasyPage,
  PageInfo,
} from '@easy-page/antd-ui'
import {
  MerchantMaxSubsidyContainerState,
  MerchantMaxSubsidyFormProps,
} from './interface'
import {
  handleDeleteMerchantMaxSubsidyFormRow,
  handleMerchantRequestPriceEffect,
  handleQuanQianJiaEffect,
} from './effects'
import './index.less'
import {
  CommonSubPlanFormProps,
  CommonSubPlanFormState,
  MerchantMaxSubsidyFormState,
} from '../../subPlan'

export type MerchantMaxSubsidyFormInfoProps = ComponentProps<
  ChildFormContainerProps,
  MerchantMaxSubsidyContainerState,
  any,
  CommonSubPlanFormState,
  CommonSubPlanFormProps & DefaultPageProps<CommonSubPlanFormState>
> & {
  formIndex: number
  formId: string
  disabledAll?: boolean
  pageInfo: PageInfo<any, any>
  validateMerchantRequestPrice?: boolean
}

const getLastFormUtil = ({
  formIndex,
  value,
}: {
  formIndex: number
  value: MerchantMaxSubsidyContainerState
}) => {
  const { childForms, formUtils } = value
  const lastChildForm = childForms[formIndex - 1]
  if (lastChildForm) {
    return formUtils?.[lastChildForm.id]
  }
  return undefined
}

export const MerchantMaxSubsidyFormPrefix = 'merchantMaxSubsidy'
export const MerchantMaxSubsidyFormField = ({
  formId,
  formIndex,
  onChildFormChanged,
  childFormContextData,
  setChildFormRef,
  value,
  disabledAll,
  onRemove,
  validateMerchantRequestPrice,
  pageInfo,
  ...props
}: MerchantMaxSubsidyFormInfoProps) => {
  const { formUtils, childForms, childFormDefaultValues } = value
  const curDefaultValues = childFormDefaultValues?.[formId] || {}
  return (
    <EasyPage<MerchantMaxSubsidyFormState, MerchantMaxSubsidyFormProps>
      pageType="form"
      commonUIConfig={{
        form: {
          className:
            'grid grid-cols-8 gap-4 px-4 py-2 expand-level-form items-start min-w-[900px]',
        },
      }}
      defaultValues={curDefaultValues}
      effects={[
        {
          changedKeys: ['quanqianPrice'],
          action({ value }) {
            handleQuanQianJiaEffect({
              validateMerchantRequestPrice,
              formIndex,
              formId,
              formUtils,
              childForms,
              curVal: value,
            })
          },
        },
        {
          changedKeys: ['merchantRequestPrice'],
          action() {
            handleMerchantRequestPriceEffect({
              formIndex,
              formUtils,
              childForms,
            })
          },
        },
      ]}
      onChange={() => {
        onChildFormChanged()
      }}
      context={{
        formId,
        total: childForms?.length,
        formIndex,
        onRemove: (id) => {
          onRemove(id)
          handleDeleteMerchantMaxSubsidyFormRow({
            childForms: childForms.filter((e) => e.id !== id),
            formIndex: formIndex - 1,
            formUtils,
          })
        },
        ...childFormContextData,
        lastFormUtil: getLastFormUtil({ value, formIndex }),
        editable: disabledAll === true ? false : undefined,
      }}
      setFormUtil={(ref) => setChildFormRef(ref, formId)}
      // key={`${new Date().getTime()}`}
      components={{
        ...DEFAULT_COMPONENTS,
        ...EXTRA_COMPONENTS,
      }}
      {...pageInfo}
    />
  )
}

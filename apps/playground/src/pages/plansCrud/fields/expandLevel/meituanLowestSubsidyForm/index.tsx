import {
  ChildFormContainerProps,
  ChildFormItem,
  ChildFormState,
  ComponentProps,
  DEFAULT_COMPONENTS,
  DefaultPageProps,
  EXTRA_COMPONENTS,
  EasyPage,
} from '@easy-page/antd-ui'
import { getLastFormUtil } from '@/common/fields'
import { MeituanLowestSubsidyFormProps } from './interface'
import { meituanLowestSubsidyFormInfo } from './pageInfo'
import { handleMtLowestPriceEffect } from './effects'
import './index.less'
import { CommonSubPlanFormProps, CommonSubPlanFormState, MeituanLowestSubsidyFormState } from '../../subPlan'

export type MeituanMinSubsidyFormProps = ComponentProps<
  ChildFormContainerProps,
  ChildFormState<Record<string, any>>,
  any,
  CommonSubPlanFormState,
  CommonSubPlanFormProps & DefaultPageProps<CommonSubPlanFormState>
> & {
  formIndex: number
  formId: string
  disabledAll?: boolean
}

export const MeituanLowestSubsidyForm = ({
  formId,
  formIndex,
  onChildFormChanged,
  childFormContextData,
  setChildFormRef,
  value,
  disabledAll,
  onRemove,
  ...props
}: MeituanMinSubsidyFormProps) => {
  const { formUtils, childForms, childFormDefaultValues } = value
  const curDefaultValues = childFormDefaultValues?.[formId] || {}

  return (
    <EasyPage<MeituanLowestSubsidyFormState, MeituanLowestSubsidyFormProps>
      pageType="form"
      commonUIConfig={{
        form: {
          className:
            'grid grid-cols-2 gap-4 px-4 py-2 expand-level-form items-start min-w-[800px]',
        },
      }}
      defaultValues={curDefaultValues}
      effects={[
        {
          changedKeys: ['meituanSubsidyPrice'],
          action() {
            handleMtLowestPriceEffect({
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
        onRemove,
        ...childFormContextData,
        lastFormUtil: getLastFormUtil({ value, formIndex }),
        editable: disabledAll === true ? false : undefined,
      }}
      setFormUtil={(ref) => {
        setChildFormRef(ref, formId)
      }}
      // key={`${new Date().getTime()}`}
      components={{
        ...DEFAULT_COMPONENTS,
        ...EXTRA_COMPONENTS,
      }}
      {...meituanLowestSubsidyFormInfo}
    />
  )
}

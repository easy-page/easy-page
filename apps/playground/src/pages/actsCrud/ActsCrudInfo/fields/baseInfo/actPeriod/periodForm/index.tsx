import {
  ChildFormContainerProps,
  ChildFormState,
  ComponentProps,
  DEFAULT_COMPONENTS,
  DefaultPageProps,
  EXTRA_COMPONENTS,
  EasyPage,
  Empty,
} from '@easy-page/antd-ui'
import { ActPeriodPageProps, ActPeriodPageState } from './interface'
import { getActPeriodPageInfo } from './pageInfo'
import { PeriodTypeEnum } from '../common'

export const ActPeriodForm = ({
  childFormContextData,
  onChildFormChanged,
  setChildFormRef,
  formId,
  disabled,
  value,
  formIndex,
  periodType,
}: ComponentProps<
  ChildFormContainerProps,
  ChildFormState,
  any,
  Record<string, any>,
  Empty & DefaultPageProps<Record<string, any>>
> & {
  formId: string
  formIndex: number
  periodType: PeriodTypeEnum[]
}) => {
  // const formData = value.formUtils?.[formId]?.getOriginFormData?.() || {}
  const { childFormDefaultValues } = value
  const curDefaultVal = childFormDefaultValues[formId]
  return (
    <EasyPage<ActPeriodPageState, ActPeriodPageProps>
      components={{ ...DEFAULT_COMPONENTS, ...EXTRA_COMPONENTS }}
      context={{ ...childFormContextData, editable: !disabled }}
      defaultValues={curDefaultVal}
      key={formId}
      pageType="form"
      // commonUIConfig={{
      //   formItem: {
      //     className: 'font-medium',
      //   },
      // }}
      onChange={() => {
        onChildFormChanged()
      }}
      setFormUtil={(ref) => setChildFormRef(ref, formId)}
      {...getActPeriodPageInfo(formIndex, { periodType })}
    />
  )
}

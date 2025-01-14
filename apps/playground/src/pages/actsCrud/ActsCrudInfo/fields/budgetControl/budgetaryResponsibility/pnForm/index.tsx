import {
  ChildFormContainerProps,
  ChildFormState,
  ComponentProps,
  DEFAULT_COMPONENTS,
  DefaultPageProps,
  EasyPage,
  Empty,
  PageInfo,
} from '@easy-page/antd-ui'
import { BudgetaryPnPageProps } from './interface'
import {
  BudgetaryPnPageState,
  CommonActCrudFormState,
} from '../../../interface'
import { getEditableConfig } from '../utils'
import { ActFullInfo, IBudget } from '@/common'

export type BudgetaryResponsibilityFormProps = ComponentProps<
  ChildFormContainerProps,
  ChildFormState<Record<string, any>>,
  any,
  CommonActCrudFormState,
  Empty & DefaultPageProps<CommonActCrudFormState>
> & {
  formId: string
  formIndex: number
  pageInfo: PageInfo<any, any>
  defaultValues: Record<string, any>
}

export const BudgetaryResponsibilityForm = ({
  setChildFormRef,
  childFormContextData,
  formId,
  formIndex,
  pageInfo,
  defaultValues,
  frameworkProps: { store },
}: BudgetaryResponsibilityFormProps) => {
  const { activity } = store.getDefaultValues() as ActFullInfo
  const status = activity?.status

  return (
    <EasyPage<BudgetaryPnPageState, BudgetaryPnPageProps>
      components={{ ...DEFAULT_COMPONENTS }}
      pageType="form"
      commonUIConfig={{
        form: {
          className: 'mb-4 flex flex-row',
        },
      }}
      pageId="budgetControl"
      onChange={() => {
        // 外部无需感知内部变化
        // onChildFormChanged()
      }}
      key={formId}
      context={{
        ...childFormContextData,
        formIndex,
        editable: getEditableConfig(defaultValues as IBudget, status),
      }}
      defaultValues={defaultValues}
      setFormUtil={(ref) => {
        setChildFormRef(ref, formId)
      }}
      {...pageInfo}
    />
  )
}

export * from './interface'
export * from './fields/index'

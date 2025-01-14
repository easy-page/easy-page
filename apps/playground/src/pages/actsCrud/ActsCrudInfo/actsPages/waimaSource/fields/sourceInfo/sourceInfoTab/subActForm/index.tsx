import {
  ChildFormItem,
  DEFAULT_COMPONENTS,
  EXTRA_COMPONENTS,
  EasyPage,
  EasyPageEffect,
  EasyPageOnChangeContext,
  FormUtil,
  SelectState,
} from '@easy-page/antd-ui'
import { actDetailModel, CUSTOM_COMPONENTS, toNumber } from '@/common'

import { useCallback, useMemo } from 'react'
import {
  factorChangeEffects,
  pnsChangeEffects,
  syncFactorsForNewAct,
} from './effects'
import Big from 'big.js'
import { getSubActDisEditableConfig } from './utils'
import {
  CommonActCrudFormState,
  SubActFormProps,
  CommonActCrudFormProps,
  CommonSubActPageState,
  CommonSubActPageProps,
} from '@/pages/actsCrud/ActsCrudInfo/fields'

export type CustomEffectContext = {
  childForm: ChildFormItem
  getFormUtil: () => FormUtil<CommonActCrudFormState>
}

/** 资源位 */
export const ResourceInfoForm = ({
  childFormContextData,
  onChildFormChanged,
  handleChange,
  formIndex,
  frameworkProps: {
    getFormUtil,
    store: { pageState },
  },
  childForm,
  setChildFormRef,
  value,
  disabled,
  pageInfo,
  effects,
}: SubActFormProps<CommonActCrudFormState, CommonActCrudFormProps> & {
  effects?: (
    context: CustomEffectContext
  ) => EasyPageEffect<CommonSubActPageState>[]
}) => {
  const defaultValue = useMemo(() => {
    return value.childFormDefaultValues?.[childForm?.id]
  }, [childForm, value.childFormDefaultValues])

  const { data: actDetail } = actDetailModel.getData()
  const editableConfig = useMemo(() => {
    return getSubActDisEditableConfig(actDetail, disabled)
  }, [actDetail, disabled])

  const components = useMemo(
    () => ({
      ...DEFAULT_COMPONENTS,
      ...EXTRA_COMPONENTS,
      ...CUSTOM_COMPONENTS,
    }),
    []
  )

  const contextMemo = useMemo(() => {
    return {
      ...(childFormContextData || {}),
      editable: editableConfig,
      getFormUtil,
    } as CommonSubActPageProps
  }, [childFormContextData, editableConfig, getFormUtil])

  return (
    <EasyPage<
      CommonSubActPageState & {
        resourceName: SelectState<string>
      },
      CommonSubActPageProps
    >
      pageType="form"
      setFormUtil={useCallback(
        (ref) => {
          setChildFormRef(ref, childForm.id)
        },
        [childForm, setChildFormRef]
      )}
      components={components}
      pageId="resourceInfo"
      key={childForm.id}
      defaultValues={defaultValue}
      effects={useMemo(
        () => [...(effects ? effects({ getFormUtil, childForm }) : [])],
        [getFormUtil, effects, value, childForm]
      )}
      onChange={useCallback(
        (context) => {
          const { hasChanged, value, ...rest } = context
          console.log(':::value', value)

          if (hasChanged('resourceName')) {
            const option = value.resourceName?.options?.find(
              (item) =>
                item.resourceMaterialTemplateId === value.resourceName.choosed
            )
            onChildFormChanged({
              idx: formIndex,
              childForm: {
                ...childForm,
                label: (option?.resourceName as string) || '',
              },
            })
          }

          handleChange?.({
            ...rest,
            value,
          } as EasyPageOnChangeContext<CommonSubActPageState>)
        },
        [onChildFormChanged, handleChange, childForm, formIndex]
      )}
      commonUIConfig={useMemo(
        () => ({
          form: {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
            labelAlign: 'right',
            colon: false,
          },
        }),
        []
      )}
      context={contextMemo as any}
      {...pageInfo}
    />
  )
}

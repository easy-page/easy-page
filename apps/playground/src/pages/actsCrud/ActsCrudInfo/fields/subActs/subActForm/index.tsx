import {
  ChildFormItem,
  DEFAULT_COMPONENTS,
  EXTRA_COMPONENTS,
  EasyPage,
  EasyPageEffect,
  EasyPageOnChangeContext,
  FormUtil,
} from '@easy-page/antd-ui'
import { actDetailModel, CUSTOM_COMPONENTS, toNumber } from '@/common'

import {
  CommonActCrudFormState,
  CommonActCrudFormProps,
  CommonSubActPageProps,
  CommonSubActPageState,
  SubActFormProps,
} from '../../interface'
import { useCallback, useMemo } from 'react'
import {
  factorChangeEffects,
  pnsChangeEffects,
  syncFactorsForNewAct,
} from './effects'
import Big from 'big.js'
import { getSubActDisEditableConfig } from './utils'
import { configListModel } from '@/common/models/configList'

export type CustomEffectContext = {
  childForm: ChildFormItem
  getFormUtil: () => FormUtil<CommonActCrudFormState>
}

/** 子活动 */
export const SubActForm = ({
  childFormContextData,
  onChildFormChanged,
  handleChange,
  formIndex,
  frameworkProps: { getFormUtil },
  childForm,
  setChildFormRef,
  value,
  disabled,
  pageInfo,
  effects,
  setCanAdd,
}: SubActFormProps<CommonActCrudFormState, CommonActCrudFormProps> & {
  setCanAdd: (canAdd: boolean) => void
  effects?: (
    context: CustomEffectContext
  ) => EasyPageEffect<CommonSubActPageState>[]
}) => {
  const defaultValue = useMemo(() => {
    console.log('default value memo')
    return syncFactorsForNewAct({
      defaultVals: value.childFormDefaultValues,
      curId: childForm.id,
      formUtils: value.formUtils,
    })
    // return get(value.childFormDefaultValues, childForm.id) || {}
  }, [childForm, value.formUtils, value.childFormDefaultValues])

  const { data: actDetail } = actDetailModel.getData()
  const { data: configs } = configListModel.getList()
  const editableConfig = useMemo(() => {
    return getSubActDisEditableConfig(actDetail, { disabled, configs })
  }, [actDetail, disabled, configs])

  console.log(
    'editableConfigeditableConfig:',
    JSON.stringify(defaultValue.qualify)
  )
  const components = useMemo(
    () => ({
      ...DEFAULT_COMPONENTS,
      ...EXTRA_COMPONENTS,
      ...CUSTOM_COMPONENTS,
    }),
    []
  )

  const subActCount = value.childForms.length

  const contextMemo = useMemo(() => {
    console.log('pageProps asaadassasda:', childFormContextData)
    return {
      ...(childFormContextData || {}),
      editable: editableConfig,
      subActCount: subActCount,
      getFormUtil,
    } as CommonSubActPageProps
  }, [childFormContextData, subActCount, editableConfig, getFormUtil])

  return (
    <EasyPage<CommonSubActPageState, CommonSubActPageProps>
      pageType="form"
      setFormUtil={useCallback(
        (ref) => {
          setChildFormRef(ref, childForm.id)
        },
        [childForm, setChildFormRef]
      )}
      components={components}
      pageId="subAct"
      key={childForm.id}
      defaultValues={defaultValue}
      effects={useMemo(
        () => [
          {
            changedKeys: ['qualify'],
            action(context) {
              const parentFormUtil = getFormUtil?.()
              factorChangeEffects({ ...context, parentFormUtil })
            },
          },
          {
            changedKeys: ['openGuide'],
            action({ value }) {
              // 引导建品打开则不允许添加，反之可以添加
              setCanAdd(!value.openGuide)
            },
          },
          {
            changedKeys: ['name'],
            action() {
              const actNameKey = 'name'
              /** 验证所有 Tab 的 actName，除了本身外 */
              const { choosedItemId, formUtils = {} } = value
              const otherChildFormKeys = Object.keys(formUtils).filter(
                (x) => x !== choosedItemId
              )
              otherChildFormKeys.forEach((e) => {
                if (formUtils[e]?.getFieldValue(actNameKey)) {
                  /** 存在才做重复性校验，否则不做 */
                  formUtils[e]?.validate([actNameKey])
                }
              })
            },
          },

          ...(effects ? effects({ getFormUtil, childForm }) : []),
        ],
        []
      )}
      onChange={useCallback(
        (context) => {
          const { hasChanged, value, ...rest } = context
          if (hasChanged('name')) {
            onChildFormChanged({
              idx: formIndex,
              childForm: { ...childForm, label: value.name || '' },
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

import {
  DEFAULT_COMPONENTS,
  EXTRA_COMPONENTS,
  EasyPage,
} from '@easy-page/antd-ui'
import {
  CUSTOM_COMPONENTS,
  CrudPlanParams,
  CurdActParamsEnum,
  SubMarketingPlan,
  SubMarketingPlanStatus,
} from '@/common'
import { useParamsInfo } from '@/common/hooks'
import { SubPlanFormComponent } from '@/pages/plansCrud/fields/subPlan'
import { ShenQuanSubPlanFormState, ShenQuanSubPlanFormProps } from './interface'
import { shenQuanSubPlanInfo } from './pageInfo'
import { getEditableConfig } from './utils'
import { useEffect, useState } from 'react'

export const ShenQuanSubsidyForm: SubPlanFormComponent = ({
  curForm,
  curIdx,
  onChildFormChanged,
  setChildFormRef,
  childFormContextData,
  value,
  groupStatus,
}) => {
  const curFormDefaultVal = value.childFormDefaultValues?.[curForm.id] || {}
  const { params } = useParamsInfo<CrudPlanParams>()

  const [editConfig, setEditConfig] = useState(
    getEditableConfig({
      defaultValue: curFormDefaultVal as SubMarketingPlan,
      mode: params[CurdActParamsEnum.OperationType],
    })
  )

  useEffect(() => {
    setEditConfig(
      getEditableConfig({
        defaultValue: {
          ...curFormDefaultVal,
          groupStatus,
        } as SubMarketingPlan,
        mode: params[CurdActParamsEnum.OperationType],
      })
    )
  }, [groupStatus])
  return (
    <EasyPage<ShenQuanSubPlanFormState, ShenQuanSubPlanFormProps>
      pageType="form"
      commonUIConfig={{
        form: {
          labelCol: { span: 3 },
          wrapperCol: { span: 12 },
        },
        formItem: {
          colon: false,
        },
      }}
      defaultValues={curFormDefaultVal}
      setFormUtil={(ref) => {
        setChildFormRef(ref, curForm.id)
      }}
      effects={[
        {
          changedKeys: ['baseInfo.subPlanName'],
          action({ value: val }) {
            onChildFormChanged({
              idx: curIdx,
              childForm: {
                ...curForm,
                label: val['baseInfo.subPlanName'] || '',
              },
            })
          },
        },
      ]}
      components={{
        ...DEFAULT_COMPONENTS,
        ...EXTRA_COMPONENTS,
        ...CUSTOM_COMPONENTS,
      }}
      context={
        {
          curFormId: curForm.id,
          curFormIdx: curIdx,
          ...childFormContextData,
          editable: editConfig,
        } as ShenQuanSubPlanFormProps
      }
      {...shenQuanSubPlanInfo}
    />
  )
}

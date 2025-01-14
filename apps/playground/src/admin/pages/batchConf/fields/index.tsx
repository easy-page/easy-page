import { CUSTOM_ADMIN_COMPONENTS } from '@/admin/common/components/easyPage'
import {
  DEFAULT_COMPONENTS,
  EasyPage,
  EXTRA_COMPONENTS,
  FormUtil,
  PageInfo,
  SelectState,
} from '@easy-page/antd-ui'
import { BatchFilterFormState, BatchFilterFormProps } from './interface'
import { ConfigId } from '@/admin/common/constant/configDiff'
import { observer } from 'mobx-react'
import { fullConfigsModel } from '@/admin/common/models/fullConfigs'
import { useMemo } from 'react'
import { chooseActs } from './chooseAct'
import { chooseField } from './chooseField'
import { getBatchConfigFilterPageInfo } from './pageInfo'

export const BatchFilterForm = observer(
  ({
    onChoosedFieldChange,
    formRef,
  }: {
    formRef: React.MutableRefObject<FormUtil<BatchFilterFormState>>
    onChoosedFieldChange: (value: SelectState<ConfigId[]>) => void
  }) => {
    const { data: configs } = fullConfigsModel.getList()
    const configFilterPageInfo = useMemo(() => {
      console.log('casdsadasdsadsaasdsaasd:', configs.length)
      const nodesInfo = getBatchConfigFilterPageInfo([
        chooseActs({ configs }),
        chooseField,
      ])
      return nodesInfo
    }, [configs])
    return (
      <EasyPage<BatchFilterFormState, BatchFilterFormProps>
        pageType="form"
        setFormUtil={(ref) => {
          formRef.current = ref
        }}
        {...configFilterPageInfo}
        onChange={({ value }) => {
          if (value.chooseField) {
            onChoosedFieldChange(value.chooseField)
          }
        }}
        commonUIConfig={{
          form: {
            // labelCol: { span: 4 },
            // wrapperCol: { span: 18 },
            className: 'px-4 pt-4 w-full',
            layout: 'inline',
          },
          formItem: {
            colon: false,

            className: 'min-w-[800px]',
          },
        }}
        components={{
          ...DEFAULT_COMPONENTS,
          ...EXTRA_COMPONENTS,
          ...CUSTOM_ADMIN_COMPONENTS,
        }}
      />
    )
  }
)

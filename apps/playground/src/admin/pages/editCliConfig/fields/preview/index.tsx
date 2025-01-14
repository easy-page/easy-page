import { nodeUtil } from '@easy-page/antd-ui'
import { Preview } from './components/Preview'
import { EditCliConfigFormState, EditCliConfigFormProps } from '../../interface'
import { useEffect, useMemo } from 'react'
import { prepareFieldConfig } from '../../utils/prepareFieldConfig'
import { useParamsInfo, CrudActParams, OperationType } from '@/common'

export const fieldsPreview = nodeUtil.createCustomNode<
  any,
  EditCliConfigFormState,
  EditCliConfigFormProps
>(
  'fieldsPreview',
  ({ frameworkProps: { store } }) => {
    const { fields, template, belong, fullConfig, ...fieldsConfigs } =
      store.pageState

    const { appendParamToUrl, params } = useParamsInfo<CrudActParams>()
    const fieldConfigs = useMemo(() => {
      return prepareFieldConfig({
        fieldIds: fields,
        configs: fieldsConfigs,
        belong,
        template: (template.choosed || '') as string,
      })
    }, [fields, fieldsConfigs, belong, template])
    useEffect(() => {
      setTimeout(() => {
        appendParamToUrl({
          operationType: OperationType.CREATE,
          actId: params.actId,
        })
      }, 1000)
    }, [])
    return (
      <Preview
        template={template.choosed}
        fullConfig={fullConfig}
        fieldConfigs={fieldConfigs}
      />
    )
  },
  {
    effectedKeys: [
      'fields',
      'refreshConfig',
      'template',
      'belong',
      'fullConfig',
    ],
  }
)

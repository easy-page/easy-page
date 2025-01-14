import { nodeUtil } from '@easy-page/antd-ui'
import { Cascader } from 'antd'
import { EditCliConfigFormState, EditCliConfigFormProps } from '../../interface'
import { get } from 'lodash'
import { TemplateMap } from '../../constants'
import { FieldsTreeData } from '../../constants/fieldTrees'

const FieldsKey = 'fullConfig.crudConfig.fields'
export const chooseFields = nodeUtil.createCustomField<
  Array<string[]>,
  EditCliConfigFormState,
  EditCliConfigFormProps
>(
  'fields',
  '选择字段',
  ({ value, onChange }) => {
    console.log('valuevalue:', value)
    return (
      <Cascader
        showSearch={false}
        style={{ width: '100%' }}
        value={value as any}
        maxTagCount={4}
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        placeholder="请选择字段"
        multiple
        showCheckedStrategy={Cascader.SHOW_CHILD}
        allowClear
        onChange={(e) => {
          onChange(e)
        }}
        options={FieldsTreeData}
      />
    )
  },
  {
    actions: [
      {
        effectedKeys: ['template'],
        initRun: true,
        action: ({ effectedData, initRun, value }) => {
          const template = effectedData['template']?.choosed
          const ids = (TemplateMap[template] || []).map((e) =>
            e.fullId.split('.')
          )
          console.log('12321321312:', value, initRun)
          if (initRun && value.length > 0) {
            return {}
          }
          return {
            fieldValue: ids,
          }
        },
      },
    ],
    postprocess({ value, pageState }) {
      const { fields } = pageState
      return {
        'crudConfig.fields': [...fields],
        // [FieldsKey]: prepareFieldConfig({
        //   fieldIds: value,
        //   configs: fieldsConfigs,
        //   belong,
        // }),
      }
    },
    preprocess({ defaultValues }) {
      const defaultVal = (get(defaultValues, FieldsKey) || []) as string[][]
      console.log('defaultValdefaultVal:', defaultVal, defaultValues)
      return defaultVal
      // return extractLeafFullIdPaths(defaultVal)
    },
  }
)

import { fieldListModel, loadFieldListToModel } from '@/admin/common'
import { FieldBelongSecText, FieldBelongText } from '@/common'
import {
  SelectState,
  UI_COMPONENTS,
  nodeUtil,
  searchAction,
} from '@easy-page/antd-ui'
import { observer } from 'mobx-react'

export const fields = nodeUtil.createField<SelectState<number[]>>(
  'fields',
  '生成字段',
  {
    mode: 'multiple',
    value: { choosed: [], keyword: '' },
    preprocess({ defaultValues }) {
      const choosed = defaultValues?.crudConfig?.fields || []
      return {
        choosed,
      }
    },
    postprocess: ({ value }) => {
      return {
        'crudConfig.fields': value.choosed ? value.choosed : [],
      }
    },
    required: true,
    actions: [
      {
        effectedKeys: ['fields'],
        /** 初始化执行 */
        initRun: true,
        /** 初始化查询选中数据 */
        action: async ({ value, initRun }) => {
          const result = await searchAction({
            uniqKey: 'id',
            async searchByChoosed(choosed) {
              if (choosed.length === 0) {
                return []
              }
              fieldListModel.changePage({ pageSize: 10000, pageNo: 1 })
              fieldListModel.setFilters({
                fieldIds: choosed,
              })
              const result = await loadFieldListToModel()
              fieldListModel.setFilters({
                fieldName: '',
                fieldIds: undefined,
              })
              if (!result.error) {
                return result.data || []
              }
              return []
            },
            async searchByKeyword(keyword) {
              fieldListModel.setFilters({
                fieldName: keyword,
                fieldIds: undefined,
              })
              const result = await loadFieldListToModel()
              fieldListModel.setFilters({
                fieldName: '',
                fieldIds: undefined,
              })
              if (!result.error) {
                return result.data || []
              }
              return []
            },
            initRun,
            value,
          })
          return result
        },
      },
    ],
  },
  {
    ui: UI_COMPONENTS.SELECT,
    select: {
      allowClear: true,
      showSearch: true,
      filterOption: false,
      notFoundContent: null,
      optionRender: ({ label, data }) => {
        const belongStrs = (data as any).belong
          .split('.')
          .filter((x) => Boolean(x))
        const belongText = belongStrs
          .map((e) => FieldBelongText[e] || FieldBelongSecText[e])
          .join('/')
        return `【${belongText}】${label}`
      },
      labelRender: observer(({ value, label }) => {
        const { data = [] } = fieldListModel.getList()
        const node: any = data.find((e: any) => e.fieldId === value)
        const belongStrs = (node as any).belong
          .split('.')
          .filter((x) => Boolean(x))
        const belongText = belongStrs
          .map((e) => FieldBelongText[e] || FieldBelongSecText[e])
          .join('/')
        return <div>{node?.belong ? `【${belongText}】${label}` : label}</div>
      }),
      placeholder: '支持通过 fieldName 进行搜索',
      fieldNames: {
        value: 'fieldId',
        label: 'fieldName',
      },
    },
    formItem: {
      extra:
        '选择需要自动生成的字段，它会生成通用逻辑字段，然后你可以基于此进行迭代',
    },
  }
)

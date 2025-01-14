import {
  SelectEffectType,
  SelectState,
  UI_COMPONENTS,
  nodeUtil,
  searchAction,
} from '@easy-page/antd-ui'
import { SearchRuleId } from './constant'
import {
  brandSelectListModel,
  loadBrandSelectListToModel,
} from '@/common/models/brandSelectList'
export const brandName = nodeUtil.createField<
  SelectState<number[]>,
  {
    brandIds: string
    brandIds4Select: number
  },
  {},
  SelectEffectType
>(
  SearchRuleId.BrandIds4Select,
  '业务品牌名称',
  {
    value: {
      choosed: [],
    },
    postprocess: ({ value }) => {
      return {
        [SearchRuleId.BrandIds4Select]: value?.choosed
          ? value?.choosed
          : undefined,
      }
    },
    mode: 'multiple',
    actions: [
      {
        initRun: true,
        effectedKeys: ['brandIds4Select'],
        action: async ({ value, initRun }) => {
          const { data } = brandSelectListModel.getList()
          if (!data || data.length === 0) {
            await loadBrandSelectListToModel()
          }

          const result = await searchAction({
            uniqKey: 'value',
            async searchByChoosed() {
              return []
            },
            async searchByKeyword(keyword) {
              const { data } = brandSelectListModel.getList()

              if (keyword) {
                console.log('keyword',keyword);
                
                return (data || []).filter((item) =>
                  item.label.includes(keyword)
                )
              }
              return data
            },
            initRun,
            value,
          })
          if (!result.fieldValue) {
            return {}
          }
          return {
            fieldValue: {
              ...result.fieldValue,
              choosed: result?.fieldValue?.choosed as [],
            },
            validate: false,
          }
        },
      },
    ],
  },
  {
    ui: UI_COMPONENTS.SELECT,
    select: {
      // labelInValue: true,
      showSearch: true,
      placeholder: '请选择',
      filterOption: false,
      fieldNames: {
        label: 'label',
        value: 'value',
      },
      handleChange({ value, preValue, onChange, frameworkProps: { store } }) {
        const { data } = brandSelectListModel.getList()
        onChange({
          options: data,
          choosed: value,
        })
      },
    },
    formItem: {
      wrapperCol: { span: 18 },
      className: 'max-w-[500px]',
    },
  }
)

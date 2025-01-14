import {
  SelectEffectType,
  SelectState,
  UI_COMPONENTS,
  nodeUtil,
  searchAction,
} from '@easy-page/antd-ui'
import {
  brandSelectListModel,
  loadBrandSelectListToModel,
} from '@/common/models/brandSelectList'
export const inviteBrandName = nodeUtil.createField<
  SelectState<number[]>,
  {
    brandIds: string
    brandId: number
  },
  {},
  SelectEffectType
>(
  'brandId',
  '业务品牌名称',
  {
    value: {
      choosed: [],
    },
    postprocess: ({ value }) => {
      return {
        brandId: value.choosed ? value.choosed : undefined,
      }
    },
    mode: 'multiple',
    actions: [
      {
        initRun: true,
        effectedKeys: ['brandId'],
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
              choosed: result.fieldValue?.choosed as [],
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
      className: 'max-w-[460px]',
    },
  }
)

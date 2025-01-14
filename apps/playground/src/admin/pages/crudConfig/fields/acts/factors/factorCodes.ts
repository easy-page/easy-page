import {
  factorListModel,
  loadFactorListToModel,
} from '@/admin/common/models/factorList'
import { AuthTypeEnum, AuthTypeText } from '@/common'
import {
  SelectState,
  UI_COMPONENTS,
  nodeUtil,
  searchAction,
} from '@easy-page/antd-ui'
import { get } from 'lodash'

export const factorCodes = nodeUtil.createField<SelectState<AuthTypeEnum[]>>(
  'factorCodes',
  '因子',
  {
    mode: 'multiple',
    value: { choosed: [], keyword: '' },
    preprocess({ defaultValues }) {
      console.log('actFactorInfo defaultValues:', defaultValues.config)
      const choosed =
        get(defaultValues, 'config.actFactorInfo.factorCodes') || []

      return { choosed }
    },
    postprocess: ({ value }) => {
      return {
        'config.actFactorInfo.factorCodes': value.choosed || [],
      }
    },
    actions: [
      {
        initRun: true,
        effectedKeys: ['factorCodes'],
        /** 初始化查询选中数据 */
        action: async ({ value, initRun }) => {
          const result = await searchAction({
            uniqKey: 'id',
            async searchByChoosed(choosed) {
              if (choosed.length === 0) {
                return []
              }

              factorListModel.setFilters({
                factorName: '',
                factorCode: '',
              })
              const result = await loadFactorListToModel()
              if (!result.error) {
                return result.data || []
              }
              return []
            },
            async searchByKeyword(keyword) {
              factorListModel.setFilters({
                factorName: keyword || '',
                factorCode: '',
              })
              const result = await loadFactorListToModel()
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

    required: true,
  },
  {
    ui: UI_COMPONENTS.SELECT,
    select: {
      allowClear: true,
      showSearch: false,
      filterOption: false,
      notFoundContent: null,
      placeholder: '请选择',
      optionRender: ({ data, label }) => {
        return `【${data.categoryCode}】${label}`
      },
      fieldNames: {
        value: 'factorCode',
        label: 'factorName',
      },
    },
    formItem: { extra: '活动创建时，当前活动需要配置的因子' },
  }
)

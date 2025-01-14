import { ConfigId, ConfigIdText } from '@/admin/common/constant/configDiff'
import {
  nodeUtil,
  searchAction,
  SelectState,
  UI_COMPONENTS,
} from '@easy-page/antd-ui'

const ChooseOptions = Object.keys(ConfigIdText)
  .map((e) => {
    return {
      value: e,
      label: ConfigIdText[e] || '',
    }
  })
  .filter(
    (x) =>
      ![ConfigId.ActType, ConfigId.PlanType, ConfigId.TemplateInfo].includes(
        x.value as ConfigId
      )
  )

export const ChooseFieldDefaultState = {
  choosed: [],
  options: [...ChooseOptions],
}

export const chooseField = nodeUtil.createField<SelectState<ConfigId[]>>(
  'chooseField',
  '选择配置',

  {
    required: true,
    mode: 'multiple',
    value: ChooseFieldDefaultState,
    postprocess({ value }) {
      return {
        chooseField: value.choosed,
      }
    },
    preprocess({ defaultValues }) {
      return {
        choosed: defaultValues.chooseField || [],
        options: ChooseOptions,
      }
    },
    actions: [
      {
        /** 初始化执行 */
        initRun: true,
        effectedKeys: ['chooseField'],
        /** 初始化查询选中数据 */
        action: async ({ value, initRun }) => {
          const result = await searchAction({
            uniqKey: 'value',
            async searchByChoosed() {
              return []
            },
            async searchByKeyword(keyword) {
              if (keyword === undefined) {
                return [...ChooseOptions]
              }
              return [...ChooseOptions].filter((e) => e.label.includes(keyword))
            },
            initRun,
            value,
          })
          return {
            ...result,
            validate: false,
          }
        },
      },
    ],
  },
  {
    ui: UI_COMPONENTS.SELECT,
    formItem: {
      className: 'mb-2',
    },
    select: {
      placeholder: '请选择',
      allowClear: true,
      showSearch: true,
      filterOption: false,
      notFoundContent: null,
      className: 'w-[400px] mb-4',
    },
  }
)

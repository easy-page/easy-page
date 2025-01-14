import { IsConfigTemplate } from '@/common'
import { ConfigListInfo } from '@/common/apis/getConfigList'
import {
  nodeUtil,
  searchAction,
  SelectState,
  UI_COMPONENTS,
} from '@easy-page/antd-ui'

export const chooseActs = ({ configs }: { configs: ConfigListInfo[] }) => {
  const fullOptions = configs
    .filter((x) => x.isTemplate === IsConfigTemplate.No)
    .map((e) => ({ label: e.name, value: e.id }))
  return nodeUtil.createField<SelectState<number[]>>(
    'chooseActs',
    '更新的配置',
    {
      required: true,
      mode: 'multiple',
      value: {
        choosed: [],
        options: fullOptions,
      },

      validate: ({ value }) => {
        if (!value || value.choosed?.length === 0) {
          return { success: false, errorMsg: '请选择批量更新的配置' }
        }
        return { success: true }
      },

      actions: [
        {
          /** 初始化执行 */
          initRun: true,
          effectedKeys: ['chooseActs'],
          /** 初始化查询选中数据 */
          action: async ({ value, initRun }) => {
            const result = await searchAction({
              uniqKey: 'value',
              async searchByChoosed() {
                return []
              },
              async searchByKeyword(keyword) {
                if (keyword === undefined) {
                  return [...fullOptions]
                }
                return [...fullOptions].filter((e) => e.label.includes(keyword))
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
      postprocess({ value }) {
        return {
          chooseActs: value.choosed,
        }
      },
      preprocess({ defaultValues }) {
        return {
          choosed: defaultValues.chooseActs || [],
          options: fullOptions,
        }
      },
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
}

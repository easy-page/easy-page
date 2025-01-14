import {
  nodeUtil,
  searchAction,
  SelectState,
  UI_COMPONENTS,
} from '@easy-page/antd-ui'
import { IsConfigTemplate } from '@/common'
import { ConfigListInfo } from '@/common/apis/getConfigList'

export const recordIds = ({ configs }: { configs: ConfigListInfo[] }) => {
  const fullOptions = configs
    .filter((x) => x.isTemplate === IsConfigTemplate.No)
    .map((e) => ({ label: e.name, value: e.id }))
  return nodeUtil.createField<SelectState<number[]>>(
    'recordIds',
    '活动 ID',
    {
      required: true,
      mode: 'multiple',
      value: {
        choosed: [],
        options: fullOptions,
      },

      actions: [
        {
          /** 初始化执行 */
          initRun: true,
          effectedKeys: ['recordIds'],
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
          recordIds: value.choosed,
        }
      },
    },
    {
      ui: UI_COMPONENTS.SELECT,
      formItem: {
        className: '',
      },
      select: {
        placeholder: '请选择',
        allowClear: true,
        showSearch: true,
        filterOption: false,
        notFoundContent: null,
      },
    }
  )
}

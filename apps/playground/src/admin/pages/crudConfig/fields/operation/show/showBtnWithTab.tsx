import { PLAN_STATUS_DESC, toNumber } from '@/common'
import { nodeUtil, SelectState, UI_COMPONENTS } from '@easy-page/antd-ui'
import { get } from 'lodash'

const getTabId = (id: string) => `config.${id}.tab`

export const showBtnWithTab = <Tab extends number>(
  id: string,
  label: string,
  tabMap: Record<Tab, string>,
  options: {
    tabLabel: string
  }
) =>
  nodeUtil.createField<SelectState<Tab[]>>(
    getTabId(id),
    options.tabLabel,
    {
      value: {
        choosed: [],
      },
      mode: 'multiple',
      when: {
        effectedKeys: [id],
        show({ effectedData }) {
          return effectedData[id] === true
        },
      },
      postprocess: ({ value }) => {
        return {
          [getTabId(id)]: value.choosed,
        }
      },
      preprocess: ({ defaultValues }) => {
        return {
          choosed: get(defaultValues, getTabId(id)),
          options: Object.keys(tabMap).map((e) => ({
            label: tabMap[e],
            value: toNumber(e),
          })),
        }
      },
    },
    {
      ui: UI_COMPONENTS.SELECT,
      select: {
        placeholder: options.tabLabel,
      },
      formItem: {
        customExtra: ({ value }) => (
          <div>
            当{options.tabLabel}为 「
            {(value.choosed || []).map((e) => tabMap[e]).join('、')}」
            所选状态时，展示「{label}」，不选则不判断{options.tabLabel}
            ，根据开关展示
          </div>
        ),
      },
    }
  )

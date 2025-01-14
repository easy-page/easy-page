import { PLAN_STATUS_DESC, toNumber } from '@/common'
import { nodeUtil, SelectState, UI_COMPONENTS } from '@easy-page/antd-ui'
import { get } from 'lodash'

const getStatusId = (id: string) => `config.${id}.showWithStatus`

export const showBtnWithStatus = <Status extends number>(
  id: string,
  label: string,
  statusMap: Record<Status, string>,
  options: {
    statusLabel: string
  }
) =>
  nodeUtil.createField<SelectState<Status[]>>(
    getStatusId(id),
    options.statusLabel,
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
          [getStatusId(id)]: value.choosed,
        }
      },
      preprocess: ({ defaultValues }) => {
        return {
          choosed: get(defaultValues, getStatusId(id)),
          options: Object.keys(statusMap).map((e) => ({
            label: statusMap[e],
            value: toNumber(e),
          })),
        }
      },
    },
    {
      ui: UI_COMPONENTS.SELECT,
      select: {
        placeholder: options.statusLabel,
      },
      formItem: {
        customExtra: ({ value }) => (
          <div>
            当{options.statusLabel}为 「
            {(value.choosed || []).map((e) => statusMap[e]).join('、')}」
            所选状态时，展示「{label}」，不选则不判断状态，根据开关展示
          </div>
        ),
      },
    }
  )

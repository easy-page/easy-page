import { CUSTOM_AMIN_COMPONENTS_UI } from '@/admin/common/components/easyPage'
import { nodeUtil, UI_COMPONENTS } from '@easy-page/antd-ui'
import { get } from 'lodash'

const getShowId = (id: string) => `config.${id}.show`

export const showBtnSwitch = (
  id: string,
  label: string,
  options: {
    tips?: string
  }
) =>
  nodeUtil.createField(
    id,
    label,
    {
      value: false,
      postprocess({ value }) {
        return {
          [getShowId(id)]: value,
        }
      },
      preprocess({ defaultValues }) {
        return get(defaultValues, getShowId(id)) ?? false
      },
    },
    {
      ui: UI_COMPONENTS.SWITCH,
      formItem: {
        extra: options.tips || '',
      },
      layoutUI: CUSTOM_AMIN_COMPONENTS_UI.ZSPT_LAYOUT,
      zsptLayout: {
        indentation: true,
        childrenContainerClassName:
          'min-w-[800px] border border-inherit p-4 rounded mb-2',
        layoutFormItem: {
          labelClass: 'ant-col-4',
          wrapClass: 'ant-col-12',
        },
        showLayout: (val) => {
          return val === true
        },
      },
    }
  )

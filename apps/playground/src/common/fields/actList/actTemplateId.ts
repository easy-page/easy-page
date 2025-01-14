import { getActTemplateOptions } from '@/common/configs'
import { OPTION_ALL, ALL } from '@/common/constants'
import { userModel } from '@/common/models'
import { configListModel } from '@/common/models/configList'
import { nodeUtil, SelectState, UI_COMPONENTS } from '@easy-page/antd-ui'

export const actTemplateId = nodeUtil.createField<SelectState<number>>(
  'templateId',
  '促销类型',
  {
    value: {
      choosed: ALL,
    },
    mode: 'single',
    preprocess({ defaultValues }) {
      const { data: configs } = configListModel.getList()
      const { data: userInfo } = userModel.getData()
      
      const options = getActTemplateOptions({ configs, userMis: userInfo?.mis })
      return {
        choosed: defaultValues?.templateId || ALL,
        options: [OPTION_ALL, ...options],
      }
    },
    postprocess: ({ value }) => {
      return {
        templateId: value.choosed || OPTION_ALL.value,
      }
    },
  },
  {
    ui: UI_COMPONENTS.SELECT,
    select: {
      showSearch: false,
    },
  }
)

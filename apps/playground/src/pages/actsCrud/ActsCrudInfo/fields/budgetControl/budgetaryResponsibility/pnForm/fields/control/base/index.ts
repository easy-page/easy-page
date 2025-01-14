import { PnControl } from '@/pages/actsCrud/ActsCrudInfo/fields/interface'
import { nodeUtil } from '@easy-page/antd-ui'

export const basePnControl = () =>
  nodeUtil.createField<PnControl>(
    'control',
    '',
    {
      mode: 'single',
      postprocess: ({ value }) => {
        return {
          degree: value,
        }
      },
      preprocess: ({ defaultValues }) => {
        return defaultValues.degree
      },
    },
    {
      formItem: {
        // noStyle: true,
        className: 'mb-0',
        extra: '强弱管控有校验提醒，强管控超出预算下线',
      },
    }
  )

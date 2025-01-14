import { ConfigType } from '@/common'
import { AuthUrl } from '@/common'
import { nodeUtil } from '@easy-page/antd-ui'

export const authUrl = nodeUtil.createField(
  'authUrl',
  '鉴权接口路径',
  {
    value: '',
    mode: 'single',
    actions: [
      {
        effectedKeys: ['type'],
        initRun: true,
        action: ({ effectedData }) => {
          const isAct = effectedData['type'] === `${ConfigType.Act}`
          console.log('effectedData[', effectedData['type'])
          return {
            fieldValue: isAct ? AuthUrl.ActAuth : AuthUrl.PlanAuth,
          }
        },
      },
    ],
  },
  {
    radioGroup: {
      options: [
        {
          label: '方案鉴权路径',
          value: AuthUrl.PlanAuth,
        },
        {
          label: '活动鉴权路径',
          value: AuthUrl.ActAuth,
        },
      ],
    },
  }
)

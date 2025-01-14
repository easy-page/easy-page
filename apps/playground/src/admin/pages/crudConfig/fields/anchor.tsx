import { nodeUtil } from '@easy-page/antd-ui'
import { Anchor } from 'antd'
import { PrimaryTitleEnum, PrimaryTitleText } from './titleContainers'
import { ConfigType, IsConfigTemplate } from '@/common'

export const anchor = nodeUtil.createCustomNode<PrimaryTitleEnum[]>(
  'anchor',
  ({ value }) => {
    return (
      <Anchor
        className="fixed top-[20px] right-[0] pr-[20px] bg-white"
        items={value.map((e) => {
          return {
            key: e,
            href: `#${e}`,
            title: PrimaryTitleText[e],
          }
        })}
      />
    )
  },

  {
    actions: [
      {
        effectedKeys: ['type', 'isTemplate'],
        initRun: true,
        action: ({ effectedData }) => {
          const isAct = effectedData['type'] === `${ConfigType.Act}`
          const isTemplate =
            effectedData['isTemplate'] === `${IsConfigTemplate.Yes}`
          const cliTitle = isTemplate ? [] : [PrimaryTitleEnum.CliSettings]
          return {
            fieldValue: isAct
              ? [
                  PrimaryTitleEnum.BasicInfo,
                  ...cliTitle,
                  PrimaryTitleEnum.ActSettings,
                  PrimaryTitleEnum.CommonSettings,
                ]
              : [
                  PrimaryTitleEnum.BasicInfo,
                  ...cliTitle,
                  PrimaryTitleEnum.PlanSettings,
                  PrimaryTitleEnum.CommonSettings,
                ],
          }
        },
      },
    ],
    value: [],
  }
)

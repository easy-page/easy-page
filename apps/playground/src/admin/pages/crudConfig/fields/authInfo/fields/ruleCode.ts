import { GrayRuleCode } from '@/common'
import { nodeUtil } from '@easy-page/antd-ui'

/**
 *
 * 有点特殊，这里的默认值需要去：authInfoFormField preprocess 指定，提交时才有效
 */
export const ruleCode = (id: string, name: string) =>
  nodeUtil.createField<GrayRuleCode[]>(
    'ruleCode',
    name,
    {
      mode: 'multiple',
      value: [GrayRuleCode.FlowControlGray],
      required: true,
    },
    {
      checkBoxGroup: {
        options: [
          {
            label: `灰度开关控制（${GrayRuleCode.FlowControlGray}）`,
            value: GrayRuleCode.FlowControlGray,
          },
          {
            label: `灰度开关控制（${GrayRuleCode.PoiExpScoreGray}）`,
            value: GrayRuleCode.PoiExpScoreGray,
          },
          {
            label: `灰度开关控制（${GrayRuleCode.IceMarkGray}）`,
            value: GrayRuleCode.IceMarkGray,
          },
          {
            label: `灰度开关控制（${GrayRuleCode.NonKaConfirmGray}）`,
            value: GrayRuleCode.NonKaConfirmGray,
          },
        ],
      },
      formItem: {
        extra: '当前操作如果需要做灰度鉴权，则配置此选项',
      },
    }
  )

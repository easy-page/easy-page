import { nodeUtil } from '@easy-page/antd-ui'
import { CommonActCrudFormState } from '../../interface'
import { Input } from 'antd'

const MaxLength = 500

/**
 * - 无论表单如何变化，都不展示预算申请理由
 * - 提交的时候如果要填写就展示，否则不展示
 * - 提交时候校验，如果需要就提交理由，否则不提交
 */
export const applyReasonField = nodeUtil.createCustomField<
  string,
  CommonActCrudFormState
>(
  'applyReason',
  '预算申请理由',
  ({ value, onChange, disabled }) => {
    return (
      <Input.TextArea
        disabled={disabled}
        value={value}
        placeholder="请输入预算申请理由"
        onChange={(e) => {
          onChange(e.target.value)
        }}
      ></Input.TextArea>
    )
  },
  {
    required: true,
    value: '',
    preprocess: ({ defaultValues }) => {
      // 查看和编辑不展示预算申请理由，不用处理默认值，要处理就是提交的时候看要不要展示。
      return ''
    },
    postprocess: ({ value }) => {
      return {
        budgetApplyReason: value,
      }
    },
    validate: ({ value }) => {
      if (!value) {
        return { success: false, errorMsg: '请输入预算申请理由' }
      }
      if (value.length > MaxLength) {
        return { success: false, errorMsg: `请输入不超过 ${MaxLength} 个字` }
      }
      return { success: true }
    },
    actions: [
      {
        effectedKeys: ['applyReasonContainer'],
        initRun: true,
        action: async ({ effectedData }) => {
          const pnsInfo = effectedData['applyReasonContainer']
          if (pnsInfo.needAuditOfApi) {
            return { fieldValue: '', validate: true }
          }
          return {}
        },
      },
    ],
    // actions: [
    //   {
    //     /** 门店类型变化，清空预算申请理由 */
    //     effectedKeys: ['poiType', 'chargeFlowType'],
    //     initRun: true,
    //     action: ({ initRun }) => {
    //       return { fieldValue: '', validate: initRun }
    //     },
    //   },
    // ],
  },
  {
    textArea: {
      size: 'middle',
    },
  }
)

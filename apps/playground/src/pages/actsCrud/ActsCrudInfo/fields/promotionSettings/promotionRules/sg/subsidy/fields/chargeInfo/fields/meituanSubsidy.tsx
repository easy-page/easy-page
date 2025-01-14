import { ChargeSideEnum, isEdit } from '@/common'
import { subsidyField } from '../common'
import { nodeUtil } from '@easy-page/antd-ui'
import { CommonActCrudFormState } from '@/pages/actsCrud/ActsCrudInfo/fields/interface'
import { Modal } from 'antd'
import { ConfirmSceneEnum } from '@/common/fields'
import { authNeededModel } from '@/common/models/authNeeded'

export const meituanSubsidyField = nodeUtil.extends(
  subsidyField({
    title: '美团承担',
    tooltip: `1、开通美补权限：美补金额不可超过10元。\n 
2、开通超美补权限：美补金额不限`,
    id: 'meituan',
    inputSuffix: '%',
    disabledMaxAmount: false,
    handleChange: ({
      onChange,
      value,
      preValue,
      frameworkProps: { store, nodeInfo },
    }) => {
      const { confirmDialogManager } = store.pageState as CommonActCrudFormState
      if (!preValue || !isEdit()) {
        onChange(value)
        return
      }
      confirmDialogManager?.confirm({
        callback() {
          onChange(value)
        },
        onConfirm() {
          Modal.confirm({
            centered: true,
            title: '提示',
            content: '修改后预算信息将联动修改，是否修改？',
            onOk() {
              onChange(value)
            },
          })
        },
        triggerField: nodeInfo.id,
        sence: ConfirmSceneEnum.MtChargeChangeConfirm,
      })
    },
    maxAmountValidateConfig: {
      errorMsg: `请输入0-999之间的数字，支持两位小数`,
      decimalNumber: 2,
    },
    maxLimit: {
      tips: '美补金额超出最大值限制，继续配置申请超美补权限',
      subsidyAmountCheckFromAdress:
        '/shangou/pages/grains/permission/apply?in_uoc_sys=true',
      /** 超过 10 元则提示 */
      subsidyAmountCheckConditions: 10,
      shouldNotice() {
        const { data = [] } = authNeededModel.getList()
        return !data.find((x) => x.authResult)?.authResult
      },
    },
    chargeSideCode: ChargeSideEnum.MeiTuanShanGou,
  }),

  {
    when() {
      return {
        effectedKeys: ['chargeFlowType'],
        show({ effectedData }) {
          const showSubsidy = effectedData['chargeFlowType']
          return showSubsidy && showSubsidy.length > 0
        },
      }
    },
  }
)

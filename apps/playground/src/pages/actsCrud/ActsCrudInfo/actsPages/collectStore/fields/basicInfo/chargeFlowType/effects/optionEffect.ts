import { FieldUIConfig } from '@easy-page/antd-ui'
import { set } from 'lodash'
import { zsptConfirm } from '@/common/components/zspt/ZsptConfirm'
import { ConfirmSceneEnum } from '@/common/fields/common'
import { CommonActCrudFormState } from '@/pages/actsCrud/ActsCrudInfo/fields'

/**
 * - 增加 tooltip
 * - 当门店类型选择全部的时候，补贴类型选一个就全选
 */
export const chargeOptionEffect: (
  oldFieldUIConfig?: FieldUIConfig | undefined
) => FieldUIConfig = (oldFieldUIConfig) => {
  const newConfig = oldFieldUIConfig || {}
  set(
    newConfig,
    'formItem.tooltip',
    '本活动需要哪些补贴方参与就选哪些，一定要选全'
  )

  // newConfig.formItem.customExtra = ({ frameworkProps: { store } }) => {
  //   const { poiType } = store.getAllState() as CommonSgActFormState
  //   if (poiType === PoiTypeEnum.Direct) {
  //     return '如需配置补贴，您需申请提报折扣-直营美补权限。'
  //   }
  // }

  newConfig.checkBoxGroup = newConfig.checkBoxGroup || {}
  newConfig.checkBoxGroup.handleChange = ({
    onChange,
    value,
    preValue,
    frameworkProps: { nodeInfo, store },
  }) => {
    const formData = store.pageState as CommonActCrudFormState
    const { actRule } = formData
    console.log('actRule', actRule)

    if (!preValue || !actRule?.actRule?.url) {
      onChange(value)
      return
    }

    const doChange = () => {
      onChange(value)
    }
    const { confirmDialogManager } = formData
    confirmDialogManager?.confirm({
      callback() {
        doChange()
      },
      onConfirm() {
        zsptConfirm({
          height: 170,
          title: '提示',
          content: '修改后优惠活动和预算管控信息会被清空，是否修改？',
          onOk() {
            doChange()
          },
        })
      },
      triggerField: nodeInfo.id,
      sence: ConfirmSceneEnum.ChargeChangeConfirm,
    })
  }

  return newConfig
}

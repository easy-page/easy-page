import { PoiTypeEnum, PoiTypeText } from '@/common'
import { nodeUtil } from '@easy-page/antd-ui'
import { set } from 'lodash'
import { Modal } from 'antd'
import { ConfirmSceneEnum } from '@/common/fields'
import {
  basePoiType,
  CommonActCrudFormState,
} from '@/pages/actsCrud/ActsCrudInfo/fields'

export const shyPoiType = nodeUtil
  .extends(basePoiType(), {
    fieldUIConfig(oldFieldUIConfig) {
      const newConfig = oldFieldUIConfig || {}
      newConfig.radioGroup = newConfig.radioGroup || {}
      newConfig.radioGroup = {
        ...newConfig.radioGroup,
        handleChange({ value, onChange, preValue, frameworkProps }) {
          const { store, nodeInfo } = frameworkProps
          const formData = store.pageState as CommonActCrudFormState
          const { confirmDialogManager } = formData

          // 逻辑调整：无论是否有内容都提示，暂时屏蔽下方
          // const hasContent = hasSubsidyContent(formData);
          // console.log('confirmDialogManager:', hasContent, confirmDialogManager)
          // if (!hasContent) {
          //   onChange(value)
          //   return;
          // }

          /** 优化一下，如果在这之前，当前字段没值，则不弹窗 */
          if (!preValue) {
            onChange(value)
            return
          }

          const doChange = () => {
            onChange(value)
          }
          confirmDialogManager?.confirm({
            callback() {
              doChange()
            },
            onConfirm() {
              Modal.confirm({
                centered: true,
                title: '提示',
                content: '修改后「优惠规则-差异化补贴」信息将清空，是否修改？',
                onOk() {
                  doChange()
                },
              })
            },
            triggerField: nodeInfo.id,
            sence: ConfirmSceneEnum.PoiTypeChangeConfirm,
          })
        },
      }

      set(
        newConfig,
        'formItem.tooltip',
        '选择直营门店时，后续活动邀请只能对直营门店发起邀请；选择代理门店同理；选择全部门店时可同时对直营和代理门店发起邀请。'
      )
      return newConfig
    },
    effectedKeys: [
      'confirmDialogManager',
      'ruleTable',
      'subsidyRuleInfo',
      'subsidyPercent',
    ],
  })
  .appendChildren([
    nodeUtil.createNode(PoiTypeEnum.All, { name: PoiTypeText.all }),
    nodeUtil.createNode(PoiTypeEnum.Direct, { name: PoiTypeText.direct }),
    nodeUtil.createNode(PoiTypeEnum.Agent, { name: PoiTypeText.agent }),
  ])

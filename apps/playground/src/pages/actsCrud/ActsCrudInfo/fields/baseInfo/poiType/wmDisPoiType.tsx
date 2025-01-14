/**
 * - 折扣菜门店类型
 * - 增加能力
 *  - 当修改门店类型的时候，弹窗提示：修改后补贴和预算信息将清空，是否修改？，确认后再修改
 *  - 弹窗只弹 1 次
 */

import { zsptConfirm } from '@/common/components/zspt/ZsptConfirm'
import { ConfirmSceneEnum } from '@/common/fields'
import {
  CommonActCrudFormState,
  commonInvitePoiType,
} from '@/pages/actsCrud/ActsCrudInfo/fields'
import { nodeUtil } from '@easy-page/antd-ui'

/** 外卖-折扣活动 */
export const wmDisPoiType = nodeUtil
  .extends(commonInvitePoiType, {
    fieldUIConfig(oldFieldUIConfig) {
      const newConfig = oldFieldUIConfig || {}
      newConfig.radioGroup = newConfig.radioGroup || {}
      newConfig.radioGroup.handleChange = ({
        value,
        preValue,
        onChange,
        frameworkProps: { nodeInfo, store },
      }) => {
        const formData = store.pageState as CommonActCrudFormState
        if (!preValue) {
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
              content: '修改后补贴分摊配置将清空，是否修改？', //todo
              onOk() {
                doChange()
              },
            })
          },
          triggerField: nodeInfo.id,
          sence: ConfirmSceneEnum.PoiTypeChangeConfirm,
        })
      }
      return newConfig
    },
  })
  .appendChildren([])

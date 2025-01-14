import {
  ActFullInfo,
  ActionTypeEnum,
  ActivityStatusEnum,
  DataTypeEnum,
  InputTypeEnum,
} from '@/common'
import { AnyNodeInfoType, nodeUtil } from '@easy-page/antd-ui'
import { get } from 'lodash'
import { CommonActCrudFormState } from '../../../../interface'

/**
 * - 追加商家、删除商家选项的装饰器
 * - 装饰器逻辑
 *   - “通过门店邀请-按条件筛选”时，不展示
 *   - 如果新建是不限制，则不展示
 *   - 如果活动状态是被排除掉的状态，则不展示
 *   - 如果当前活动状态是：生效中，展示，否则不展示
 */
export const appendOrDelDecorator = (options: {
  node: AnyNodeInfoType

  excludeStatus?: ActivityStatusEnum[]
}) => {
  return nodeUtil.extends<any, CommonActCrudFormState>(options.node, {
    when() {
      return {
        effectedKeys: ['activity'],
        show: ({ effectedData, defaultValues }) => {
          const status = effectedData['activity']?.status
          const dataType = get(defaultValues, 'invitation.dataType')
          const inputType = get(defaultValues, 'invitation.inputType')

          const defaultActionType =
            (defaultValues as any as ActFullInfo)?.invitation?.actionType ||
            ActionTypeEnum.Limited
          /** “通过门店邀请-按条件筛选”时，不可用 */
          if (
            dataType === DataTypeEnum.Poi &&
            inputType === InputTypeEnum.FilterAssemble
          ) {
            return false
          }

          if (defaultActionType === ActionTypeEnum.Unlimited) {
            // 如果开始选择了不限制，则无论发送前后，都不展示
            return false
          }

          if (Array.isArray(options?.excludeStatus)) {
            return !options.excludeStatus.includes(status)
          }

          /** 生效中允许操作 */
          return status === ActivityStatusEnum.Active
        },
      }
    },
  })
}

import { CanApplyRoleEnum, SubsidyLevelEnum, SubsidyLevelText } from '@/common'
import { nodeUtil } from '@easy-page/antd-ui'
import { sqBaseLevel, sqExpandLevel } from '@/pages/plansCrud/fields'

export const settingGears = nodeUtil
  .createField<string[]>('settingGears', '设置档位', {
    value: [SubsidyLevelEnum.Base, SubsidyLevelEnum.Expand],
    required: true,
    mode: 'multiple',
    postprocess({ value }) {
      return undefined
    },
    preprocess({ defaultValues }) {
      const subsidyRule = defaultValues?.subsidyRule
      const expandLevel = subsidyRule?.find(
        (item) => item.scene === SubsidyLevelEnum.Expand
      )
      const baseLevel = subsidyRule?.find(
        (item) => item.scene === SubsidyLevelEnum.Base
      )
      if (!baseLevel && expandLevel) return [SubsidyLevelEnum.Expand]
      if (baseLevel && !expandLevel) return [SubsidyLevelEnum.Base]
      return [SubsidyLevelEnum.Base, SubsidyLevelEnum.Expand]
    },
    validate: ({ value }) => {
      if (value.length === 0) {
        return { success: false, errorMsg: '至少选一个' }
      }
      return { success: true }
    },
  })
  .appendChildren([
    nodeUtil
      .createNode(SubsidyLevelEnum.Base, {
        name: SubsidyLevelText.base,
      })
      .appendChildren([sqBaseLevel]),
    nodeUtil
      .createNode(SubsidyLevelEnum.Expand, {
        name: SubsidyLevelText.expand,
      })
      .appendChildren([sqExpandLevel]),
  ])

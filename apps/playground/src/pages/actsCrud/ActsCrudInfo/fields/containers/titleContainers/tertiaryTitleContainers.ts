import { ActTypeEnum } from '@/common'
import { createTertiaryTitleContainerContainer } from '@/common/fields'

export const subsidyContainer = (actType?: ActTypeEnum) =>
  createTertiaryTitleContainerContainer(
    'sub-subsidy-contaienr',
    '基础和膨胀补贴规则',
    {
      tooltip:
        actType === ActTypeEnum.SG_SHEN_QUAN
          ? '商家报名时，基础和膨胀档位只能二选一'
          : '商家报名时，基础和膨胀档位只能二选一，且仅报名了膨胀档位的商家可报名差异化补贴。',
      showTip: true,
    }
  )
export const commissionContainer = () =>
  createTertiaryTitleContainerContainer(
    'sub-subsidy-contaienr',
    '补贴和佣金规则',
    {
      tooltip:
        '同一个方案下，同一时间(或时间有交集)的提报活动，商家仅能报名一个',
      showTip: true,
      // className: 'pl-2',
    }
  )

export const threeLevelHeadingContainer = () =>
  createTertiaryTitleContainerContainer('sub-subsidy-contaienr', '', {
    tooltip:
      '商家报名时，基础和膨胀档位只能二选一，且仅报名了膨胀档位的商家可报名差异化补贴。',
    showTip: true,
    className: 'three-level-heading',
  })

export const diffSubsidiesContainer = () =>
  createTertiaryTitleContainerContainer(
    'diff-subsidies-container',
    '差异化补贴',
    {}
  )

export const subsidyRuleContainer = () =>
  createTertiaryTitleContainerContainer(
    'subsidy-rule-container',
    '预算规则',
    {}
  )

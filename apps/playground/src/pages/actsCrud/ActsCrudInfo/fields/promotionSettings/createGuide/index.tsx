import { nodeUtil } from '@easy-page/antd-ui'
import { openGuide } from './openGuide'
import { guideWay } from './guideWay'
import { CommonSubActPageProps, CommonSubActPageState } from '../../interface'
import { GuideCreateInvalidFactors, mccModel, Qualify } from '@/common'

import { guideInput } from './guideWay/fields'

const hasChoosedValidFactor = (qualify: Qualify) => {
  if (!qualify?.dataCollector) {
    return false
  }
  const factorCodes = Object.keys(qualify.dataCollector)
  return GuideCreateInvalidFactors.some((x) => factorCodes.includes(x))
}

export const createGuide = nodeUtil
  .createContainer<CommonSubActPageState, CommonSubActPageProps>(
    'createGuide',
    ({ children, frameworkProps: { store } }) => {
      const qualify = store.pageState?.['qualify']
      const subActCount = store.getPageProps()?.subActCount || 1
      const isChooseValidFactor = hasChoosedValidFactor(qualify)
      const {
        data: { degrade_guide_build_product },
      } = mccModel.getData()
      if (isChooseValidFactor) {
        return (
          <div
            style={{
              color: 'rgb(34, 34, 34)',
              marginBottom: '16px',
            }}
          >
            暂不支持商品质量分因子，如需使用请删除质量分因子。
          </div>
        )
      }
      if (String(degrade_guide_build_product) === 'true') {
        return (
          <div
            style={{
              color: 'rgb(34, 34, 34)',
              marginBottom: '16px',
            }}
          >
            暂不支持该功能
          </div>
        )
      }
      if (subActCount > 1) {
        return (
          <div
            style={{
              color: 'rgb(34, 34, 34)',
              marginBottom: '16px',
            }}
          >
            引导商家建品暂不支持多个子活动。如需使用该功能，请您删除多余的子活动。
          </div>
        )
      }
      return <div>{children}</div>
    },
    {
      effectedKeys: ['qualify', 'subActCount'],
    }
  )
  .appendChildren([openGuide, guideWay, guideInput])

export * from './openGuide'

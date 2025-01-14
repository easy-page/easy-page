import { nodeUtil } from '@easy-page/antd-ui'
import { templateContainer } from '../../titleContainers'
import { templateName } from './name'
import { prodId } from './prodId'
import { testId } from './testId'
import { IsConfigTemplate } from '@/common'

export const templateInfo = nodeUtil.extends(
  templateContainer().appendChildren([templateName, prodId, testId]),
  {
    when() {
      return {
        effectedKeys: ['isTemplate'],
        show({ effectedData }) {
          return effectedData['isTemplate'] !== `${IsConfigTemplate.Yes}`
        },
      }
    },
  }
)

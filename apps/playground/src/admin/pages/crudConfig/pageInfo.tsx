import { PageUtil } from '@easy-page/antd-ui'
import { baseInfoContainer } from './fields/titleContainers'
import { actSettings } from './fields/acts'
import { planSettings } from './fields/plans'
import {
  bizline,
  configEnv,
  desc,
  managers,
  name,
  owner,
  type,
} from './fields/baseInfo'
import { recordInfoField } from '@/common/fields'

import { whiteList } from './fields/baseInfo/whiteList'
import { isTemplate } from './fields/baseInfo/isTemplate'
import { anchor } from './fields/anchor'
import { configToolbar } from './fields/toolbar'

const pu = new PageUtil({ pageId: 'full-config' })

pu.addFields([
  recordInfoField('id'),
  baseInfoContainer().appendChildren([
    name,
    bizline,
    isTemplate,
    desc,
    type,
    configEnv,
    owner,
    managers,
    whiteList,
  ]),
  anchor,
  actSettings,
  planSettings,

  configToolbar({}),
  // commonContainer().appendChildren([]),
])

export const settingsPageInfo = pu.getPageInfo()

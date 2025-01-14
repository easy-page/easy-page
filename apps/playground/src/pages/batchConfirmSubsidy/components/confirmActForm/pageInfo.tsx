import { PageUtil } from '@easy-page/antd-ui'
import { chooseAct } from './components/chooseAct'
import { chooseActInfo } from './components/chooseActInfo'
import { formBlockRowTitle, formBlockTitle } from './components/formBlockTitle'
import { brandInfo } from './components/brandInfo'
import { confirmActInfo } from './components/confirmActInfo'
import { confirmSubsidyTitle } from './components/confirmSubsidyTitle'
import { directConfirmSubsidy } from './components/confirmSubsidy/directConfirmSubsidy'
import { agentConfirmSubsidy } from './components/confirmSubsidy/agentConfirmSubsidy'
import { SubmitType } from '@/common'
import {
  baseToolbar,
  ConfirmDialogManager,
  confirmDialogManager,
  ConfirmSceneEnum,
} from '@/common/fields'
import { cancel } from '@/common/fields/common/toolbar/cancel'
import { checkCanEditForm } from './components/checkCanEditForm'
import { submit } from '@/common/fields/common/toolbar/submit'

const pu = new PageUtil({
  pageId: 'cs-act',
})

pu.addFields([
  formBlockTitle('brandInfo', '业务品牌信息').appendChildren([brandInfo]),
  formBlockTitle('chooseAct', '提报活动信息').appendChildren([
    confirmActInfo,
    chooseAct,
    chooseActInfo,
  ]),
  formBlockRowTitle('checkCanEditForm', '补贴分摊确认').appendChildren([
    checkCanEditForm,
  ]),
  
  confirmSubsidyTitle,
  directConfirmSubsidy,
  agentConfirmSubsidy,

  baseToolbar().appendChildren([
    cancel,
    submit({
      id: 'submitAndCreate',
      label: '提交',
      submitType: SubmitType.Default,
    }),
  ]),
  confirmDialogManager(
    new ConfirmDialogManager({
      confirmSceneInfo: {
        [ConfirmSceneEnum.BatchConfirmActChange]: {
          times: 1,
        },
      },
    })
  ),
])

export const confirmActFormInfo = pu.getPageInfo()

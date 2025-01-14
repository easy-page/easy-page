import { nodeUtil, PageUtil } from '@easy-page/antd-ui'
import { chooseFields } from './fields/chooseFields'
import { chooseTemplate } from './fields/chooseTemplate'
import { chooseFieldsBelong } from './fields/chooseFieldsBelong'
import { fieldsConfigContainer } from './fields/configs'
import { ConfirmDialogManager, confirmDialogManager } from '@/common/fields'
import { CliConfigConfirmSence } from './constants'
import { fieldsPreview } from './fields/preview'
import { cliConfigToolbar } from '../crudConfig/fields/toolbar'
import { refreshConfig } from './fields/refreshConfig'
import { fileName } from './fields/fileName'
import { actPrefix } from './fields/actPrefix'
import { bgBuList } from './fields/bgBuList'
import { checkPn } from './fields/submit/checkPn'

export const pu = new PageUtil({ pageId: 'edit-cli-config' })
pu.addFields([
  nodeUtil
    .createContainer('cli-config-container', ({ children }) => {
      return <div className="w-full flex flex-row h-full">{children}</div>
    })
    .appendChildren([
      nodeUtil
        .createContainer(
          'cli-config-left',
          ({ children }) => {
            return (
              <div className="w-1/3 relative overflow-auto">{children}</div>
            )
          },
          {}
        )
        .appendChildren([
          fileName,
          actPrefix,
          checkPn,
          chooseTemplate,
          chooseFields,
          // chooseFieldsBelong,
          nodeUtil
            .createCustomField(
              'field-settings',
              '选择字段所属配置',
              ({ children }) => {
                return (
                  <div className="flex flex-row justify-between">
                    {children}
                  </div>
                )
              },
              {
                postprocess() {
                  return {}
                },
              },
              {
                layout: { disableLayout: true },
              }
            )
            .appendChildren([chooseFieldsBelong, refreshConfig]),
          fieldsConfigContainer,
          cliConfigToolbar({}),
        ]),
      fieldsPreview,
    ]),
  confirmDialogManager(
    new ConfirmDialogManager({
      confirmSceneInfo: {
        [CliConfigConfirmSence.ChangeTemplate]: {
          times: -1,
        },
      },
    })
  ),
])
export const cliConfigPageInfo = pu.getPageInfo()

import { AdminTabs } from '@/admin/common'
import { updateConfig } from '@/admin/common/apis/updateConfig'
import { loadConfigItems } from '@/admin/common/models/configItems'
import { toConfigList } from '@/admin/common/routes'
import { isEdit, SubmitType, UserInfo } from '@/common'
import { FormUtil } from '@easy-page/antd-ui'
import { message, Modal } from 'antd'
import { diffColumnInfos } from '../../configDiff/components/DiffConfigFieldInfo/fields'
import { DiffConfigInfo } from '../../configDiff/components/DiffConfigInfo'
import { deepCompareConfig } from '../../crudConfig/utils/getChanges'
import { ConfigListInfo } from '@/common/apis/getConfigList'

export const handleSubmit: (
  data: Record<string, any>,
  options: {
    formUtil?: FormUtil<Record<string, any>>
    submitType?: SubmitType
    userInfo: UserInfo
    configDetail: ConfigListInfo
  }
) => Promise<void> = (data, { userInfo, configDetail }) => {
  const doSubmit = async (changedKeys: string[]) => {
    // const fieldsFullInfo = prepareFieldConfig({
    //   fieldIds: fields,
    //   configs: fieldsConfig,
    //   belong,
    //   template,
    // })
    console.log('data.crudConfig:', data.crudConfig)
    const res = await updateConfig({
      ...configDetail,
      crudConfig: data.crudConfig,
      changedKeys,
      updator: userInfo.mis,
    } as any)
    if (res.success) {
      message.success('修改成功')
      window.location.reload()
      // setTimeout(() => {
      //   toConfigList({ tab: AdminTabs.Config }, '_self')
      //   loadConfigItems()
      // }, 1000)
      return
    }
    message.error(res.msg)
  }
  if (!isEdit()) {
    return doSubmit([])
  }
  // const diffInfos = deepCompareConfig(configDetail.config, data.config)
  // if (!diffInfos.hasChanged) {
  //   return doSubmit([])
  // }
  // Modal.confirm({
  //   title: '前检查下方变更项?',
  //   centered: true,
  //   className: 'preview-info',
  //   styles: {
  //     content: {
  //       height: '600px',
  //       width: '100%',
  //       overflow: 'hidden',
  //       padding: 0,
  //     },
  //     body: { height: '100%', overflow: 'hidden' },
  //   },
  //   content: (
  //     <DiffConfigInfo
  //       actIds={[1, 2]}
  //       data={[
  //         {
  //           ...configDetail,
  //           name: `【${configDetail.name}】改动前`,
  //           id: 1,
  //         },
  //         {
  //           ...data,
  //           name: `【${configDetail.name}】改动后`,
  //           id: 2,
  //         } as any,
  //       ]}
  //       fields={diffColumnInfos}
  //       filterFields={diffInfos.changedKeys || undefined}
  //     />
  //   ),
  //   onOk: async () => {
  //     return doSubmit(diffInfos.changedKeys || [])
  //   },
  //   onCancel: () => {},
  // })

  return Promise.resolve()
}

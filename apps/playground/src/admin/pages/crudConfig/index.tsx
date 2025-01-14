import { CrudConfigParams } from '@/admin/common/routes/toCrudConfig'
import {
  BaseContainer,
  getUserInfo,
  isCopy,
  isEdit,
  useParamsInfo,
  userModel,
} from '@/common'
import {
  DEFAULT_COMPONENTS,
  EasyPage,
  EXTRA_COMPONENTS,
} from '@easy-page/antd-ui'
import { observer } from 'mobx-react'
import { settingsPageInfo } from './pageInfo'
import { ConfigFormState, ConfigFormProps } from './interface'
import { useEffect } from 'react'
import {
  createConfig,
  CreateConfigParams,
} from '@/admin/common/apis/createConfig'
import { message, Modal } from 'antd'
import { toConfigList } from '@/admin/common/routes'
import { AdminTabs } from '@/admin/common'
import {
  configDetailModel,
  loadConfigDetail,
} from '@/admin/common/models/configDetail'
import { toNumber } from 'lodash'
import { updateConfig } from '@/admin/common/apis/updateConfig'
import { getConfigDefaultValues } from './utils/getDefaultValues'
import { getEditableConfig } from './utils/getEditableConfig'
import { CUSTOM_ADMIN_COMPONENTS } from '@/admin/common/components/easyPage'
import { loadConfigItems } from '@/admin/common/models/configItems'
import './index.less'
import { DiffConfigInfo } from '../configDiff/components/DiffConfigInfo'
import { diffColumnInfos } from '../configDiff/components/DiffConfigFieldInfo/fields'
import { deepCompareConfig } from './utils/getChanges'

export const CrudConfig = observer(() => {
  const { params } = useParamsInfo<CrudConfigParams>()
  const {
    data: userInfo,
    loading: userLoading,
    error: userError,
  } = userModel.getData()
  const {
    data: configDetail,
    loading: detailLoading,
    error: detailError,
  } = configDetailModel.getData()
  useEffect(() => {
    userModel.loadData(() => getUserInfo({}))
    if (params.id) {
      loadConfigDetail(toNumber(params.id))
    }
  }, [])
  const loading = userLoading || detailLoading
  const error = userError || detailError
  console.log('detaildetail:', configDetail)
  return (
    <BaseContainer loading={loading} error={error}>
      <EasyPage<ConfigFormState, ConfigFormProps>
        pageType="form"
        commonUIConfig={{
          form: {
            labelCol: { span: 4 },
            wrapperCol: { span: 18 },
            className: 'pb-[64px] px-4 pt-4',
          },
          formItem: {
            colon: false,
            className: 'min-w-[800px]',
          },
        }}
        defaultValues={{
          owner: userInfo?.mis,
          managers: userInfo?.mis,
          whiteList: userInfo?.mis,
          type: params.type,
          ...(getConfigDefaultValues({ config: configDetail, userInfo }) || {}),
        }}
        context={{
          editable: getEditableConfig(configDetail),
          userInfo,
          onCancel() {},
          async onSubmit(data, options) {
            const doSubmit = async (changedKeys: string[]) => {
              if (isCopy()) {
                delete data.id
              }
              const formData = data as CreateConfigParams

              const action = isEdit() ? updateConfig : createConfig

              const res = await action({
                ...formData,
                changedKeys,
                updator: userInfo.mis,
              } as any)
              if (res.success) {
                message.success(isEdit() ? '修改成功' : '创建成功')
                setTimeout(() => {
                  toConfigList({ tab: AdminTabs.Config }, '_self')
                  loadConfigItems()
                }, 1000)
                return
              }
              message.error(res.msg)
            }
            if (!isEdit()) {
              return doSubmit([])
            }
            const diffInfos = deepCompareConfig(
              configDetail.config,
              data.config
            )
            console.log('diffInfosdiffInfos:', diffInfos)
            if (!diffInfos.hasChanged) {
              return doSubmit([])
            }
            Modal.confirm({
              title: '前检查下方变更项?',
              centered: true,
              className: 'preview-info',
              styles: {
                content: {
                  height: '600px',
                  width: '100%',
                  overflow: 'hidden',
                  padding: 0,
                },
                body: { height: '100%', overflow: 'hidden' },
              },
              content: (
                <DiffConfigInfo
                  actIds={[1, 2]}
                  data={[
                    {
                      ...configDetail,
                      name: `【${configDetail.name}】改动前`,
                      id: 1,
                    },
                    {
                      ...data,
                      name: `【${configDetail.name}】改动后`,
                      id: 2,
                    } as any,
                  ]}
                  fields={diffColumnInfos}
                  filterFields={diffInfos.changedKeys || undefined}
                />
              ),
              onOk: async () => {
                return doSubmit(diffInfos.changedKeys || [])
              },
              onCancel: () => {},
            })

            return
          },
        }}
        {...settingsPageInfo}
        components={{
          ...DEFAULT_COMPONENTS,
          ...EXTRA_COMPONENTS,
          ...CUSTOM_ADMIN_COMPONENTS,
        }}
      />
    </BaseContainer>
  )
})

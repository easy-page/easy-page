import { configListModel, loadConfigListToModel } from '@/admin/common'
import { CUSTOM_ADMIN_COMPONENTS } from '@/admin/common/components/easyPage'
import {
  configDetailModel,
  loadConfigDetail,
} from '@/admin/common/models/configDetail'
import { CliEditConfigParams, CrudConfigParams } from '@/admin/common/routes'
import {
  useParamsInfo,
  userModel,
  getUserInfo,
  BaseContainer,
  mccModel,
  getMcc,
  UsedContainerMccKeys,
} from '@/common'
import {
  EasyPage,
  DEFAULT_COMPONENTS,
  EXTRA_COMPONENTS,
} from '@easy-page/antd-ui'
import { toNumber } from 'lodash'
import { observer } from 'mobx-react'
import { useEffect, useMemo } from 'react'
import { EditCliConfigFormState, EditCliConfigFormProps } from './interface'
import { TemplateIdType } from '@/common/constants/fieldMaps/interface'
import { ConfigListInfo } from '@/common/apis/getConfigList'
import { getDefaultValues } from './utils/getDefaultValues'
import { handleSubmit } from './utils/handleSubmit'
import { cliConfigPageInfo } from './pageInfo'
import { loadConfigList } from '@/common/models/configList'

export const EditCliConfig = observer(() => {
  const { params } = useParamsInfo<CrudConfigParams & CliEditConfigParams>()
  console.log('paramsparams:', params)
  const { data: userInfo } = userModel.getData()
  const { data: mccData } = mccModel.getData()
  const { data: configDetail } = configDetailModel.getData()
  const { data: configs } = configListModel.getList()
  // const [formId, setFormId] = useState(generateId('xxxx'))
  useEffect(() => {
    userModel.loadData(() => getUserInfo({}))
    console.log('asdsdadsadsadsadas')
    if (params.configId) {
      loadConfigDetail(toNumber(params.configId))
    }

    loadConfigListToModel()
    /** 预览需要 */
    loadConfigList()
    mccModel.loadData(async () => await getMcc({ keys: UsedContainerMccKeys }))
  }, [])

  // const formId = useMemo(() => generateId('xxxx'), [])

  const configsMap = useMemo(() => {
    const result: Partial<Record<TemplateIdType, ConfigListInfo>> = {}
    configs.forEach((e) => (result[e.config.actType || e.config.planType] = e))
    return result
  }, [configs])

  // console.log('为啥 configDetailconfigDetail:', formId)

  const showEasyPage =
    Boolean(userInfo?.mis) && configDetail?.id && configs.length > 0

  const contextMemo = useMemo(() => {
    return {
      userInfo: userInfo,
      configsMap: configsMap,
      onCancel() {},

      onSubmit: (data, options) =>
        handleSubmit(data, {
          ...(options || {}),
          userInfo,
          configDetail,
        }),
    } as EditCliConfigFormProps
  }, [userInfo, configDetail, configsMap])
  return (
    <BaseContainer models={[configListModel, configDetailModel]}>
      <div className="flex flex-col p-4 h-full w-full">
        <div className="font-bold text-lg mb-4">CLI 相关配置</div>
        {showEasyPage && (
          <EasyPage<EditCliConfigFormState, EditCliConfigFormProps>
            pageType="form"
            // key={formId}
            commonUIConfig={{
              form: {
                labelCol: { span: 6 },
                wrapperCol: { span: 18 },
                className: 'px-4 pt-4 pb-[64px] h-full w-full',
              },
              formItem: {
                colon: false,
              },
            }}
            // key={formId}
            // pageId={'cs'}
            defaultValues={{
              owner: userInfo?.mis,
              managers: userInfo?.mis,
              type: params.type,
              fullConfig: getDefaultValues({
                configDetail,
                configsMap,
              }),
            }}
            context={contextMemo}
            {...cliConfigPageInfo}
            components={{
              ...DEFAULT_COMPONENTS,
              ...EXTRA_COMPONENTS,
              ...CUSTOM_ADMIN_COMPONENTS,
            }}
          />
        )}
      </div>
    </BaseContainer>
  )
  // return (
  //   <div>
  //     22
  //     {showEasyPage ? <Demo2 /> : <></>}
  //   </div>
  // )
})

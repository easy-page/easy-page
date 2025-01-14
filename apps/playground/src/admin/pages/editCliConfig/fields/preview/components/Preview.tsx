import { CUSTOM_ADMIN_COMPONENTS } from '@/admin/common/components/easyPage'
import {
  DEFAULT_COMPONENTS,
  EasyPage,
  EXTRA_COMPONENTS,
  generateId,
} from '@easy-page/antd-ui'
import { useEffect, useMemo, useState } from 'react'
import {
  FieldsConfig,
  TemplateIdType,
} from '@/common/constants/fieldMaps/interface'
import {
  ACTIVITY_STATUS_OPTIONS,
  ActTypeEnum,
  ALL,
  BizLineEnum,
  ChargeSideEnum,
  OperationType,
} from '@/common/constants'
import { observer } from 'mobx-react'
import {
  actDetailModel,
  ActFullInfo,
  actListModel,
  BaseContainer,
  CrudActParams,
  CUSTOM_COMPONENTS,
  FactorInfo,
  factorModel,
  isCreate,
  mccModel,
  pnListModel,
  useParamsInfo,
  userModel,
  ZsptButton,
} from '@/common'
import { Drawer, Input, Radio, Select } from 'antd'
import { subsidyAuthModel } from '@/common/models/subsidyAuth'
import { getPreviewPageInfo } from '../utils/getPreviewPageInfo'
import { AdminActBaseContainer } from './AdminActBaseContainer'
import { ConfigInfo, ConfigListInfo } from '@/common/apis/getConfigList'
import { ConfigsInfoMappings } from '../../../constants'
// import { getActTemplateOptions } from '@/common/configs'
// import { loadActList } from '../utils/loadActList'
// import { configListModel } from '@/admin/common'

export const Preview = observer(
  ({
    fieldConfigs,
    fullConfig,
    template,
  }: {
    fieldConfigs: FieldsConfig
    fullConfig: ConfigListInfo
    template: TemplateIdType
  }) => {
    const { appendParamToUrl, params } = useParamsInfo<CrudActParams>()
    const [op, setOp] = useState(params.operationType || OperationType.CREATE)
    const [actId, setActId] = useState(params.actId || '')
    console.log('aaaaaasdsad:', actId, typeof actId)

    const templateFullMappings = useMemo(() => {
      // 默认 SG 的为通用的
      return template
        ? ConfigsInfoMappings[template]
        : ConfigsInfoMappings.common
    }, [template])

    const { data: factors } = factorModel.getData()
    const { data: pnList } = pnListModel.getList()
    const { data: actDetail = {} as ActFullInfo } = actDetailModel.getData()
    const { data: resourceIdRes = [] } = subsidyAuthModel.getList()
    // const { data: actLists = [] } = actListModel.getList()
    const {
      data: {
        invite_poi_brand_excel_template_url,
        invite_poi_excel_template_url,
        activity_service_type_4_wm,
        amount_limit_4_subactivity,
      },
    } = mccModel.getData()
    // const { data: userInfo } = userModel.getData()
    // const { data: configs } = configListModel.getList()

    // const actTypeOptions = useMemo(() => {
    //   const options = getActTemplateOptions({ configs, userMis: userInfo?.mis })
    //   return [...options]
    // }, [configs, userInfo])

    // const actsOptions = useMemo(() => {
    //   return actLists.map((e) => ({
    //     label: e.name,
    //     value: e.id,
    //   }))
    // }, [actLists])

    // const [curActType, setActType] = useState()

    const [showActDetail, setShowActDetail] = useState(false)

    const configFilterPageInfo = useMemo(() => {
      const nodesInfo = getPreviewPageInfo({
        sence: op,
        fieldConfigs,
      })

      return {
        ...nodesInfo,
        defaultValues:
          templateFullMappings.getDefaultValues?.({
            actDetail,
          }) || {},
      }
    }, [fieldConfigs, op, actDetail, templateFullMappings])

    useEffect(() => {
      setTimeout(() => {
        appendParamToUrl({
          operationType: op,
          actId,
        })
      })
    }, [actId, op])

    const actConfig = fullConfig.config || ({} as ConfigInfo)
    const statusOptions = useMemo(() => {
      return ACTIVITY_STATUS_OPTIONS.filter((x) => x.value !== ALL)
    }, [])

    const contextMemo = useMemo(() => {
      return {
        poiInviteTemplateUrl: invite_poi_excel_template_url,
        brandInviteTemplateUrl: invite_poi_brand_excel_template_url,
        bizlineOptions: activity_service_type_4_wm,
        mccSubActMaxCount: amount_limit_4_subactivity,
        factors: { ...(factors || {}) } as FactorInfo,
        resourceIdRes,
        pnListData: pnList || [],
        editable: templateFullMappings.getEditableConfig?.(actDetail),
      }
    }, [
      invite_poi_excel_template_url,
      invite_poi_brand_excel_template_url,
      activity_service_type_4_wm,
      amount_limit_4_subactivity,
      factors,
      pnList,
      resourceIdRes,
      templateFullMappings,
      actDetail,
    ])

    console.log('configFilterPa1geInfo:', isCreate())
    return (
      <div className="flex flex-col ml-4 pl-4 pt-2 h-full overflow-auto flex-1 border-l border-[#D3E3FD]">
        <div className="flex flex-row items-center justify-between">
          <Radio.Group value={op} onChange={(e) => setOp(e.target.value)}>
            <Radio value={OperationType.CREATE}>新建</Radio>
            <Radio value={OperationType.COPY}>复制</Radio>
            <Radio value={OperationType.EDIT}>编辑</Radio>
            <Radio value={OperationType.VIEW}>查看</Radio>
          </Radio.Group>
          <div className="flex flex-row items-center pr-6">
            {!isCreate() ? (
              <>
                <Input
                  className="ml-2 w-[300px]"
                  value={actId}
                  placeholder="输入活动 ID，可看当前 ID 各种状态下情况"
                  onChange={(v) => setActId(v.target.value)}
                />
                {/* <Select
                  options={actTypeOptions}
                  className="w-[200px] mx-2"
                  placeholder="选择活动类型"
                  value={curActType}
                  onChange={(val) => {
                    setActType(val)
                    loadActList({
                      actType: val as ActTypeEnum,
                      bizline: BizLineEnum.ShanGou,
                    })
                  }}
                />
                <Select
                  options={actsOptions}
                  className="w-[200px] mx-2"
                  placeholder="选择活动"
                  value={actId}
                  onChange={(v) => {
                    setActId(v)
                  }}
                /> */}
                <Select
                  options={statusOptions}
                  className="w-[200px] mx-2"
                  placeholder="切换活动状态"
                  value={actDetail.activity?.status}
                  onChange={(val) => {
                    actDetailModel.loadData(() => {
                      return Promise.resolve({
                        success: true,
                        data: {
                          ...actDetail,
                          activity: {
                            ...(actDetail.activity || {}),
                            status: val,
                          },
                        } as any,
                      })
                    })
                  }}
                />
              </>
            ) : (
              <></>
            )}
            <ZsptButton
              onClick={() => setShowActDetail(true)}
              type="primary"
              className="ml-2"
            >
              修改活动数据
            </ZsptButton>
            <Drawer
              destroyOnClose
              closable={false}
              onClose={() => {
                setShowActDetail(false)
              }}
              footer={
                <div className="flex flex-row justify-start  w-full p-4">
                  <ZsptButton className="mr-2" onClick={() => {}}>
                    取消
                  </ZsptButton>
                  <ZsptButton type="primary" onClick={() => {}}>
                    确定
                  </ZsptButton>
                </div>
              }
              title={'修改数据'}
              width={'70%'}
              open={showActDetail}
            >
              <div className="flex flex-col">
                <div>内容</div>
              </div>
            </Drawer>
          </div>
        </div>
        <AdminActBaseContainer
          className="relative w-full h-full"
          bgBuList={[ChargeSideEnum.MeiTuanShanGou]}
          factorCodes={actConfig?.actFactorInfo?.factorCodes || []}
          resourceIdList={actConfig.resourceIdList}
          key={'collect-store-preview'}
        >
          <EasyPage<any, any>
            {...configFilterPageInfo.pageInfo}
            key={configFilterPageInfo.id}
            pageType="form"
            pageId="cs"
            // key={configFilterPageInfo.id}
            commonUIConfig={{
              form: {
                labelCol: { span: 6 },
                wrapperCol: { span: 12 },
                className: 'w-full h-full',
              },
              formItem: {
                colon: false,
              },
            }}
            defaultValues={configFilterPageInfo.defaultValues}
            context={contextMemo}
            components={{
              ...DEFAULT_COMPONENTS,
              ...EXTRA_COMPONENTS,
              ...CUSTOM_COMPONENTS,
              ...CUSTOM_ADMIN_COMPONENTS,
            }}
          />
        </AdminActBaseContainer>
      </div>
    )
  }
)

import { configListModel, loadConfigListToModel } from '@/admin/common'
import {
  configDetailModel,
  loadConfigDetail,
} from '@/admin/common/models/configDetail'
import {
  actDetailModel,
  ActFullInfo,
  ACTIVITY_STATUS_OPTIONS,
  ActTypeEnum,
  ALL,
  appendParamsToUrl,
  CrudActParams,
  getActDetail,
  getMcc,
  getUserInfo,
  isCreate,
  mccModel,
  OperationType,
  toCrudAct,
  toNumber,
  UrlEnum,
  UsedContainerMccKeys,
  useParamsInfo,
  userModel,
  ZsptButton,
} from '@/common'
import { getActConfig } from '@/common/configs'
import { loadConfigList } from '@/common/models/configList'
import { ActsCrudPageMap } from '@/pages/actsCrud'
import { Radio, Input, Select, Drawer } from 'antd'
import { observer } from 'mobx-react'
import { useEffect, useMemo, useState } from 'react'

export const PreviewRecord = observer(() => {
  const { params, appendParamToUrl } = useParamsInfo<CrudActParams>()
  console.log('paramsparams:', params)
  const { data: userInfo } = userModel.getData()
  const { data: actDetail = {} as ActFullInfo } = actDetailModel.getData()
  const [op, setOp] = useState(params.operationType || OperationType.CREATE)
  // const { data: configDetail } = configDetailModel.getData()
  const { data: configs } = configListModel.getList()
  const [actId, setActId] = useState(params.actId || '')
  const { actType: actTypeOfParams } = params || {}
  const config = getActConfig(
    actDetail?.templateId
      ? {
          templateId: actDetail?.templateId,
          configs: configs,
        }
      : {
          actType: actTypeOfParams || ActTypeEnum.DISCOUNT_NON_BRAND,
          configs: configs,
        }
  )
  const actType = config.actType
  const bizLine = config.bizLine

  const [showActDetail, setShowActDetail] = useState(false)

  const statusOptions = useMemo(() => {
    return ACTIVITY_STATUS_OPTIONS.filter((x) => x.value !== ALL)
  }, [])
  useEffect(() => {
    userModel.loadData(() => getUserInfo({}))
    // if (params.actId) {
    //   loadConfigDetail(toNumber(config.))
    // }

    loadConfigListToModel()
    /** 预览需要 */
    loadConfigList()
    mccModel.loadData(async () => await getMcc({ keys: UsedContainerMccKeys }))
  }, [])

  useEffect(() => {
    if (
      [OperationType.EDIT, OperationType.COPY, OperationType.VIEW].includes(
        op
      ) &&
      actId
    ) {
      /** 查活动详情 */
      actDetailModel.loadData(async () => {
        const res = await getActDetail({
          activityId: toNumber(actId),
        })
        return res
      })
    } else {
      actDetailModel.loadData(async () => {
        return { success: true }
      })
    }
  }, [actId, op])

  useEffect(() => {
    const params: Partial<CrudActParams> = {
      operationType: op,
      actId,
    }
    if (actType) {
      params.actType = actType
    }
    if (bizLine) {
      params.bizLine = `${bizLine}`
    }
    console.log('paramsparams:', params)
    appendParamToUrl(params)
  }, [actId, op, actType, bizLine])

  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center justify-between p-2 m-2">
        <Radio.Group
          value={op}
          onChange={(e) => {
            setOp(e.target.value)
            window.open(
              appendParamsToUrl('/zsptuoc-admin/preview-record', {
                bizLine: `${bizLine}`,
                operationType: e.target.value,
                actType: actType,
                actId,
              }),
              '_self'
            )
          }}
        >
          <Radio value={OperationType.CREATE}>新建</Radio>
          <Radio value={OperationType.COPY}>复制</Radio>
          <Radio value={OperationType.EDIT}>编辑</Radio>
          <Radio value={OperationType.VIEW}>查看</Radio>
        </Radio.Group>
        <div className="flex flex-row items-center pr-28">
          {!isCreate() ? (
            <>
              <Input
                className="ml-2 w-[300px]"
                value={actId}
                placeholder="输入活动 ID，可看当前 ID 各种状态下情况"
                onChange={(v) => setActId(v.target.value)}
              />

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
      {ActsCrudPageMap[actType]}
    </div>
  )
})

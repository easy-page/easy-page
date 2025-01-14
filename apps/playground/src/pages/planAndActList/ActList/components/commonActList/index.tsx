import {
  BizLineEnum,
  getTablePageinationConfig,
  actListModel,
  getBizLine,
  loadActListToModel,
  loadActTemplateListToModel,
  PlanAndActListParams,
  PlanAndActTabResources,
  useParamsInfo,
  actListColumns,
  ActListScene,
  configListModel,
  mccModel,
  userModel,
} from '@/common'
import { ActFilter } from '@/common/fields'
import {
  InviteSettings,
  InviteSettingsProps,
} from '@/pages/planAndActList/ActInviteSettings'
import { Switch, Table } from 'antd'
import { observer } from 'mobx-react'
import { TableOperations } from '../../tableOperations'
import { useEffect, useMemo, useState } from 'react'
import { TemplateSceneEnum } from '@/common/apis/getCreateActItems'
import { userInfo } from 'os'
import { ActColumnsInfo } from '@/common/utils/getActColumns'

export const CommonActList = observer(() => {
  const { data, pageNo, pageSize, total, loading, filterType } =
    actListModel.getList()

  const { params, appendParamToUrl } = useParamsInfo<PlanAndActListParams>()
  const bizLine: BizLineEnum = getBizLine() || BizLineEnum.WaiMai

  const isSg = bizLine === BizLineEnum.ShanGou

  const isWaiMa = bizLine === BizLineEnum.WaimaSongJiu

  const { data: configs } = configListModel.getList()

  const { data: userInfo } = userModel.getData() || {}
  const { data: mccConfig } = mccModel.getData() || {}

  const [showExtraRow, setShowExtraRow] = useState(false)

  const [showInviteSettings, setShowInviteSettings] =
    useState<Pick<InviteSettingsProps, 'show' | 'actId'>>()

  useEffect(() => {
    if (params.tab === PlanAndActTabResources.Act) {
      loadActListToModel({ bizLine: getBizLine(), refresh: true })
      loadActTemplateListToModel({
        scene: TemplateSceneEnum.Activity,
        bizLine: getBizLine(),
      })
    }
  }, [pageNo, pageSize, filterType, params.tab])

  const rowIds = useMemo(() => {
    const handler = ActColumnsInfo[bizLine][ActListScene.Home]
    return (
      handler?.({
        showMore: showExtraRow,
        actSubTab: filterType,
      }) || []
    )
  }, [setShowExtraRow, showExtraRow, filterType, bizLine])

  const columns = actListColumns.getColumns({
    sence: ActListScene.Home,
    ids: rowIds,
    context: {
      userInfo,
      configs,
      mccConfig,
      actSubTab: filterType,
      setShowInviteSettings,
    },
  })

  return (
    <>
      <ActFilter />
      <div className="flex flex-row items-center justify-between mb-2">
        {isWaiMa ? (
          <div />
        ) : (
          <div className="flex flex-row items-center text-sm">
            <div className="font-bold">数据展示设置：</div>
            <div className="flex flex-row items-center ">
              展示归属方案
              <Switch
                className="ml-2"
                size="small"
                checked={showExtraRow}
                onChange={(e) => setShowExtraRow(e)}
              />
            </div>
          </div>
        )}
        {isSg && <TableOperations listCount={data.length} />}
      </div>
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        scroll={{
          // y: 'calc(100vh - 420px)',
          x: 1000,
        }}
        pagination={getTablePageinationConfig({
          pageNo,
          pagination: {
            pageSize,
          },
          total,
          model: actListModel,
        })}
      />
      <InviteSettings {...showInviteSettings} setShow={setShowInviteSettings} />
    </>
  )
})

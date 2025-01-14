import {
  PlanListColumnId,
  PlanAndActParamsEnum,
  PlanSubTabResources,
  PlanListScene,
  ZsptSegmented,
  planListColumns,
  PlanSubTabText,
  toNumber,
  getTablePageinationConfig,
  BizLineEnum,
  PlanAndActTabResources,
} from '@/common'
import { loadPlanListToModel, planListModel } from '@/common/models'
import { observer } from 'mobx-react'
import { useEffect, useMemo } from 'react'
import { Table } from 'antd'
import { userModel } from '@/common/models'
import { mccModel } from '@/common/models'
import { OPERATION_COL_KEY } from '@/common'
import { PlanFilter } from '@/common/fields/planList'
import { CreatePlan } from './components'
import { roleManager } from '@/common/roles/manager'
import { useParamsInfo } from '@/common/hooks'
import { PlanAndActListParams } from '@/common/routes'
import { AllPlanSubTabs, roleAndPlanSubTabMap } from '@/common/roles/mappings'
import { configListModel } from '@/common/models/configList'

export const PlanList = observer(() => {
  const { data, pageNo, pageSize, total, loading, filterType } =
    planListModel.getList()
  const { data: userInfo } = userModel.getData() || {}
  const { data: mccConfig } = mccModel.getData() || {}
  const { data: configs } = configListModel.getList() || {}
  const { params } = useParamsInfo<PlanAndActListParams>()

  useEffect(() => {
    if (params.tab === PlanAndActTabResources.Plan) {
      loadPlanListToModel(toNumber(params.bizLine))
    }
  }, [pageNo, pageSize, filterType, params.tab])

  const columnIds = useMemo(() => {
    const fullColumns = [...Object.values(PlanListColumnId), OPERATION_COL_KEY]
    if (
      (params.planFilterType as any as string) ===
      `${PlanSubTabResources.Confirm}`
    ) {
      return fullColumns
    }
    return fullColumns.filter(
      (e) => ![PlanListColumnId.JoinStatus].includes(e as PlanListColumnId)
    )
  }, [params.planFilterType])

  const columns = planListColumns.getColumns({
    /** 表明使用场景，不同的场景，对于同一个字段的展示可能有差别 */
    sence: PlanListScene.Home,
    /** 选择这个场景要展示的字段 */
    ids: columnIds,
    /** 给每个表格字段传递表格相关上下文 */
    context: {
      userInfo,
      mccConfig,
      configs,
      planSubTab: filterType,
    },
  })

  const tabs = useMemo(
    () =>
      roleManager.getResources(roleAndPlanSubTabMap, {
        userInfo,
        sortArray: AllPlanSubTabs,
        bizLine: (params.bizLine || BizLineEnum.WaiMai) as BizLineEnum,
      }),
    [userInfo]
  )

  return (
    <div className="w-full">
      <div className="flex flex-row justify-between mb-4">
        <ZsptSegmented
          paramId={PlanAndActParamsEnum.PlanFilterType}
          defaultId={PlanSubTabResources.Mine}
          hasTab={(id) => tabs.includes(id)}
          onChange={(val) => {
            // planListModel.resetFilters();
            planListModel.setFilters({
              filterType: val,
            })
          }}
          options={tabs.map((e) => ({
            label: PlanSubTabText[e],
            value: e,
          }))}
        />
        <CreatePlan userInfo={userInfo} />
      </div>
      <PlanFilter />
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        scroll={{
          // y: 'calc(100vh - 380px)',
          x: 1000,
        }}
        pagination={getTablePageinationConfig({
          pageNo,
          pagination: {
            pageSize,
          },
          total,
          model: planListModel,
        })}
      />
    </div>
  )
})

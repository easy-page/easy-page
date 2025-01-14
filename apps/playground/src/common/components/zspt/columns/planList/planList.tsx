import { PlanInfo } from '@/common/apis'
import { FormatStyle } from '@/common/libs'
import {
  planAuthOperation,
  planEdit,
  planPublish,
  planView,
} from './operations'
import {
  AuthUrl,
  PlanListColumnId,
  PlanListScene,
  PlanTypeEnum,
} from '@/common/constants'
import { BaseListContext, TableUtil } from '../../ZsptTableUtil'
import {
  GodPriceStatus,
  PlanJoinStatusTag,
  PlanStatus,
  ShenhuiyuanPlanStatus,
} from '../../StatusTag'
import { getOperationColumnInfo } from '../../Operations'
import { planSendInvite } from './operations/sendInvite'
import { joinPlanBtn } from './operations/joinPlan'
import { planApplyResult } from './operations/applyResult'
import { JoinPlanStatus } from '../../StatusTag/plan/PlanJoinStatus'
import { planCopy } from './operations/copy'
import { planWithDraw } from './operations/withDraw'
import { getPlanConfig } from '@/common/configs'

export type PlanListContext<T = Record<string, any>> = BaseListContext<T> & {}

export const PLAN_LIST_DEFAULT_OP_COUNT = 4

export const planListColumns = new TableUtil<
  PlanInfo, // 表格每行信息字段的结构
  /**
   * 使用场景，当此表格在多个地方使用的时候，可使用同一个 planListColumns 不同的场景来区分
   * 如：活动列表在：主页、加入方案页均会使用，就是 2 个场景
   *  */
  PlanListScene,
  /**
   * 使用场景，当此表格在多个地方使用的时候，可使用同一个 planListColumns 不同的场景来区分
   * 包含：MCC 配置、用户信息
   */
  PlanListContext<PlanInfo>
>()

planListColumns.createColumns({
  sence: PlanListScene.Home,
  columns: {
    [PlanListColumnId.Id]: () => ({
      width: 100,
      fixed: 'left',
      title: '方案 ID',
    }),
    [PlanListColumnId.Name]: () => ({
      width: 160,
      fixed: 'left',
      title: '方案名称',
    }),

    [PlanListColumnId.Type]: ({ configs }) => ({
      width: 120,
      title: '方案类型',
      render: (val) => {
        if (val === undefined) {
          return '-'
        }
        const config = getPlanConfig({ planType: val, configs })
        return config.name
      },
    }),
    [PlanListColumnId.SendTime]: () => ({
      width: 160,
      title: '方案发布时间',
      tooltip: '指首次成功发布方案的时间',
      format: FormatStyle.YYYYMMDDHHmmss,
    }),
    [PlanListColumnId.Ctime]: () => ({
      width: 150,
      title: '方案创建时间',
      format: FormatStyle.YYYYMMDDHHmmss,
    }),

    [PlanListColumnId.Creator]: () => ({
      width: 140,
      title: '方案创建人',
    }),
    [PlanListColumnId.Status]: () => ({
      width: 110,
      title: '方案状态',
      tooltip: '可在列表点击查看，获取每个活动的具体状态',
      render: (val, record) => {
        const statusMap = {
          [PlanTypeEnum.GodPrice]: <GodPriceStatus row={record} />,
          [PlanTypeEnum.Brand]: <PlanStatus row={record} />,
          [PlanTypeEnum.ShenHuiYuan]: <ShenhuiyuanPlanStatus row={record} />,
          [PlanTypeEnum.UnionCoupon]: <ShenhuiyuanPlanStatus row={record} />,
        }
        return record.planType !== undefined ? (
          statusMap[record.planType]
        ) : (
          <></>
        )
      },
    }),
    [PlanListColumnId.JoinStatus]: () => {
      return {
        width: 110,
        title: '加入状态',
        render: (status, record) => {
          return <JoinPlanStatus row={record} />
        },
      }
    },
  },
})

planListColumns.addOperations({
  sence: PlanListScene.Home,
  column: ({ userInfo, mccConfig, ...rest }) => {
    return getOperationColumnInfo<PlanInfo>({
      ...rest,
      operations: [
        planEdit,
        planCopy,
        planView,
        planPublish,
        planSendInvite,
        joinPlanBtn,
        planApplyResult,
        planAuthOperation,
        planWithDraw,
      ],
      userInfo,
      maxCount: PLAN_LIST_DEFAULT_OP_COUNT,
      mccConfig,
      authUrl: AuthUrl.PlanAuth,
      columnProps: {
        title: '操作',
        width: 200,
        fixed: 'right',
      },
    })
  },
})

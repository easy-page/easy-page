import { ActInfo } from '@/common/apis'
import { OperaitonContext } from '@/common/auths'

import {
  ActListScene,
  ActListColumnId,
  AuthUrl,
  GrayRuleCode,
} from '@/common/constants'
import { FormatStyle, formateDate } from '@/common/libs'
import {
  actApplyResult,
  actAuthOperation,
  actCopy,
  actEdit,
  actInviteSettings,
  actSendInvite,
  actView,
  actWithDraw,
  confirmAgreement,
} from './operations'
import { ActListPlanInfo } from '../../ActListPlanInfo'
import { ActListStatusInfo } from '../../ActListStatusInfo'
import { BudgetInfoConsumption } from '../../BudgeInfoConsumption'
import { getOperationColumnInfo } from '../../Operations'
import { TableUtil } from '../../ZsptTableUtil'
import { actProgress } from './operations/progress'
import { actPoiConfirm } from './operations/poiConfirm'
import { Tooltip } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'
import { ActConfirmStatusTag, StatusTagSizeEnum } from '../../StatusTag'
import { Empty } from '@easy-page/antd-ui'
import { confirmSku } from './operations/confirmSku'

export const ACT_LIST_DEFAULT_OP_COUNT = 6

export type ActListContext<T = Empty> = Omit<
  OperaitonContext<T>,
  'record' | 'operation' | 'authUrl'
>

export const actListColumns = new TableUtil<
  ActInfo,
  ActListScene,
  ActListContext
>()

actListColumns.createColumns({
  sence: ActListScene.Home,
  columns: {
    [ActListColumnId.ActId]: () => ({
      width: 100,
      fixed: 'left',
      title: '活动 ID',
    }),
    [ActListColumnId.ActName]: () => ({
      width: 160,
      fixed: 'left',
      title: '活动名称',
      dotLineNumber: 3,
    }),
    [ActListColumnId.TemplateName]: () => ({
      width: 120,
      title: '促销类型',
      dotLineNumber: 2,
    }),
    [ActListColumnId.ServiceTypeDesc]: () => ({
      width: 100,
      title: '所属业务',
    }),
    [ActListColumnId.ActTime]: () => ({
      width: 180,
      title: '活动时间',
      // rangeTime: ['activityStartTime', 'activityEndTime'],
      // format: FormatStyle.YYYYMMDDHHmmss,
      render: (_, record) => {
        if (record.isRestrictPromotionTime === 0) {
          return '长期有效'
        }
        return actListColumns.renderRangeTime({
          format: FormatStyle.YYYYMMDDHHmmss,
          startTime: record.activityStartTime,
          endTime: record.activityEndTime,
        })
      },
    }),
    [ActListColumnId.ActStatsInfo]: () => ({
      width: 220,
      title: '预算消耗/总预算（¥）',
      render: (val, record) => <BudgetInfoConsumption row={record} />,
    }),
    [ActListColumnId.CreatorAndTime]: () => ({
      width: 220,
      title: '创建时间/创建人',
      render: (val, record) => (
        <div className="flex flex-col">
          <div>{formateDate(record.ctime, FormatStyle.YYYYMMDDHHmmss)}</div>
          <div>{record.creator || '-'}</div>
        </div>
      ),
    }),
    [ActListColumnId.PlanIdAndNameAndCreator]: () => ({
      width: 200,
      title: '归属方案',
      render: (val, record) => {
        return <ActListPlanInfo record={record} />
      },
    }),
    [ActListColumnId.ConfirmStatus]: () => ({
      width: 180,
      title: (
        <div className="flex flex-row items-center justify-center">
          <span className="mr-1">确认状态</span>
          <Tooltip
            title={
              <div>
                <div>1、未开始：指该活动尚未到达合作运营确认开始时间。</div>
                <div>
                  2、待确认：指该活动处于合作运营确认周期内，且业务品牌未全部确认完成，或者处于审批中、审批驳回状态。
                </div>
                <div>
                  3、已确认：指该活动处于合作运营确认周期内，且全部业务品牌已确认完成且审批通过。
                </div>
                <div> 4、已结束：指该活动的合作运营确认周期已结束。</div>
              </div>
            }
          >
            <QuestionCircleOutlined />
          </Tooltip>
        </div>
      ),
      render: (val, record) => {
        if (!record.activityConfirmStatus) {
          return '-'
        }
        return (
          <ActConfirmStatusTag
            status={record.activityConfirmStatus}
            size={StatusTagSizeEnum.Small}
            children={record.activityConfirmStatusDesc}
          />
        )
      },
    }),
    [ActListColumnId.Status]: () => ({
      width: 120,
      title: '活动状态',
      render: (val, record) => {
        return <ActListStatusInfo record={record} />
      },
    }),
  },
})

actListColumns.addOperations({
  sence: ActListScene.Home,
  column: ({
    userInfo,
    mccConfig,
    setShowInviteSettings,
    configs,
    ...rest
  }) => {
    console.log('restrestrest:', rest)
    return getOperationColumnInfo({
      sence: ActListScene.Home,
      operations: [
        actProgress,
        actSendInvite,
        actView,
        actEdit,
        actCopy,
        actInviteSettings,
        actPoiConfirm,
        actApplyResult,
        actAuthOperation,
        actWithDraw,
        confirmAgreement,
        confirmSku,
      ],
      configs,
      userInfo,
      maxCount: ACT_LIST_DEFAULT_OP_COUNT,
      mccConfig,
      setShowInviteSettings,
      authUrl: AuthUrl.ActAuth,
      ...rest,
      columnProps: {
        title: '操作',
        width: 260,
        // fixed: 'right',
      },
    })
  },
})

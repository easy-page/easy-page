import { Button, message, Modal } from 'antd'
import { SubPanel } from '../common/components/SubPanel'
import { Statistic } from '../common/components/Statistic'
import { DownloadOutlined } from '@ant-design/icons'
import {
  ActivityStatusOfFilter,
  SkuApplyListItem,
  ZsptButton,
  getBizLine,
  loadPoiApplyListToModel,
  mccModel,
} from '@/common'
import { WmDiscountStatisticContainer } from '../common/containers'
import { BatchAction, CommonTips } from '../common'
import {
  poiName,
  poiId,
  brandId,
  city,
  subActName,
  applyStatus,
  skuName,
  skuId,
  applyTime,
} from '../common/components/Filters/fields'
import { QuestionTooltip } from '@/common/components/base/QuestionTooltip'
import {
  showBatchCancelResult,
  showBatchCancelSkuResult,
} from '../common/operations'
import { getPoiListDismissCount } from '@/common/apis/getPoiListDismissCount'
import dayjs from 'dayjs'
import { useMemo } from 'react'
import { WmDisCountActApplyDetailContainer } from '../common/containers/wmDiscount/WmDisCountActApplyDetailContainer'
import { SkuActApplyListColumnId } from '../common/components/CommonSkuActApplyList/columnIds'
import { SkuActApplyListScene } from '../common/components/CommonSkuActApplyList/columns'
import {
  loadSkuApplyListToModel,
  skuApplyListModel,
} from '@/common/models/wmDiscount'
import { exportSkuInviteRecord } from '@/common/apis/exportSkuInviteRecord'
import { batchExitSkuApplyRecordByCondition } from '@/common/apis/batchExitSkuApplyRecordByCondition'
import {
  ExportSenceEnum,
  exportSkuApplyRecord,
} from '@/common/apis/exportSkuApplyRecord'
import { listApproveRecord } from '@/common/apis/listApprove'
import { countByCondition } from '@/common/apis/countByCondition'
import { batchDismiss } from '@/common/apis/batchDismiss'
import { batchApproveAct } from '@/common/apis/batchApproveAct'

export type SkuApplyResultProps = {
  activityId: number
}

export const SkuApplyResult = ({ activityId }: SkuApplyResultProps) => {
  const { data: mccData } = mccModel.getData()
  const { shy_condition_exit_poi_switch = true } = mccData || {}

  const listOperations = useMemo(() => {
    const baseOperations = [
      BatchAction.ListApprove,
      BatchAction.ListDownload,
      BatchAction.Dismiss,
      BatchAction.Approve,
    ]

    // 如果降级，则不展示列表清退按钮
    if (shy_condition_exit_poi_switch === 'true') {
      baseOperations.push(BatchAction.ListDismiss)
    }
    return baseOperations
  }, [shy_condition_exit_poi_switch])

  return (
    <div className="flex flex-col">
      <SubPanel title="报名统计">
        <WmDiscountStatisticContainer
          activityId={activityId}
          item={({ statisticInfo }) => (
            <Statistic statisticInfo={statisticInfo} />
          )}
        />
      </SubPanel>
      <SubPanel
        title="报名详情"
        rightOperations={
          <div className="flex flex-row">
            <ZsptButton
              icon={<DownloadOutlined />}
              onClick={async () => {
                const res = await exportSkuInviteRecord({ actId: activityId })
                if (res.success) {
                  message.success('正在导出中，请注意查看大象消息')
                } else {
                  message.error(res.msg || '下载明细失败')
                }
              }}
            >
              下载已邀请明细
            </ZsptButton>
          </div>
        }
      >
        <WmDisCountActApplyDetailContainer<SkuApplyListItem>
          activityId={activityId}
          operationTips={
            <QuestionTooltip
              tooltip={
                '指对下方列表的筛选结果进行对应处理。如您未进行任何条件筛选，则会对全部报名结果数据进行处理；如您进行了条件筛选，则仅对您筛选的结果进行处理。'
              }
              text={''}
            ></QuestionTooltip>
          }
          applyResultConfig={{
            filters: [
              subActName,
              skuName,
              skuId,
              poiName,
              poiId,
              // brandName,
              brandId,
              city,
              applyStatus,
              applyTime, // 报名时间
            ],
            filterCount: 8,
            operations: listOperations,
          }}
          skuActApplyListProps={{
            columnIds: Object.values(SkuActApplyListColumnId),
            listModel: skuApplyListModel,
            sence: SkuActApplyListScene.SkuApplyResult,
            loadListData: loadPoiApplyListToModel,
            operationsProps: {
              async onBatchApproveConfirm({ canApproveRecords }) {
                const result = await batchApproveAct(
                  canApproveRecords.map((e) => ({
                    esId: e.esId,
                    actId: e.actId,
                    poiId: e.poiId,
                    skuId: e.skuId,
                  }))
                )
                showBatchCancelSkuResult(result.data, () => {
                  loadSkuApplyListToModel({
                    bizLine: getBizLine(),
                    activityId: activityId,
                  })
                })
                return Promise.resolve({} as any)
              },
              async onBatchCancelConfirm({ canCancelRecords, reason }) {
                // 走下方：batchCancelCustomHandler 自定义交互
                const result = await batchDismiss({
                  reason,
                  actId: activityId,
                  list: canCancelRecords.map((e) => ({
                    esId: e.esId,
                    poiId: e.poiId,
                    skuId: e.skuId,
                  })),
                })
                if (result.success) {
                  showBatchCancelSkuResult(result.data, () => {
                    loadSkuApplyListToModel({
                      bizLine: getBizLine(),
                      activityId: activityId,
                    })
                  })
                } else {
                  message.error(result.msg || '批量清退失败，请稍后重试')
                }
                return result
              },
              // 列表审核通过
              async onListApproveConfirm(filterRules) {
                // return
                const res = await listApproveRecord({
                  ...filterRules,
                  actId: activityId,
                })
                if (res.success) {
                  message.success(res.msg || '已提交，请注意查看大象消息')
                  loadSkuApplyListToModel({
                    bizLine: getBizLine(),
                    activityId: activityId,
                  })
                } else {
                  message.error(res.msg || '数据提交失败，请重试')
                }
                return res
              },
              //列表下载也要考虑---新客爆品的新增字段的情况
              onListDownloadConfirm(filterRules) {
                return exportSkuApplyRecord({
                  ...filterRules,
                  actId: activityId,
                  sence: ExportSenceEnum.Discount,
                })
              },
              async onListDismissConfirm({ filterRules, reason }) {
                const res = await batchExitSkuApplyRecordByCondition({
                  ...filterRules,
                  reason,
                  actId: activityId,
                  operateTime: dayjs().unix(),
                })
                if (res.success) {
                  message.success(res.msg || '已提交，请注意查看大象消息')
                  loadSkuApplyListToModel({
                    bizLine: getBizLine(),
                    activityId: activityId,
                  })
                } else {
                  message.error(res.msg || '数据提交失败，请重试')
                }
                return res
              },
              // batchCancelCustomHandler: async ({
              //   reason,
              //   canCancelRecords,
              // }) => {
              //   const count = canCancelRecords.length
              //   Modal.confirm({
              //     centered: true,
              //     title: '确认清退吗？',
              //     content: `仅未清退的活动可进行清退通过操作，当前符合条件的活动为${count}个`,
              //     cancelText: '取消',
              //     okText: '确认',
              //     async onOk(e, type) {},
              //   })
              // },
              listDismissCustomHandler: async ({ reason, filterRules }) => {
                const res = await countByCondition({
                  actId: activityId,
                  ...filterRules,
                })
                const count = res.data || 0
                Modal.confirm({
                  centered: true,
                  title: '清退后活动将失效，确认列表内活动全部清退吗？',
                  content: <CommonTips count={count} />,
                  cancelText: '取消',
                  okText: '确认',
                  async onOk(e, type) {
                    if (count === 0) {
                      message.warning('无可清退的门店')
                      return null
                    }
                    const res = await batchExitSkuApplyRecordByCondition({
                      ...filterRules,
                      reason,
                      actId: activityId,
                      operateTime: dayjs().unix(),
                    })
                    if (res.success) {
                      message.success(res.msg || '已提交，请注意查看大象消息')
                      loadSkuApplyListToModel({
                        bizLine: getBizLine(),
                        activityId: activityId,
                      })
                    } else {
                      message.success(res.msg || '数据提交失败，请重试')
                    }
                    return res
                  },
                })
              },
              async onListDismissCount(filterRules) {
                const res = await getPoiListDismissCount({
                  ...filterRules,
                  actId: activityId,
                  operateTime: dayjs().unix(),
                })

                if (res.success) {
                  return res.data
                } else {
                  message.error(res.msg || '获取可清退门店数量失败，请重试')
                  return {
                    totalCount: 0,
                    exitCount: 0,
                  }
                }
              },
              async onBatchCancelCount(canCancelRecords) {
                const res = await getPoiListDismissCount({
                  poiIds: canCancelRecords.map((item) => (item as any)?.poiId),
                  actId: activityId,
                  operateTime: dayjs().unix(),
                })

                if (res.success) {
                  return res.data
                } else {
                  message.error(res.msg || '获取可清退门店数量失败，请重试')
                  return {
                    totalCount: 0,
                    exitCount: 0,
                  }
                }
              },
              async onListApproveCount(filterRules) {
                const res = await countByCondition({
                  ...filterRules,
                  actId: activityId,
                })
                return res.data || 0
              },
            },
            getCanApproveRecords(choosedRecords) {
              const { data } = skuApplyListModel.getList()
              return choosedRecords
                .map((e) => data.find((x) => x.esId === e.esId))
                .filter((e) => e?.status === ActivityStatusOfFilter.ToAudit)
            },
            getCanCancelRecords(choosedRecords) {
              const { data } = skuApplyListModel.getList()
              return choosedRecords
                .map((e) => data.find((x) => x.esId === e.esId))
                .filter((e) => e?.status !== ActivityStatusOfFilter.Exit)
            },
          }}
        />
      </SubPanel>
    </div>
  )
}

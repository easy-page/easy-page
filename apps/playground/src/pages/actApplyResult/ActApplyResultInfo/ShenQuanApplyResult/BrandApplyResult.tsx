import { Button, message } from 'antd'
import { SubPanel } from '../common/components/SubPanel'
import { Statistic } from '../common/components/Statistic'
import { DownloadOutlined } from '@ant-design/icons'
import {
  ActivityStatusOfFilter,
  BrandApplyListItem,
  PoiApplyListItem,
  ZsptButton,
  exitPoiApply,
  exportPoiApplyRecord,
  exportPoiApplyRecordDetail,
  exportPoiInviteRecord,
  getBizLine,
  loadPoiApplyListToModel,
} from '@/common'
import {
  PoiActApplyDetailContainer,
  StatisticContainer,
} from '../common/containers'
import { BatchAction, CommonApplyResultTabTypeEnum, PageInfo } from '../common'
import {
  poiName,
  poiId,
  brandId,
  city,
  applyStatus,
} from '../common/components/Filters/fields'
import { brandName } from '../common/components/Filters/fields/brandName'
import { QuestionTooltip } from '@/common/components/base/QuestionTooltip'
import { showBatchCancelResult } from '../common/operations'
import {
  BrandApplyRecordDownloadType,
  exportBrandApplyRecordDetail,
} from '@/common/apis/exportPoiBrandApplyRecord'
import { BrandActApplyDetailContainer } from '../common/containers/BrandActApplyDetailContainer'
import {
  brandApplyListModel,
  loadBrandApplyListToModel,
} from '@/common/models/brandApplyList'
import { PoiActApplyListScene } from '../common/components/CommonActApplyList/columns'
import { BrandActApplyListColumnId } from '../common/components/CommonActApplyList/columnIds'
import {
  BrandListDismissCountRes,
  getBrandListDismissCount,
} from '@/common/apis/getBrandListDismissCount'
import { exitBrandApply } from '@/common/apis/exitBrandApply'
import dayjs from 'dayjs'
import { getBrandDismissCount } from '@/common/apis/getBrandDismissCount'
import { dismissBrandApplyList } from '@/common/apis/dismissBrandApplyList'

export type PoiApplyResultProps = {
  activityId: number
}

export const BrandApplyResult = ({ activityId }: PoiApplyResultProps) => {
  return (
    <div className="flex flex-col">
      <SubPanel title="报名统计">
        <StatisticContainer
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
                const res = await exportBrandApplyRecordDetail({
                  actId: activityId,
                  exportType: BrandApplyRecordDownloadType.InviteDetail,
                })
                if (res.success) {
                  message.success('正在导出中，请注意查看大象消息')
                } else {
                  message.error(res.msg || '下载明细失败')
                }
              }}
            >
              下载已邀请明细
            </ZsptButton>
            <ZsptButton
              onClick={async () => {
                const res = await exportBrandApplyRecordDetail({
                  actId: activityId,
                  exportType: BrandApplyRecordDownloadType.ApplyDetail,
                })
                if (res.success) {
                  message.success('正在导出中，请注意查看大象消息')
                } else {
                  message.error(res.msg || '下载明细失败')
                }
              }}
              className="ml-2"
              icon={<DownloadOutlined />}
            >
              下载已报名明细
            </ZsptButton>
          </div>
        }
      >
        <BrandActApplyDetailContainer<BrandApplyListItem>
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
            filters: [brandName, brandId],
            operations: [
              BatchAction.ListDownload,
              // BatchAction.ListApprove,
              BatchAction.ListDismiss,
              // BatchAction.Approve,
              // BatchAction.Dismiss,
              BatchAction.AsyncDismiss,
            ],
          }}
          poiActApplyListProps={{
            columnIds: Object.values(BrandActApplyListColumnId),
            listModel: brandApplyListModel,
            loadListData: loadBrandApplyListToModel,
            sence: PoiActApplyListScene.BrandApplyResult,
            operationsProps: {
              async onBatchApproveConfirm({ canApproveRecords }) {
                console.log('onBatchApproveConfirm:', canApproveRecords)
                return Promise.resolve({} as any)
              },
              async onBatchCancelConfirm({ canCancelRecords, reason }) {
                const result = await exitBrandApply({
                  reason,
                  actId: activityId,
                  poiBrandIds: canCancelRecords.map((e) => e.poiBrandId),
                  operateTime: dayjs().unix(),
                })
                if (result.success) {
                  message.success(result.msg || '已提交，请注意查看大象消息')
                  loadBrandApplyListToModel({
                    bizLine: getBizLine(),
                    activityId: activityId,
                  })
                } else {
                  message.success(result.msg || '清退失败，请稍后重试')
                }
                return result
              },
              async onListApproveConfirm(filterRules) {
                console.log('onListApproveConfirm:', filterRules)
                return Promise.resolve({} as any)
              },
              async onListDismissConfirm({ filterRules, reason }) {
                const res = await dismissBrandApplyList({
                  ...filterRules,
                  reason,
                  actId: activityId,
                  operateTime: dayjs().unix(),
                })
                if (res.success) {
                  message.success(res.msg || '已提交，请注意查看大象消息')
                  loadBrandApplyListToModel({
                    bizLine: getBizLine(),
                    activityId: activityId,
                  })
                } else {
                  message.success(res.msg || '数据提交失败，请重试')
                }
                return res
              },

              async getAsyncBatchListCount(poiBrandIds) {
                const res = await getBrandDismissCount({
                  poiBrandIds: poiBrandIds.map((item) => item.poiBrandId),
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

              onListDownloadConfirm(filterRules) {
                return exportBrandApplyRecordDetail({
                  actId: activityId,
                  exportType: BrandApplyRecordDownloadType.ListDetail,
                  ...filterRules,
                })
              },

              async onListDismissCount(filterRules) {
                const res = await getBrandListDismissCount({
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
            },

            getCanApproveRecords(choosedRecords) {
              return choosedRecords
            },
            getCanCancelRecords(choosedRecords) {
              // 业务品牌需要再查询门店，所以这里不使用状态判断
              return choosedRecords
            },
          }}
        />
      </SubPanel>
    </div>
  )
}

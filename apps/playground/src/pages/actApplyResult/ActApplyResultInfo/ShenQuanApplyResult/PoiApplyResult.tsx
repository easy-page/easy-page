import { Button, message, Modal } from 'antd'
import { SubPanel } from '../common/components/SubPanel'
import { Statistic } from '../common/components/Statistic'
import { DownloadOutlined } from '@ant-design/icons'
import {
  ActivityStatusOfFilter,
  PoiApplyListItem,
  ZsptButton,
  dismissPoiApplyList,
  exitPoiApply,
  exportPoiApplyRecord,
  exportPoiInviteRecord,
  getBizLine,
  loadPoiApplyListToModel,
  mccModel,
  poiApplyListModel,
} from '@/common'
import {
  PoiActApplyDetailContainer,
  StatisticContainer,
} from '../common/containers'
import { BatchAction } from '../common'
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
import { PoiActApplyListScene } from '../common/components/CommonActApplyList/columns'
import { PoiActApplyListColumnId } from '../common/components/CommonActApplyList/columnIds'
import { getPoiListDismissCount } from '@/common/apis/getPoiListDismissCount'
import dayjs from 'dayjs'
import { useMemo } from 'react'
import { subsidyLevel } from '../common/components/Filters/fields/subsidyLevel'
import { PoiSysCancel } from '../common/components/PoiSysCancel'

export type PoiApplyResultProps = {
  activityId: number
}
export const PoiApplyResult = ({ activityId }: PoiApplyResultProps) => {
  const { data: mccData } = mccModel.getData()
  const { shy_condition_exit_poi_switch = true } = mccData || {}

  const listOperations = useMemo(() => {
    const baseOperations = [BatchAction.Dismiss]

    // 如果降级，则不展示列表清退按钮
    // if (shy_condition_exit_poi_switch === 'true') {
    //   baseOperations.push(BatchAction.ListDismiss)
    // }
    return baseOperations
  }, [shy_condition_exit_poi_switch])

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
                const res = await exportPoiInviteRecord({ actId: activityId })
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
                const res = await exportPoiApplyRecord({ actId: activityId })
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
        <PoiActApplyDetailContainer<PoiApplyListItem>
          activityId={activityId}
          operationTips={
            ''
            // <QuestionTooltip
            //   tooltip={
            //     '指对下方列表的筛选结果进行对应处理。如您未进行任何条件筛选，则会对全部报名结果数据进行处理；如您进行了条件筛选，则仅对您筛选的结果进行处理。'
            //   }
            //   text={''}
            // ></QuestionTooltip>
          }
          batchDismiss={
            <ZsptButton
              className="mr-2"
              type="primary"
              onClick={() => {
                const dispose = Modal.confirm({
                  title: '批量清退',
                  centered: true,
                  rootClassName: 'w-[800px]',
                  className: 'w-[800px]',
                  content: (
                    <PoiSysCancel
                      onCancel={() => {
                        dispose.destroy()
                      }}
                      onSubmit={(data) => {
                        console.log('ddd:', data)
                        Modal.confirm({
                          title: '确认清退吗?',
                          centered: true,
                          content:
                            '清退后，商家活动将失效，请确认。（具体结果，已大象消息为准，请注意查收！）',
                          cancelText: '取消',
                          okText: '确定',
                          async onOk(...args) {
                            const res = await exitPoiApply({
                              ...data,
                              actId: activityId,
                            })
                            if (!res.success) {
                              message.error(res.msg || '批量清退失败')
                              dispose.destroy()
                            } else {
                              message.success(res.msg || '批量清退成功')
                              loadPoiApplyListToModel({
                                bizLine: getBizLine(),
                                activityId: activityId,
                              })
                              dispose.destroy()
                            }
                          },
                        })
                        return Promise.resolve()
                      }}
                    />
                  ),
                  footer: null,
                })
              }}
            >
              批量清退
            </ZsptButton>
          }
          applyResultConfig={{
            filters: [
              poiName,
              poiId,
              brandName,
              brandId,
              city,
              applyStatus,
              subsidyLevel,
            ],
            filterCount: 7,
            operations: listOperations,
          }}
          poiActApplyListProps={{
            disableSelect: true,
            columnIds: Object.values(PoiActApplyListColumnId).filter(
              (item) =>
                ![
                  PoiActApplyListColumnId.ChargeSidePoiy,
                  PoiActApplyListColumnId.ChargeSideMtb,
                  PoiActApplyListColumnId.ChargeSideAgent,
                ].includes(item)
            ),
            listModel: poiApplyListModel,
            sence: PoiActApplyListScene.ApplyResult,
            loadListData: loadPoiApplyListToModel,
            operationsProps: {
              async onBatchApproveConfirm({ canApproveRecords }) {
                console.log('onBatchApproveConfirm:', canApproveRecords)
                return Promise.resolve({} as any)
              },
              async onBatchCancelConfirm({ canCancelRecords, reason }) {
                console.log('onBatchCancelConfirm:胡雪测试')
                const result = await exitPoiApply({
                  reason,
                  actId: activityId,
                  list: canCancelRecords.map((e) => ({
                    id: e.id,
                    poiId: e.poiId,
                    poiName: e.poiName,
                  })),
                })
                if (result.success) {
                  showBatchCancelResult(result.data, () => {
                    loadPoiApplyListToModel({
                      bizLine: getBizLine(),
                      activityId: activityId,
                    })
                  })
                } else {
                  message.error(result.msg || '批量清退失败，请稍后重试')
                }
                return result
              },
              async onListApproveConfirm(filterRules) {
                console.log('onListApproveConfirm:', filterRules)
                return Promise.resolve({} as any)
              },
              async onListDismissConfirm({ filterRules, reason }) {
                const res = await dismissPoiApplyList({
                  ...filterRules,
                  reason,
                  actId: activityId,
                  operateTime: dayjs().unix(),
                })
                if (res.success) {
                  message.success(res.msg || '已提交，请注意查看大象消息')
                  loadPoiApplyListToModel({
                    bizLine: getBizLine(),
                    activityId: activityId,
                  })
                } else {
                  message.success(res.msg || '数据提交失败，请重试')
                }
                return res
              },
              //列表下载也要考虑---新客爆品的新增字段的情况
              onListDownloadConfirm(filterRules) {
                console.log('onListDownloadConfirm:', filterRules)
                return exportPoiApplyRecord({
                  ...filterRules,
                  actId: activityId,
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
                return Promise.resolve(3)
              },
            },

            getCanApproveRecords(choosedRecords) {
              return choosedRecords
            },
            getCanCancelRecords(choosedRecords) {
              return choosedRecords.filter(
                (e) => e.status !== ActivityStatusOfFilter.Exit
              )
            },
          }}
        />
      </SubPanel>
    </div>
  )
}

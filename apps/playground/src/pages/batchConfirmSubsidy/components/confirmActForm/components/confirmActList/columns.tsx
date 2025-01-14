import { ActInfo } from '@/common/apis'
import { OperaitonContext } from '@/common/auths'

import {
  ActListScene,
  ActListColumnId,
  AuthUrl,
  GrayRuleCode,
  ActivitySourceEnum,
  OperationType,
  ConfirmOptionSelectType,
  ConfirmOtherReason,
  ConfirmRejectReasonOptions,
  ConfirmStatusEnum,
} from '@/common/constants'
import { FormatStyle, formateDate, getQueryString, toJson } from '@/common/libs'
import { Button, Tooltip } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'
import { Empty } from '@easy-page/antd-ui'
import { SingleBrandStatInfo } from '@/common/apis/getBrandStatList'
import {
  FromPage,
  getActFilterType,
  getOperationColumnInfo,
  TableUtil,
  toOldCrudAct,
} from '@/common'
import { SingleBatchConfirmAct } from '@/common/apis/getBatchConfirmActList'
import dayjs from 'dayjs'

export const ACT_LIST_DEFAULT_OP_COUNT = 6

export type ActListContext<T = Empty> = Omit<
  OperaitonContext<T>,
  'record' | 'operation' | 'authUrl'
>

export enum BatchConfirmActListScene {
  BatchConfirmAct = 'batchConfirmAct',
}

export enum BatchConfirmActColumns {
  Id = 'id',
  ActName = 'name',
  /** 活动时间 */
  ActTime = 'actTime',
  /** 券规则 */
  CouponRule = 'couponRule',
  /** 品牌补贴 */
  BrandSubsidy = 'brandSubsidy',
  /** 发送渠道 */
  SendChannel = 'sendChannel',
  /** 合作运营确认时间 */
  BdConfirmTime = 'bdConfirmTime',
  /** 补贴提报状态 */
  ConfirmStatusDesc = 'confirmStatusDesc',
  /** 活动创建时间 */
  Ctime = 'ctime',
  Operation = 'operation',
}

export const batchConfirmActListColumns = new TableUtil<
  SingleBatchConfirmAct,
  BatchConfirmActListScene.BatchConfirmAct,
  {}
>()

batchConfirmActListColumns.createColumns({
  sence: BatchConfirmActListScene.BatchConfirmAct,
  columns: {
    [BatchConfirmActColumns.Id]: () => ({
      width: 160,
      title: '活动id',
    }),
    [BatchConfirmActColumns.ActName]: () => ({
      width: 180,
      title: '活动名称',
    }),
    [BatchConfirmActColumns.ActTime]: () => ({
      width: 220,
      title: '活动生效时间',
      render: (text, row) => {
        const { activityStartTime, activityEndTime } = row
        return (
          <div>
            <div>
              {formateDate(activityStartTime, FormatStyle.YYYYMMDDHHmmss)}至
            </div>
            <div>
              {formateDate(activityEndTime, FormatStyle.YYYYMMDDHHmmss)}
            </div>
          </div>
        )
      },
    }),
    [BatchConfirmActColumns.CouponRule]: () => ({
      width: 120,
      title: '券规则',
      render: (text, row) => {
        const { confirmContent } = row
        const { couponRule } = confirmContent

        return <span>{couponRule}</span>
      },
    }),

    [BatchConfirmActColumns.BrandSubsidy]: () => ({
      width: 120,
      title: '品牌补贴',
      render: (text, row) => {
        const { confirmContent } = row
        const { productBrandCharge } = confirmContent

        return <span>{productBrandCharge}</span>
      },
    }),

    [BatchConfirmActColumns.SendChannel]: () => ({
      width: 120,
      title: '发券渠道',
      render: (text, row) => {
        const { confirmContent } = row
        const { couponChannel } = confirmContent

        return <span>{couponChannel}</span>
      },
    }),

    [BatchConfirmActColumns.BdConfirmTime]: () => ({
      width: 220,
      title: '合作运营确认时间',
      render: (text, row) => {
        const { confirmStartTime, confirmEndTime } = row
        return (
          <div>
            <div>
              {formateDate(confirmStartTime, FormatStyle.YYYYMMDDHHmmss)}至
            </div>
            <div>{formateDate(confirmEndTime, FormatStyle.YYYYMMDDHHmmss)}</div>
          </div>
        )
      },
    }),

    [BatchConfirmActColumns.ConfirmStatusDesc]: () => ({
      width: 150,
      title: '补贴提报状态',
      render: (text, row) => {
        const { auditResultList, confirmStatus } = row

        const PROMPT_STYLE = {
          padding: 0,
          color: 'red',
          fontSize: '12px',
          lineHeight: '16px',
        }

        const handleRejectText = (text: string) => {
          if (confirmStatus !== ConfirmStatusEnum.Reject) {
            return <div>{text}</div>
          }

          let rejectReason = null
          try {
            rejectReason = JSON.parse(text)
          } catch (error) {
            return <div>{text}</div>
          }
          let rejectOptionsText = ''
          let rejectDesc = ''

          Object.keys(rejectReason).forEach((key) => {
            if (key === ConfirmOtherReason) {
              rejectDesc = rejectReason[key]
            }

            if (rejectReason[key] === ConfirmOptionSelectType.Select) {
              const optionItem = ConfirmRejectReasonOptions.find(
                (item: { label: string; value: string }) => item.value === key
              )
              if (optionItem) {
                rejectOptionsText = rejectOptionsText + optionItem.label
              }
            }
          })
          return (
            <div>
              <div>驳回理由：{rejectOptionsText}</div>
              <div>驳回描述：{rejectDesc}</div>
            </div>
          )
        }

        return (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
            }}
          >
            {text}
            {(auditResultList || []).map((auditResult, index) => {
              let content
              // 默认为普通文本
              content = <span style={PROMPT_STYLE}> {auditResult.title}</span>
              // 如果返回了 url 则展示超链接
              if (auditResult.url) {
                content = (
                  <Button
                    style={PROMPT_STYLE}
                    type="link"
                    onClick={() => window.open(auditResult.url)}
                  >
                    {auditResult.title}
                  </Button>
                )
              }

              if (auditResult.text) {
                // 返回了 text 则说明要展示 Tooltip
                return (
                  <div key={index}>
                    {content}
                    <Tooltip title={handleRejectText(auditResult.text)}>
                      <QuestionCircleOutlined
                        style={{ fontSize: '12px', color: 'red' }}
                      />
                    </Tooltip>
                  </div>
                )
              } else {
                // 没返回 text 则直接展示内容
                return <div key={index}>{content}</div>
              }
            })}
          </div>
        )
      },
    }),

    [BatchConfirmActColumns.Ctime]: () => ({
      width: 180,
      title: '创建时间/创建人',
      render: (text, row) => {
        const { ctime, creator } = row

        return (
          <div>
            <div>{`${dayjs(ctime * 1000).format(
              FormatStyle.YYYYMMDDHHmmss
            )}`}</div>
            <div>{creator}</div>
          </div>
        )
      },
    }),

    [BatchConfirmActColumns.Operation]: () => ({
      width: 120,
      title: '操作',
      fixed: 'right',
      render: (text, record) => {
        const { ctime, creator } = record

        return (
          <div>
            <Button
              onClick={() => {
                const bizLine = getQueryString('bizLine')

                const { templateInfo } = record
                const { feProperties } = templateInfo
                const promotionTypeConfig = toJson(feProperties, {
                  defaultValue: {},
                })

                toOldCrudAct(
                  {
                    bizLine: bizLine,
                    operationType: OperationType.VIEW,
                    activityId: record.id,
                    planId: record.planId,
                    groupId: record.groupId,
                    tabValue: record.groupId || undefined,
                    groupName: record.groupName,
                    filterType: getActFilterType(),
                    promotionTypeConfig: promotionTypeConfig,
                    groupTime:
                      record?.groupStartTime && record?.groupEndTime
                        ? [record?.groupStartTime, record?.groupEndTime]
                        : [],
                    templateId: record.templateId,
                    tempId: record.templateId,
                    source: ActivitySourceEnum.Activity,
                    fromPage: FromPage.ActivityList,
                  },
                  '_blank'
                )
              }}
              type="link"
            >
              查看
            </Button>
          </div>
        )
      },
    }),
  },
})

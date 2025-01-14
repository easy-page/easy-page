import { ActInfo } from '@/common/apis'
import { OperaitonContext } from '@/common/auths'

import {
  ActListScene,
  ActListColumnId,
  AuthUrl,
  GrayRuleCode,
  PlanAndActTabResources,
  BizLineEnum,
  ActSubTabResources,
  ConfirmOptionSelectType,
  ConfirmOtherReason,
  ConfirmRejectReasonOptions,
  ConfirmStatusEnum,
} from '@/common/constants'
import { FormatStyle, formateDate } from '@/common/libs'
import { Button, Tooltip } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'
import { Empty } from '@easy-page/antd-ui'
import { SingleBrandStatInfo } from '@/common/apis/getBrandStatList'
import { ActConfirmStatusTag, getOperationColumnInfo, StatusTagSizeEnum, TableUtil, toPlanAndActList } from '@/common'
import { SingleBatchConfirmAct } from '@/common/apis/getBatchConfirmActList'
import { SingleKaConfirmActInfo } from '@/common/apis/getKaConfirmActList'
import dayjs from 'dayjs'

export const ACT_LIST_DEFAULT_OP_COUNT = 6

export type ActListContext<T = Empty> = Omit<
  OperaitonContext<T>,
  'record' | 'operation' | 'authUrl'
>

export enum KaConfirmResultSence {
  KaConfirmResult = 'kaConfirmResult',
}

export enum KaConfirmResultColumnsEnum {
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
  /** 活动确认状态 */
  ActivityConfirmStatusDesc = 'activityConfirmStatusDesc',
  /** 补贴提报状态 */
  ConfirmStatusDesc = 'confirmStatusDesc',
  /** 补贴分摊规则 */
  SubsidyRule = 'subsidyRule',
  /** 活动创建时间 */
  Ctime = 'ctime',
  Operation = 'operation',
}

export const kaConfirmResultColumns = new TableUtil<
  SingleKaConfirmActInfo,
  KaConfirmResultSence.KaConfirmResult,
  {}
>()

kaConfirmResultColumns.createColumns({
  sence: KaConfirmResultSence.KaConfirmResult,
  columns: {
    [KaConfirmResultColumnsEnum.Id]: () => ({
      width: 120,
      title: '活动id',
    }),
    [KaConfirmResultColumnsEnum.ActName]: () => ({
      width: 180,
      title: '活动名称',
    }),
    [KaConfirmResultColumnsEnum.ActTime]: () => ({
      width: 180,
      title: '活动时间',
      render: (text, row) => {
        const { activityStartTime, activityEndTime } = row
        return (
          <div>
            <div>
              {formateDate(activityStartTime, FormatStyle.YYYYMMDDHHmmss)}
            </div>
            <div>
              {formateDate(activityEndTime, FormatStyle.YYYYMMDDHHmmss)}
            </div>
          </div>
        )
      },
    }),
    [KaConfirmResultColumnsEnum.CouponRule]: () => ({
      width: 120,
      title: '券规则',
      render: (text, row) => {
        const { confirmContent } = row
        const { couponRule } = confirmContent

        return <span>{couponRule}</span>
      },
    }),

    [KaConfirmResultColumnsEnum.BrandSubsidy]: () => ({
      width: 120,
      title: '品牌补贴',
      render: (text, row) => {
        const { confirmContent } = row
        const { productBrandCharge } = confirmContent

        return <span>{productBrandCharge}</span>
      },
    }),

    [KaConfirmResultColumnsEnum.SendChannel]: () => ({
      width: 120,
      title: '发券渠道',
      render: (text, row) => {
        const { confirmContent } = row
        const { couponChannel } = confirmContent

        return <span>{couponChannel}</span>
      },
    }),

    [KaConfirmResultColumnsEnum.BdConfirmTime]: () => ({
      width: 180,
      title: '合作运营确认时间',
      render: (text, row) => {
        const { confirmStartTime, confirmEndTime } = row
        return (
          <div>
            <div>
              {formateDate(confirmStartTime, FormatStyle.YYYYMMDDHHmmss)}
            </div>
            <div>{formateDate(confirmEndTime, FormatStyle.YYYYMMDDHHmmss)}</div>
          </div>
        )
      },
    }),

    [KaConfirmResultColumnsEnum.ActivityConfirmStatusDesc]: () => ({
      width: 160,
      title: (
        <div>
          提报活动确认状态
          <Tooltip
            title={
              <div>
                <div>1、未开始：指该提报活动尚未到达合作运营确认开始时间。</div>
                <div>
                  2、待确认：指该提报活动处于合作运营确认周期内，且受邀的多个业务品牌未全部确认完成，或者处于审批中、审批驳回状态。
                </div>
                <div>
                  3、已确认：指该活动处于合作运营确认周期内，且全部业务品牌已确认完成且审批通过。
                </div>
                <div>4、已结束：指该活动的合作运营确认周期已结束。</div>
              </div>
            }
          >
            <QuestionCircleOutlined></QuestionCircleOutlined>
          </Tooltip>
        </div>
      ),
      render: (text, record) => {
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

    [KaConfirmResultColumnsEnum.ConfirmStatusDesc]: () => ({
      width: 200,
      title: (
        <div>
          业务品牌补贴提报状态
          <Tooltip
            title={<div>指当前业务品牌在该提报活动中的补贴提报状态</div>}
          >
            <QuestionCircleOutlined></QuestionCircleOutlined>
          </Tooltip>
        </div>
      ),
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

    [KaConfirmResultColumnsEnum.SubsidyRule]: () => ({
      width: 240,
      title: '补贴分摊规则',
      render: (text, row) => {
        const { confirmContent } = row
        const { subsidyRule } = confirmContent

        if (!confirmContent || !subsidyRule) {
          return '-'
        }

        return <span style={{ whiteSpace: 'pre-wrap' }}>{subsidyRule}</span>
      },
    }),

    [KaConfirmResultColumnsEnum.Ctime]: () => ({
      width: 200,
      title: '活动创建时间/创建人',
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

    [KaConfirmResultColumnsEnum.Operation]: () => ({
      width: 150,
      title: '操作',
      fixed: 'right',
      align: 'center',
      render: (text, row) => {
        const { ctime, creator } = row

        return (
          <div>
            <Button
              onClick={() => {
                //支持在新页面打开【需要我确认的活动】列表，并根据活动 id 查询出该提报活动
                toPlanAndActList(
                  {
                    tab: PlanAndActTabResources.Act,
                    bizLine: `${BizLineEnum.ShanGou}`,
                    actFilterType: ActSubTabResources.Confirm,
                    activityId: `${row.id}`,
                  },
                  '_blank'
                )
              }}
              type="link"
            >
              查看活动
            </Button>
          </div>
        )
      },
    }),
  },
})

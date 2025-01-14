import { ActInfo } from '@/common/apis'
import { OperaitonContext } from '@/common/auths'

import {
  ActListScene,
  ActListColumnId,
  AuthUrl,
  GrayRuleCode,
} from '@/common/constants'
import {
  FormatStyle,
  formateDate,
  getQueryString,
  openInUocEntry,
} from '@/common/libs'
import { Button, Tooltip } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'
import { Empty } from '@easy-page/antd-ui'
import { SingleBrandStatInfo } from '@/common/apis/getBrandStatList'
import {
  appendParamsToUrl,
  getOperationColumnInfo,
  TableUtil,
  UrlEnum,
} from '@/common'
import dayjs from 'dayjs'

export const ACT_LIST_DEFAULT_OP_COUNT = 6

export type ActListContext<T = Empty> = Omit<
  OperaitonContext<T>,
  'record' | 'operation' | 'authUrl'
>

export enum BrandStatListScene {
  BrandConfirm = 'brandConfirm',
}

export enum BrandStatColumns {
  BrandId = 'brandId', // 业务品牌ID
  BrandName = 'brandName',
  /** 确认周期内的活动数 */
  AmountInConfirmPeriod = 'amountInConfirmPeriod', //
  /** 当前待确认的活动数 */
  AmountTobeConfirm = 'amountTobeConfirm',
  /** 即将开始确认的活动数 */
  AmountToBeginConfirm = 'amountToBeginConfirm', //
  /** 合作运营确认开始时 */
  ConfirmBeginTime = 'confirmBeginTime', //
  /** 合作运营确认开始时 */
  ConfirmTableOpetation = 'confirmTableOpetation',
}

export const brandStatListColumns = new TableUtil<
  SingleBrandStatInfo,
  BrandStatListScene.BrandConfirm,
  {}
>()

brandStatListColumns.createColumns({
  sence: BrandStatListScene.BrandConfirm,
  columns: {
    [BrandStatColumns.BrandId]: () => ({
      width: 80,
      title: '业务品牌 id',
      align: 'center',
    }),
    [BrandStatColumns.BrandName]: () => ({
      width: 140,
      title: '业务品牌名称',
      align: 'center',
    }),
    [BrandStatColumns.AmountInConfirmPeriod]: () => ({
      width: 120,
      title: (
        <div>
          确认周期内的活动数
          <Tooltip title="指邀请了该业务品牌、且当前在合作运营确认周期内的的提报活动数量">
            <QuestionCircleOutlined />
          </Tooltip>
        </div>
      ),
      align: 'center',
      dotLineNumber: 2,
      render: (text, row) => {
        if (!text || text === 0) {
          return 0
        }

        return text

        // return (
        //   <Button
        //     type="link"
        //     onClick={() => {
        //       const bizLine = getQueryString('bizLine')
        //       openInUocEntry(
        //         appendParamsToUrl(UrlEnum.KaConfirmResult, {
        //           bizLine,
        //           brandId: row.brandId,
        //           confirmStartTime: dayjs().startOf('day').unix(),
        //           confirmEndTime: dayjs().endOf('day').unix(),
        //           activityConfirmStatus: 2,
        //         }),
        //         '_blank'
        //       )
        //     }}
        //   >
        //     {text}
        //   </Button>
        // )
      },
    }),
    [BrandStatColumns.AmountTobeConfirm]: () => ({
      width: 120,
      title: (
        <div>
          当前待确认的活动数
          <Tooltip title="指该业务品牌的合作运营确认状态为“待确认”的提报活动数量">
            <QuestionCircleOutlined />
          </Tooltip>
        </div>
      ),
      align: 'center',
      render: (text, row) => {
        if (!text || text === 0) {
          return 0
        }

        return (
          <Button
            type="link"
            onClick={() => {
              const bizLine = getQueryString('bizLine')
              openInUocEntry(
                appendParamsToUrl(UrlEnum.KaConfirmResult, {
                  bizLine,
                  brandId: row.brandId,
                  confirmStatus: 1,
                  activityConfirmStatus: 2,
                }),
                '_blank'
              )
            }}
          >
            {text}
          </Button>
        )
      },
    }),
    [BrandStatColumns.AmountToBeginConfirm]: () => ({
      width: 160,
      title: (
        <div>
          即将开始确认的活动数
          <Tooltip title="指邀请了该业务品牌，但当前还未到达合作运营确认开始时间的提报活动数量">
            <QuestionCircleOutlined />
          </Tooltip>
        </div>
      ),
      align: 'center',
      render: (text, row) => {
        if (!text || text === 0) {
          return 0
        }

        return (
          <div className="flex flex-col">
            <Button
              type="link"
              onClick={() => {
                const bizLine = getQueryString('bizLine')
                openInUocEntry(
                  appendParamsToUrl(UrlEnum.KaConfirmResult, {
                    bizLine,
                    brandId: row.brandId,
                    activityConfirmStatus: 1,
                  }),
                  '_blank'
                )
              }}
            >
              {text}
            </Button>
            <div>
              最早
              {formateDate(row.confirmBeginTime, FormatStyle.YYYYMMDDHHmmss)}
              开始
            </div>
          </div>
        )
      },
    }),
    [BrandStatColumns.ConfirmTableOpetation]: () => ({
      width: 120,
      title: '操作',
      align: 'center',
      render: (text, row) => {
        const { amountInConfirmPeriod } = row

        return (
          <div className="flex flex-row items-center justify-center">
            <Button
              type="link"
              disabled={amountInConfirmPeriod === 0}
              onClick={() => {
                const bizLine = getQueryString('bizLine')
                openInUocEntry(
                  appendParamsToUrl(UrlEnum.BatchConfirmSubsidy, {
                    bizLine,
                    brandIds: JSON.stringify([row.brandId]),
                    confirm4Batch: 'false',
                  }),
                  '_blank'
                )
              }}
            >
              活动批量确认
            </Button>
            <Button
              type="link"
              onClick={() => {
                const bizLine = getQueryString('bizLine')
                openInUocEntry(
                  appendParamsToUrl(UrlEnum.KaConfirmResult, {
                    bizLine,
                    brandId: row.brandId,
                  }),
                  '_blank'
                )
              }}
            >
              查看确认结果
            </Button>
          </div>
        )
      },
    }),
  },
})

import React, { useMemo } from 'react'
import { SingleBatchConfirmAct } from '@/common/apis/getBatchConfirmActList'
import { Modal, Table, message } from 'antd'
import { batchConfirmActStatModel } from '@/common/models/btachConfirmActStat'
import { observer } from 'mobx-react'
import {
  BatchConfirmSubsidyActInfo,
  BatchConfirmSubsidyChargeDetailVo,
} from '@/common/apis/batchConfirmSubsidy'
import {
  batchConfirmPnListModel,
  ChargeSideEnum,
  mccModel,
  PoiTypeEnum,
  PoiTypeText,
} from '@/common'
export type PreviewModalProps = {
  actInfo: Array<BatchConfirmSubsidyActInfo>
  subsidyInfo: BatchConfirmSubsidyChargeDetailVo[]
}

export type PreviewTableRow = {
  poiType: PoiTypeEnum
  meituanChargeAmt: number
  agentChargeAmt: number
  merchantChargeAmt: number
  pn: string
}

const chargeSidCodeColumnMap = {
  [ChargeSideEnum.MeiTuanShanGou]: 'meituanChargeAmt',
  [ChargeSideEnum.Agent]: 'agentChargeAmt',
  [ChargeSideEnum.Merchant]: 'merchantChargeAmt',
}

export const PreviewModalInfo = observer(
  ({ actInfo, subsidyInfo }: PreviewModalProps) => {
    const { data } = batchConfirmActStatModel.getData()

    const { data: pnData } = batchConfirmPnListModel.getList()

    const { brandInfo } = data

    const columns = [
      {
        title: '门店类型',
        dataIndex: 'poiType',
        width: 60,
        render: (text) => <span>{PoiTypeText[text]}</span>,
      },
      {
        title: '美团(闪购)承担',
        width: 120,
        dataIndex: 'meituanChargeAmt',
        render: (text, row) => {
          const { pn } = row

          if (!pn) {
            return '-'
          }

          const pnName = pnData.find((item) => item.pn === pn).pnName
          return (
            <div>
              <div>{text}%</div>
              <div>
                ({pnName}
                {pn})
              </div>
            </div>
          )
        },
      },
      {
        title: '代理商承担',
        width: 60,
        dataIndex: 'agentChargeAmt',
        render: (text) => {
          if (!text) return <div>0%</div>
          return <div>{text}%</div>
        },
      },
      {
        title: '商家承担',
        width: 60,
        dataIndex: 'merchantChargeAmt',
        render: (text) => <div>{text}%</div>,
      },
    ]

    const tableData = useMemo(() => {
      const directRow = {
        poiType: PoiTypeEnum.Direct,
      } as any as PreviewTableRow
      const agentRow = {
        poiType: PoiTypeEnum.Agent,
      } as any as PreviewTableRow
      subsidyInfo.map((item) => {
        if (item.poiType === PoiTypeEnum.Direct) {
          directRow[chargeSidCodeColumnMap[item.chargeSide]] = item.chargeAmt
          if (item.pn) {
            directRow.pn = item.pn
          }
        } else {
          agentRow[chargeSidCodeColumnMap[item.chargeSide]] = item.chargeAmt
          if (item.pn) {
            agentRow.pn = item.pn
          }
        }
      })
      return [directRow, agentRow]
    }, [subsidyInfo])

    return (
      <div className="flex flex-col">
        <div>
          您将对以下业务品牌和提报活动进行批量补贴确认，
          <span className="text-[#ff4d4f]">
            提交后活动均会按照下方设置的美、代、商比例进行补贴分摊，请您再次确认活动范围无误后再提交。
          </span>
        </div>
        <div className="mt-2">
          业务品牌: {brandInfo[0].brandName}({brandInfo[0].brandId})
          {brandInfo.length > 1 ? (
            <>
              等<span className="text-[#ff4d4f]">{brandInfo.length}个</span>
              业务品牌
            </>
          ) : (
            <></>
          )}
        </div>
        <div className="mt-2">
          提报活动: 共勾选&nbsp;
          <span className="text-[#ff4d4f]">{actInfo.length}个</span>
        </div>
        <div className="flex flex-col mt-2">
          <div>补贴分摊规则:</div>
          <Table
            columns={columns}
            rowKey={'poiType'}
            dataSource={tableData}
            loading={false}
            // scroll={{
            //   // y: 'calc(100vh - 420px)',
            //   x: 1000,
            // }}
            pagination={false}
          />
        </div>
      </div>
    )
  }
)

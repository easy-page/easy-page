import { RequestHandler, postReq } from '@/common/libs'
import {
  ActFullInfo,
  ChargeSideInfo,
  ISubsidy,
  MtChargeSidePn,
} from './saveAct'
import { getPreviewRulesInfo } from './getActRules'
import { message } from 'antd'
import { ChargeSideEnum, ChargeTypeEnum, PoiTypeEnum } from '../constants'
import Big from 'big.js'

export type GetActDetailParams = {
  activityId: number
}

export type GetActDetailResult = ActFullInfo

const getChargeSideInfo = ({
  data,
  chargeSideKeys,
  poiType,
}: {
  data: ISubsidy[]
  chargeSideKeys: ChargeSideEnum[]
  poiType: PoiTypeEnum
}): ChargeSideInfo | undefined => {
  const subsidies = data.filter(
    (x) => chargeSideKeys.includes(x.chargeSide) && x.poiType === poiType
  )

  if (subsidies.length === 0) {
    return undefined
  }
  const chargeSideInfo: ChargeSideInfo = {
    chargeSideCode: subsidies[0].chargeSide,
    maxAmount: subsidies[0].maxAmount,
    chargeAmt: 0,
  }
  const pns: MtChargeSidePn[] = []
  let chargeAmt = new Big(0)
  subsidies.forEach((x) => {
    chargeAmt = chargeAmt.add(x.chargeAmt || 0)
  })
  chargeSideInfo.chargeAmt = chargeAmt.toNumber()

  subsidies.forEach((x) => {
    if (x.pn) {
      const chargeAmtByPercent = x.chargeAmt
        ? new Big(x.chargeAmt).times(100).div(chargeAmt).toNumber()
        : 0

      pns.push({
        pn: x.pn,
        pnName: x.pnName,
        /**
         * - 按比例：美团补贴的 chargeAmt / 当前pn 计算后的补贴 x.chargeAmt = 当前 pn 的补贴值
         * - 按金额，则为：x.chargeAmt
         *  */
        chargeAmt:
          x.chargeType === ChargeTypeEnum.Percentage
            ? chargeAmtByPercent
            : x.chargeAmt,
      })
    }
  })
  if (pns.length > 0) {
    chargeSideInfo.pns = pns
  }
  return chargeSideInfo
}

const handleSubsidy = (data: GetActDetailResult): GetActDetailResult => {
  data.subActivity = data.subActivity || []
  data.subActivity.forEach((each) => {
    if (!each.contentList || each.contentList?.length <= 0) {
      return
    }

    // 后端返回的其实是：ISubsidy，需要转换成前端所需要的
    const chargeDetailVos: ISubsidy[] = (each.contentList[0].subsidy
      .chargeDetailVos || []) as any as ISubsidy[]

    if (!chargeDetailVos || chargeDetailVos?.length <= 0) {
      return
    }

    /**
     * - 因为生成数据的时候，对每一个 poiType 生成了相同的数据，因此，这里在选择 All 时取其中一种情况即可，比如：PoiTypeEnum.Direct
     */
    const poiType =
      data.activity?.poiType === PoiTypeEnum.All
        ? PoiTypeEnum.Direct
        : data.activity?.poiType
    const chargeDetailVo = chargeDetailVos[0]
    const chargeType = chargeDetailVo.chargeType
    each.contentList[0].subsidy.chargeDetailVos = [
      {
        chargeType,
        meituan: getChargeSideInfo({
          data: chargeDetailVos,
          chargeSideKeys: [ChargeSideEnum.MeiTuanShanGou, ChargeSideEnum.MeiTuanWaiMai],
          poiType,
        }),
        agent: getChargeSideInfo({
          data: chargeDetailVos,
          chargeSideKeys: [ChargeSideEnum.Agent],
          poiType,
        }),
        merchant: getChargeSideInfo({
          data: chargeDetailVos,
          chargeSideKeys: [ChargeSideEnum.Merchant],
          poiType,
        }),
      },
    ]
  })
  console.log('subsidy data:', data)
  return data
}

export const getActDetail: RequestHandler<
  GetActDetailParams,
  GetActDetailResult
> = async (params) => {
  const res = await postReq('/api/zspt/operation/act/getActDetail', params)
  if (!res.success || !res.data.actRule) {
    return {
      ...res,
      data: handleSubsidy(res.data),
    } as any
  }
  const { activity } = res.data as ActFullInfo
  const actRuleRes = await getPreviewRulesInfo({
    activityId: activity.id,
  })

  if (!actRuleRes.success) {
    message.error(actRuleRes.msg || '未获取到选品与优惠规则数据，请重试')
    return {
      ...res,
      data: handleSubsidy(res.data),
    } as any
  }

  return {
    success: true,
    data: {
      ...handleSubsidy(res.data),
      actRule: {
        actRule: res.data?.actRule,
        uploadError: [],
        allPass: true,
        actStashList: actRuleRes.data,
      },
    },
  }
}

import { getPnList, GetPnListParams, IsMisOrgPn, PnInfo } from '../apis'
import { MapModel } from './base/map'

/**
 * - 专门用于 CRUD 页面的管理
 * - 用于管理选择了哪些 pn，可选哪些 pn
 */

export type CrudPnListState = {
  pns: PnInfo[]
  /** 存储所有选择的 pn */
  choosedPns: string[]
}

/** 只存储 5 个不重复的 */
const MAX_PN_COUNT = 5

export class PnListModel extends MapModel<CrudPnListState, {}> {
  constructor(props) {
    super(props)
  }

  updateChoosedPns(pn: string, lastPn?: string) {
    const fullPns = this.mapInfo.data?.pns || []
    const choosedPns = [...(this.mapInfo.data?.choosedPns || [])]
    // const isReplace = Boolean(lastPn)
    // if (isReplace) {
    //   /** 替换掉所选 pn */
    //   choosedPns = choosedPns.map((e) => {
    //     if (e === lastPn) {
    //       return pn
    //     }
    //     return e
    //   })
    // }

    this.setMapInfo({
      data: {
        pns: fullPns,
        choosedPns,
      },
    })
  }

  getCanChoosedPns({
    curPn,
    curSubChoosedPns,
  }: {
    /** 当前子活动已经选择的数量 */
    curSubChoosedPns: string[]
    curPn: string
  }): PnInfo[] {
    const pns: PnInfo[] = []
    const fullPns = this.mapInfo.data?.pns || []
    const choosedPns = this.mapInfo.data?.choosedPns || []

    return pns
  }
}

export const crudPnListModal = new PnListModel({})

export const loadCurdActPnListToModel = ({
  bgBuList,
}: Pick<GetPnListParams, 'bgBuList'>) => {
  return crudPnListModal.loadData(async () => {
    const res = await getPnList({
      period: new Date().getTime() / 1000,
      bgBuList,
      isInMisOrg: IsMisOrgPn.No,
      page: {
        currentPage: 1,
        pageSize: 300,
      },
    })
    const data = res.data || []
    return {
      data: {
        pns: data,
        choosedPns: [],
      },
      success: res.success,
      msg: res.msg,
    }
  })
}

import { DownloadType } from "@/common"


export const MODAL_INFOS: Record<DownloadType, {
  des: string
}> = {
  merge: {
    des: '您将收到一个汇总的EXCEL文件，如对列表有筛选，则下载的是筛选之后的活动'
  },
  splitByPoiBrand: {
    des:
      '您将收到【按业务品牌】拆分的多个EXCEL文件，如对列表有筛选，则下载的是筛选之后的活动'
  }
}

export const ALL_TEMPLATE_ID = -1 // 支持全部促销类型的templateid
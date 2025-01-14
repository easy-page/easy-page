import {
  actListModel,
  ActSubTabResources,
  ActTypeEnum,
  BizLineEnum,
  getActList,
} from '@/common'

export const loadActList = ({
  actType,
  bizline,
}: {
  actType: ActTypeEnum
  bizline: BizLineEnum
}) => {
  return actListModel.loadListWithPage(async (filters) => {
    const { pageNo } = filters
    const res = await getActList({
      ...filters,
      /**
       * 通过路径上的参数，解决初次进入加载问题
       * 如果传递了 filterType 就是用透传的
       *  */
      filterType: ActSubTabResources.All,
      actType: actType,
      bizLine: bizline,
      activityConfirmStatus: -1,
      ctime: (filters.ctime || []).filter((e) => Boolean(e)),
      kaConfirmTime: undefined,
      currentPage: pageNo,
    } as any)
    return {
      data: res.data?.items || [],
      total: res.data?.total || 0,
      error: !res.success,
      msg: res.msg,
    }
  })
}

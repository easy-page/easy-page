import {
  BizLineEnum,
  roleManager,
  ZsptRolesEnum,
  toCrudAct,
  OperationType,
  ActTypeEnum,
  UrlEnum,
  appendParamsToUrl,
} from '@/common'
import { GetCreateActItemHandler } from '../interface'

export const getCreateShenhuiyuanItem: GetCreateActItemHandler = () => ({
  title: '神会员',
  bizLine: BizLineEnum.WaiMai,
  /** 申请权限的 roleId */
  roleId: roleManager.getRoleIdOfCurEnv(ZsptRolesEnum.WaiMaiDo),
  desc: '支持提报门店类型的天天神券活动，支持配置按订单档位补贴、差异化时段补贴、差异化人群补贴等', 
  btnText: '立即创建',
  handler() {
    toCrudAct(
      {
        bizLine: `${BizLineEnum.WaiMai}`,
        operationType: OperationType.CREATE,
        actType: ActTypeEnum.SHEN_HUI_YUAN,
      },
      '_blank'
    )
  },
})

export const getWaiMaSongJiuItem: GetCreateActItemHandler = () => ({
  title: '歪马资源位招商',
  bizLine: BizLineEnum.WaimaSongJiu,
  /** 申请权限的 roleId */
  roleId: roleManager.getRoleIdOfCurEnv(ZsptRolesEnum.WaimaSongJiuOfAct),
  desc: '', // 待补充文案
  btnText: '立即创建',
  handler() {
    // window.open(
    //   appendParamsToUrl(UrlEnum.CrudAct, {
    //     bizLine: `${BizLineEnum.WaimaSongJiu}`,
    //     operationType: OperationType.CREATE,
    //     actType: ActTypeEnum.WAIMA_SOURCE,
    //   })
    // )
    toCrudAct(
      {
        bizLine: `${BizLineEnum.WaimaSongJiu}`,
        operationType: OperationType.CREATE,
        actType: ActTypeEnum.WAIMA_SOURCE,
      },
      '_blank'
    )
  },
})

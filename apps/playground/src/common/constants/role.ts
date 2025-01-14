import { BizLineEnum } from './bizline'
import { EnvEnum } from './env'

export enum ZsptRolesEnum {
  /** 招商平台_功能管理  闪购招商管理员*/
  Admin = 'Admin',
  /** 闪购运营（招商方案） */
  ZsptPlan = 'ZsptPlan',
  /** 招商平台_闪购招商运营品牌组 */
  SgBrand = 'SgBrand',
  /** 闪购运营（神价项目） */
  GodPrice = 'GodPrice',
  /** 闪购运营（神券方案） */
  GodTicket = 'GodTicket',
  /** 招商平台_闪购招商运营非品牌组-改名：闪购运营（提报活动） */
  // SgUnBrand = 'SgUnBrand',
  /** 招商平台_闪购招商运营（活动）：改名为：闪购运营（提报活动） */
  SgAct = 'SgAct',
  /** 招商平台_管理员，如果存在此管理员角色，可以授权别人  目前看来说没有用*/
  ZsptAdmin = 'ZsptAdmin',
  /** 外卖运营（神会员招商方案）*/
  WaiMaiDo = 'WaimaiDo',
  /** 外卖招商管理员 */
  WaiMaiManager = 'WaiMaiManager',
  /** 外卖运营（提报活动） */
  WaimaiDoOfAct = 'WaimaiDoOfAct',
  /** 歪马运营（提报活动） */
  WaimaSongJiuOfAct = 'WaimaSongJiuOfAct',
  /** 歪马运营（管理员） */
  WaimaSongJiuAdmin = 'WaimaSongJiuAdmin',
  /** 闪购运营（联盟红包方案） */
  UnionCoupon = 'UnionCoupon',
}

export type ZsptEnvIds = {
  /** 线上环境 */
  [EnvEnum.Online]: number
  /** ST环境 */
  [EnvEnum.St]: number
  /** 测试环境 */
  [EnvEnum.Test]: number
}

export const ZsptRoleNameAndIdMap: Record<ZsptRolesEnum, string> = {
  [ZsptRolesEnum.Admin]: '闪购招商管理员',
  [ZsptRolesEnum.GodPrice]: '闪购运营（神价项目）',
  [ZsptRolesEnum.ZsptPlan]: '闪购运营（招商方案）',
  [ZsptRolesEnum.SgBrand]: '招商平台_闪购招商运营品牌组',
  [ZsptRolesEnum.SgAct]: '闪购运营（提报活动）',
  [ZsptRolesEnum.ZsptAdmin]: '招商平台_管理员',
  [ZsptRolesEnum.WaiMaiDo]: '外卖运营（神会员招商方案）',
  [ZsptRolesEnum.WaiMaiManager]: '外卖招商管理员',
  [ZsptRolesEnum.WaimaiDoOfAct]: '外卖运营（提报活动）',
  [ZsptRolesEnum.WaimaSongJiuOfAct]: '歪马运营（提报活动）',
  [ZsptRolesEnum.WaimaSongJiuAdmin]: '歪马招商管理员',
  [ZsptRolesEnum.GodTicket]: '闪购运营（神券方案）',
  [ZsptRolesEnum.UnionCoupon]: '闪购运营（联盟红包方案）',
}

/**
 * - 后续新增角色需统一在这里进行角色注册
 */
export const ZsptRoleIds: Record<ZsptRolesEnum, ZsptEnvIds> = {
  [ZsptRolesEnum.WaiMaiDo]: {
    [EnvEnum.Online]: 10077692,
    [EnvEnum.St]: 10077692,
    [EnvEnum.Test]: 10052530,
  },
  [ZsptRolesEnum.WaiMaiManager]: {
    [EnvEnum.Online]: 10077689,
    [EnvEnum.St]: 10077689,
    [EnvEnum.Test]: 10052528,
  },
  [ZsptRolesEnum.WaimaiDoOfAct]: {
    [EnvEnum.Online]: 10077690,
    [EnvEnum.St]: 10077690,
    [EnvEnum.Test]: 10052531,
  },
  [ZsptRolesEnum.Admin]: {
    // 闪购招商管理员
    [EnvEnum.Online]: 10023340,
    [EnvEnum.St]: 10023340,
    [EnvEnum.Test]: 10006239,
  },
  [ZsptRolesEnum.GodPrice]: {
    [EnvEnum.Online]: 10060674,
    [EnvEnum.St]: 10060674,
    [EnvEnum.Test]: 10035795,
  },
  [ZsptRolesEnum.ZsptPlan]: {
    [EnvEnum.Online]: 10060673,
    [EnvEnum.St]: 10060673,
    [EnvEnum.Test]: 10035794,
  },
  [ZsptRolesEnum.SgBrand]: {
    [EnvEnum.Online]: 10023341,
    [EnvEnum.St]: 10023341,
    [EnvEnum.Test]: 10006815,
  },
  [ZsptRolesEnum.GodTicket]: {
    [EnvEnum.Online]: 10140701,
    [EnvEnum.St]: 10140701,
    [EnvEnum.Test]: 10086522,
  },
  [ZsptRolesEnum.SgAct]: {
    [EnvEnum.Online]: 10023342,
    [EnvEnum.St]: 10023342,
    [EnvEnum.Test]: 10006816,
  },
  [ZsptRolesEnum.ZsptAdmin]: {
    [EnvEnum.Online]: 10056022,
    [EnvEnum.St]: 10056022,
    [EnvEnum.Test]: 10033680,
  },
  [ZsptRolesEnum.WaimaSongJiuOfAct]: {
    [EnvEnum.Online]: 10140501,
    [EnvEnum.St]: 10140501,
    [EnvEnum.Test]: 10082819,
  },
  [ZsptRolesEnum.WaimaSongJiuAdmin]: {
    [EnvEnum.Online]: 10142051,
    [EnvEnum.St]: 10142051,
    [EnvEnum.Test]: 10082818,
  },
  [ZsptRolesEnum.UnionCoupon]: {
    [EnvEnum.Online]: 10147494,
    [EnvEnum.St]: 10147494,
    [EnvEnum.Test]: 10100860,
  },
}

/** 角色和业务线的关系 */
export const ZsptRoleAndBizlineMap: Record<ZsptRolesEnum, BizLineEnum[]> = {
  [ZsptRolesEnum.Admin]: [BizLineEnum.ShanGou],
  [ZsptRolesEnum.GodPrice]: [BizLineEnum.ShanGou],
  [ZsptRolesEnum.GodTicket]: [BizLineEnum.ShanGou],
  [ZsptRolesEnum.ZsptPlan]: [BizLineEnum.ShanGou],
  [ZsptRolesEnum.SgBrand]: [BizLineEnum.ShanGou],
  [ZsptRolesEnum.SgAct]: [BizLineEnum.ShanGou],
  [ZsptRolesEnum.ZsptAdmin]: [BizLineEnum.ShanGou],
  [ZsptRolesEnum.WaiMaiDo]: [BizLineEnum.WaiMai],
  [ZsptRolesEnum.WaiMaiManager]: [BizLineEnum.WaiMai],
  [ZsptRolesEnum.WaimaiDoOfAct]: [BizLineEnum.WaiMai],
  [ZsptRolesEnum.WaimaSongJiuOfAct]: [BizLineEnum.WaimaSongJiu],
  [ZsptRolesEnum.WaimaSongJiuAdmin]: [BizLineEnum.WaimaSongJiu],
  [ZsptRolesEnum.UnionCoupon]: [BizLineEnum.ShanGou],
}

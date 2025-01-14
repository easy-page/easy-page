import {
  BizLineEnum,
  OperationType,
  PlanTypeEnum,
  ZsptRolesEnum,
  getIamUrl,
  toCrudPlan,
} from '@/common'
import { roleManager } from '@/common/roles/manager'
import { CreatePlanItem, GetCreatePlanItemHandler } from './interface'
import { toOldCrudPlan } from '@/common/routes/toUrls/old/toOldCurdPlan'

const getCreateBrandItem: GetCreatePlanItemHandler = () => ({
  title: '品牌方案',
  bizLine: BizLineEnum.ShanGou,
  /** 申请权限的 roleId */
  roleId: roleManager.getRoleIdOfCurEnv(ZsptRolesEnum.SgBrand),
  desc: '用于「闪购品牌组」面向品牌商发起招商，同时支持与其他业务合作完成共补类活动招商。',
  btnText: '立即创建',
  handler() {
    toOldCrudPlan(
      {
        operationType: OperationType.CREATE,
        bizLine: BizLineEnum.ShanGou,
        planType: PlanTypeEnum.Brand,
      },
      '_blank'
    )
  },
})

const getCreateGodPriceItem: GetCreatePlanItemHandler = () => {
  return {
    title: '神价方案',
    bizLine: BizLineEnum.ShanGou,
    roleId: roleManager.getRoleIdOfCurEnv(ZsptRolesEnum.GodPrice),
    desc: '用于「闪购神价场域」招商，支持组包商品为特色能力，由项目组和合作方共同完成活动创建。',
    btnText: '立即创建',
    handler() {
      toOldCrudPlan(
        {
          operationType: OperationType.CREATE,
          bizLine: BizLineEnum.ShanGou,
          planType: PlanTypeEnum.GodPrice,
        },
        '_blank'
      )
    },
  }
}

const getCreateGodTicketItem: GetCreatePlanItemHandler = () => {
  return {
    title: '神券方案',
    bizLine: BizLineEnum.ShanGou,
    roleId: roleManager.getRoleIdOfCurEnv(ZsptRolesEnum.GodTicket),
    desc: '用于【闪购神券】招商，支持项目组设置招商方案，合作业务组引用招商方案并创建招商活动。',
    btnText: '立即创建',
    handler() {
      toCrudPlan(
        {
          bizLine: BizLineEnum.ShanGou,
          operationType: OperationType.CREATE,
          planType: PlanTypeEnum.ShenHuiYuan,
        },
        '_blank'
      )
    },
  }
}

/** 神券补贴出资方案 */
const getCreateShenQuanItem: GetCreatePlanItemHandler = () => {
  return {
    title: '神会员补贴出资策略',
    roleId: roleManager.getRoleIdOfCurEnv(ZsptRolesEnum.WaiMaiManager),
    bizLine: BizLineEnum.WaiMai,
    desc: '',
    btnText: '立即创建',
    handler() {
      toCrudPlan(
        {
          bizLine: BizLineEnum.WaiMai,
          operationType: OperationType.CREATE,
          planType: PlanTypeEnum.ShenHuiYuan,
        },
        '_blank'
      )
    },
  }
}

/** 站外联盟红包方案 */
const getCreateUnionCouponItem: GetCreatePlanItemHandler = () => {
  return {
    title: '美团联盟红包方案',
    roleId: roleManager.getRoleIdOfCurEnv(ZsptRolesEnum.UnionCoupon),
    bizLine: BizLineEnum.ShanGou,
    desc: '用于【闪购美团联盟红包】招商，支持项目组设置招商方案 (补贴佣金等)，合作业务组引用招商方案并创建招商活动。',
    btnText: '立即创建',
    handler() {
      toCrudPlan(
        {
          bizLine: BizLineEnum.ShanGou,
          operationType: OperationType.CREATE,
          planType: PlanTypeEnum.UnionCoupon,
        },
        '_blank'
      )
    },
  }
}

/** 如有新增，需要增加！！！！ */
const ALL_CREATE_ITEMS = [
  getCreateBrandItem,
  getCreateGodPriceItem,
  getCreateShenQuanItem,
  getCreateGodTicketItem,
]

export type CreatePlanItemsVal = {
  /** 角色直接存在权限 */
  hasAuthItems: GetCreatePlanItemHandler[]
  /** 角色不存在权限，但可见选项，前往申请 */
  needApplyItems?: GetCreatePlanItemHandler[]

  /** 如果存在要申请角色，则可以配置此信息 */
  applyInfo?: (context: {
    roleId: number
  }) => Pick<CreatePlanItem, 'btnClass' | 'btnText' | 'btnType' | 'handler'>
}

export const CreatePlanItemsMap: Record<ZsptRolesEnum, CreatePlanItemsVal> = {
  [ZsptRolesEnum.WaiMaiDo]: {
    hasAuthItems: [getCreateShenQuanItem],
  },
  [ZsptRolesEnum.WaiMaiManager]: {
    hasAuthItems: [getCreateShenQuanItem],
  },
  [ZsptRolesEnum.WaimaiDoOfAct]: {
    hasAuthItems: [],
  },
  [ZsptRolesEnum.Admin]: {
    hasAuthItems: [
      getCreateBrandItem,
      getCreateGodPriceItem,
      getCreateGodTicketItem,
      getCreateUnionCouponItem,
    ],
  },
  [ZsptRolesEnum.GodPrice]: {
    hasAuthItems: [getCreateGodPriceItem],
  },
  [ZsptRolesEnum.UnionCoupon]: {
    hasAuthItems: [getCreateUnionCouponItem],
  },
  [ZsptRolesEnum.ZsptPlan]: {
    hasAuthItems: [],
    needApplyItems: [
      getCreateBrandItem,
      getCreateGodPriceItem,
      getCreateGodTicketItem,
      getCreateUnionCouponItem,
    ],
    applyInfo: ({ roleId }) => {
      return {
        btnText: '暂无权限，去申请 >',
        btnType: 'text',
        btnClass: 'text-[#346DEE]',
        handler: () => window.top?.open(getIamUrl(roleId), '_blank'),
      }
    },
  },
  [ZsptRolesEnum.SgBrand]: {
    hasAuthItems: [getCreateBrandItem],
  },
  [ZsptRolesEnum.GodTicket]: {
    hasAuthItems: [getCreateGodTicketItem],
  },
  [ZsptRolesEnum.SgAct]: {
    hasAuthItems: [],
  },
  [ZsptRolesEnum.WaimaSongJiuAdmin]: {
    hasAuthItems: [],
  },
  [ZsptRolesEnum.WaimaSongJiuOfAct]: {
    hasAuthItems: [],
  },
  [ZsptRolesEnum.ZsptAdmin]: {
    hasAuthItems: ALL_CREATE_ITEMS,
  },
}

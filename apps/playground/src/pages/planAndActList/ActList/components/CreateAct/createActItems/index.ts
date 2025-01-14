import {
  ActivitySourceEnum,
  BizLineEnum,
  getBizLine,
  OperationType,
  roleManager,
  toCrudAct,
  toOldCrudAct,
  userModel,
  ZsptRolesEnum,
} from '@/common'
import {
  GetCreateActItemHandler,
  CreateActItem,
  GetCreateActItemContext,
} from '../interface'
import {
  getCreateShenhuiyuanItem,
  getWaiMaSongJiuItem,
} from './getCreateActItem'
import { uniqWith, flatten } from 'lodash'
import { ActItemInfo } from '@/common/apis/getCreateActItems'
import { ConfigListInfo } from '@/common/apis/getConfigList'
import { getActConfig } from '@/common/configs'
import { inWhiteList } from '@/common/utils/inWhiteList'

export type CreateActItemsVal = {
  /** 角色直接存在权限 */
  hasAuthItems: GetCreateActItemHandler[]
  /** 角色不存在权限，但可见选项，前往申请 */
  needApplyItems?: GetCreateActItemHandler[]

  /** 如果存在要申请角色，则可以配置此信息 */
  applyInfo?: (context: {
    roleId: number
  }) => Pick<CreateActItem, 'btnText' | 'btnType' | 'handler'>
}

/** 如有新增，需要增加！！！！ */
const ALL_CREATE_ITEMS = [getCreateShenhuiyuanItem]

export const CreateActItemsMap: Record<ZsptRolesEnum, CreateActItemsVal> = {
  [ZsptRolesEnum.WaiMaiDo]: {
    hasAuthItems: [],
  },
  [ZsptRolesEnum.UnionCoupon]: {
    hasAuthItems: [getCreateShenhuiyuanItem],
  },
  [ZsptRolesEnum.WaiMaiManager]: {
    hasAuthItems: [getCreateShenhuiyuanItem],
  },
  [ZsptRolesEnum.WaimaiDoOfAct]: {
    hasAuthItems: [getCreateShenhuiyuanItem],
  },
  [ZsptRolesEnum.Admin]: {
    hasAuthItems: [getCreateShenhuiyuanItem],
  },
  [ZsptRolesEnum.GodPrice]: {
    hasAuthItems: [getCreateShenhuiyuanItem],
  },
  [ZsptRolesEnum.GodTicket]: {
    hasAuthItems: [getCreateShenhuiyuanItem], // todo
  },
  [ZsptRolesEnum.ZsptPlan]: {
    hasAuthItems: [getCreateShenhuiyuanItem],
  },
  [ZsptRolesEnum.SgBrand]: {
    hasAuthItems: [getCreateShenhuiyuanItem],
  },
  [ZsptRolesEnum.SgAct]: {
    hasAuthItems: [getCreateShenhuiyuanItem],
  },
  [ZsptRolesEnum.ZsptAdmin]: {
    hasAuthItems: [getCreateShenhuiyuanItem],
  },
  // TODO: 这里是否应该替换
  [ZsptRolesEnum.WaimaSongJiuAdmin]: {
    hasAuthItems: [],
  },
  [ZsptRolesEnum.WaimaSongJiuOfAct]: {
    hasAuthItems: [],
  },
}

const prepareActItemsFromBackend = ({
  actTemplates,
  configs,
}: {
  actTemplates?: ActItemInfo[]
  configs: ConfigListInfo[]
}): CreateActItem[] => {
  if (!actTemplates) {
    return []
  }
  const bizLine = getBizLine() || BizLineEnum.WaiMai
  return actTemplates
    .map((e) => {
      const config = getActConfig({
        templateId: e.tempId,
        configs: configs,
      })

      return {
        title: e.tempName,
        bizLine: config.bizLine,
        /** TODO: 申请权限的 roleId，需要后端返回 */
        roleId: roleManager.getRoleIdOfCurEnv(ZsptRolesEnum.WaiMaiDo),
        desc: e.tempDesc, // 待补充文案
        btnText: '立即创建',
        handler() {
          const bizLine = `${config.bizLine || BizLineEnum.WaiMai}`
          if (config.useNewZsptFramework && inWhiteList(config.actType)) {
            // 为折扣活动做一个临时的灰度开关

            toCrudAct(
              {
                bizLine,
                operationType: OperationType.CREATE,
                actType: config.actType,
              },
              '_blank'
            )
            return
          }
          toOldCrudAct(
            {
              bizLine,
              operationType: OperationType.CREATE,
              promotionTypeConfig: config.actType,
              templateId: e.tempId,
              tempId: e.tempId,
              source: ActivitySourceEnum.Activity,
            },
            '_blank'
          )
        },
      }
    })
    .filter((e) => e.bizLine === bizLine)
}

const getConfigCreateActItems = (
  context: GetCreateActItemContext
): CreateActItem[] => {
  const { userInfo } = context
  const bizLine = getBizLine() || BizLineEnum.WaiMai
  const roles = roleManager.getRoles({ userInfo, bizLine })
  const result = uniqWith(
    flatten<CreateActItem>(
      roles.map((each) => {
        const itemInfos = CreateActItemsMap[each]
        const needToApplyItems = (itemInfos.needApplyItems || []).map((e) => {
          const item = e(context)
          const applyInfo = itemInfos.applyInfo?.({ roleId: item.roleId }) || {}
          return {
            ...item,
            ...applyInfo,
          }
        }) as CreateActItem[]
        const hasAuthItems = itemInfos.hasAuthItems.map((e) => e(context))
        return [...hasAuthItems, ...needToApplyItems]
      })
    ),
    (a, b) => a.title === b.title
  )

  return result.filter((e) => e.bizLine === bizLine)
}

export const getCreateActItems = (
  context: GetCreateActItemContext,
  options: {
    actTemplates: ActItemInfo[]
    configs: ConfigListInfo[]
  }
): CreateActItem[] => {
  const configItems = getConfigCreateActItems(context)
  const backendItems = prepareActItemsFromBackend(options)
  return [...configItems, ...backendItems]
}

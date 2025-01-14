import {
  BizLineEnum,
  roleManager,
  ZsptRolesEnum,
  toCrudAct,
  OperationType,
  ActTypeEnum,
} from '@/common'
import { GetCreateActItemHandler } from '../interface'

export const getCreateDiscountDishItem: GetCreateActItemHandler = () => ({
  title: '折扣菜活动',
  bizLine: BizLineEnum.WaiMai,
  /** 申请权限的 roleId */
  roleId: roleManager.getRoleIdOfCurEnv(ZsptRolesEnum.WaiMaiDo),
  desc: '', // 待补充文案
  btnText: '立即创建',
  handler() {
    toCrudAct(
      {
        bizLine: `${BizLineEnum.WaiMai}`,
        operationType: OperationType.CREATE,
        actType: ActTypeEnum.WM_DISCOUNT,
      },
      '_blank'
    )
  },
})

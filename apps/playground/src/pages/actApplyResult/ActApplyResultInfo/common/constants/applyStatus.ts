import { ALL, OPTION_ALL } from '@/common/constants'
import { CommonApplyResultTabTypeEnum } from './actResType'

export enum ApplyStatusEnum {
  NONEED = -1,
  WAITING = 0,
  UNAPPLY = 1,
  PASSED = 2,
  REJECT = 3,
  CANCEL = 4,
  SYSCANCEL = 5,
  OFFLINE = 6,
}

export enum AuditStatusEnum {
  PASS = 1,
  REJECT = 2,
}

export const WaiMaResourceTabTypeMap = {
  [CommonApplyResultTabTypeEnum.SUPPLIER_APPLY_RESULT]: 1, // 供应商报名结果
  [CommonApplyResultTabTypeEnum.CATEGORY_OPERATE_CONFIRM_RESULT]: 2, // 品类运营确认结果
}

export enum MaterialTypeEnum {
  TEXT = 1, // 文本
  Image = 2, // 图片
}

export const APPLY_STATUS_DESC = {
  [ApplyStatusEnum.WAITING]: '待报名',
  [ApplyStatusEnum.UNAPPLY]: '待审核',
  [ApplyStatusEnum.PASSED]: '审核通过',
  [ApplyStatusEnum.REJECT]: '审核驳回',
  [ApplyStatusEnum.CANCEL]: '取消',
  [ApplyStatusEnum.SYSCANCEL]: '已清退',
  [ApplyStatusEnum.OFFLINE]: '超预算下线',
}

export const APPLY_STATUS_OPTIONS = [
  OPTION_ALL,
  ...Object.keys(APPLY_STATUS_DESC).map((item) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return { label: APPLY_STATUS_DESC[item], value: Number(item) }
  }),
]
export const POI_APPLY_STATUS_OPTIONS = APPLY_STATUS_OPTIONS.filter((item) =>
  [ApplyStatusEnum.PASSED, ApplyStatusEnum.SYSCANCEL, ALL].includes(item.value)
)
export const BRAND_APPLY_STATUS_OPTIONS = APPLY_STATUS_OPTIONS.filter((item) =>
  [
    ApplyStatusEnum.UNAPPLY,
    ApplyStatusEnum.REJECT,
    ApplyStatusEnum.PASSED,
    ApplyStatusEnum.OFFLINE,
    ALL,
  ].includes(item.value)
)

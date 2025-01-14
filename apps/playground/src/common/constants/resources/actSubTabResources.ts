export enum ActSubTabResources {
  All = 1, // 全部
  Mine = 2, //我创建的
  Confirm = 3, //需要我确认的
}

/** 需要我确认的活动tab 子tab枚举 */
export enum ActConrirmSubTabResources {
  /** 按照活动维度查看 */
  Act = 'act',
  /** 按照品牌维度查看 */
  Brand = 'brand',
}

export const ActSubTabText: Record<ActSubTabResources, string> = {
  [ActSubTabResources.Mine]: '我创建的活动',
  [ActSubTabResources.Confirm]: '需要我确认的活动',
  [ActSubTabResources.All]: '全部活动',
}

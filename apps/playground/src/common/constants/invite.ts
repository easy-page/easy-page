// 邀请数据类型
export enum InviteDataTypeEnum {
  // 通过门店邀请
  Poi = 1,
  // 通过商家品牌邀请
  MerchantBrand = 2,
  // 根据条件筛选商家-数据类型还是门店(此处仅作为前端筛选)
  ConditionalFilter = 3,
}

export const InviteDataTypeDesc = {
  [InviteDataTypeEnum.Poi]: '通过门店邀请',
  [InviteDataTypeEnum.MerchantBrand]: '通过商家品牌邀请',
  [InviteDataTypeEnum.ConditionalFilter]: '根据条件筛选商家',
}

// 录入动作
export enum InviteActionTypeEnum {
  /** 不操作 */
  NoChange = 0,
  // 设置（替换）
  Replace = 1,
  /** 追加 */
  Add = 2,
  /** 删除 */
  Remove = 3,
  // 限制（限制默认 === 替换的值）
  Limited = -999,
  // 不限制
  Unlimited = -1,
}

export const InviteActionTypeDesc = {
  [InviteActionTypeEnum.Unlimited]: '不限制',
  [InviteActionTypeEnum.NoChange]: '不操作',
  [InviteActionTypeEnum.Replace]: '整体替换',
  [InviteActionTypeEnum.Add]: '追加商家',
  [InviteActionTypeEnum.Remove]: '删除商家',
  [InviteActionTypeEnum.Limited]: '限制',
}

// 录入数据类型
export enum InviteInputTypeEnum {
  // 手动录入
  ManualEntry = 1,
  // 文件
  File = 2,
  // 城市渠道
  CityChannel = 3,
  // 筛选集
  FilterAssemble = 4,
  // 在线搜索
  OnlineSearch = 7,
}

export const InviteInputTypeDesc = {
  [InviteInputTypeEnum.ManualEntry]: '录入ID',
  [InviteInputTypeEnum.File]: '上传xls/xlsx',
  [InviteInputTypeEnum.CityChannel]: '城市渠道',
  [InviteInputTypeEnum.FilterAssemble]: '关联筛选集',
  [InviteInputTypeEnum.OnlineSearch]: '在线搜索',
}

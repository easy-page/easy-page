export enum AuthUrl {
  PlanAuth = '/api/zspt/operation/plan/getAuthInfo', // 方案列表鉴权或者活动操作鉴权时候，鉴权活动对应方案时候，也使用此鉴权
  ActAuth = '/api/zspt/operation/act/getAuthInfo',
  ActCheckAuth = '/api/zspt/operation/act/checkAuth', // 活动拷贝的时候走这个，非常离谱的操作，恶心人
}

/** 从后端鉴权的枚举类型 */
export enum AuthFromBackendResEnum {
  /**
   * - 校验是否有方案类型权限，否则提示：无方案类型权限，不可操作
   * - 即后端校验对应的角色，有没有对应方案的：编辑、查看权限
   */
  PlanAuth = 'planAuth', // 验证后端的关于方案的角色操作权限：编辑、查看（目前神价在用）
  /**
   * - 验证操作者的模板权限
   * - 只有活动存在模版权限，其实是验证的活动
   */
  TempAuth = 'tempAuth', // 验证操作者的模板权限
  /**
   * - 仅创建人+被授权人可操作；否则，点击后toast提示：仅创建人及被授权的mis可操作，请联系创建人进行操作授权
   * - 这里验证的是：创建者本人
   */
  Creator = 'Creator', // 验证操作者是否为本人创建
  /**
   * - 在活动里使用，验证当前用户是否为方案创建人
   */
  PlanCreator = 'planCreator', // 验证操作者是否为方案创建人
  /**
   * - 仅创建人+被授权人可操作；否则，点击后toast提示：仅创建人及被授权的mis可操作，请联系创建人进行操作授权
   * - 这里验证的是：是否被授权
   */
  OpWhiteList = 'opWhiteList', // 验证操作者是否处于对应操作白名单之中
}

export const AuthFromBackendResText: Record<AuthFromBackendResEnum, string> = {
  [AuthFromBackendResEnum.PlanAuth]: '方案查看、编辑权限校验',
  [AuthFromBackendResEnum.TempAuth]: '活动模板权限校验',
  [AuthFromBackendResEnum.Creator]: '创建人校验',
  [AuthFromBackendResEnum.PlanCreator]: '方案创建人校验',
  [AuthFromBackendResEnum.OpWhiteList]: '白名单校验',
}

export enum UserRoleAuthEnum {
  /** 用户的角色是否有编辑权限 */
  Edit = 'edit',
  /** 用户的角色是否有查看权限 */
  View = 'view',
}

export enum AuthPlanOption {
  AuthEdit = 'AuthEdit',
  AuthSendInvite = 'AuthSendInvite',
  Authwithdraw = 'Authwithdraw',
  AuthPublishPlan = 'AuthPublishPlan',
}

export const AuthPlanOptionText: Record<AuthPlanOption, string> = {
  [AuthPlanOption.AuthEdit]: '编辑',
  [AuthPlanOption.AuthSendInvite]: '发布方案',
  [AuthPlanOption.Authwithdraw]: '撤回方案',
  [AuthPlanOption.AuthPublishPlan]: '发布方案',
}

export enum AuthActOption {
  AuthEdit = 'AuthEdit',
  AuthSendInvite = 'AuthSendInvite',
  Authwithdraw = 'Authwithdraw',
}

export const AuthActOptionText: Record<AuthActOption, string> = {
  [AuthActOption.AuthEdit]: '编辑、邀请设置',
  [AuthActOption.AuthSendInvite]: '发送邀请',
  [AuthActOption.Authwithdraw]: '撤回活动',
}

export enum OperationEnum {
  /** 活动批量确认 */
  ActBtachConfirm = 'actBtachConfirm',
  /** 查看确认结果 */
  ViewConfirmResult = 'viewConfirmResult',
  // 确认协议
  ConfirmAgreement = 'confirmAgreement',
  // 确认商品
  ConfirmSku = 'confirmSku',
  // 编辑操作授权mis号
  Modify = 'modify',
  // 发送邀请操作授权mis号
  Send = 'send',
  /** 神会员 发布方案按钮 */
  PublishPlan = 'publishPlan',
  // 撤回操作授权mis号
  Withdraw = 'withdraw',
  /** 查看操作 */
  // View = 'view'
  Copy = 'copy',

  /** 创建操作 */
  Create = 'create',
  /** 查看 */
  View = 'view',
  /** 报名结果 */
  ApplyResult = 'applyResult',
  /** 操作授权 */
  AuthOperation = 'authOperation',
  /** 邀请设置 */
  InviteSettings = 'inviteSettings',
  /** 报名结果页清退 */
  Dismiss = 'dismiss',
  /** 报名结果页列表异步清退 */
  AsyncDismiss = 'asyncDismiss',
  /** 品牌商报名结果列查看 */
  ViewToPoiTab = 'viewToPoiTab',
  /** 进度 */
  Progress = 'progress',
  /** 合作运营确认 */
  PoiConfirm = 'poiConfirm',
  /** 加入方案按钮 */
  JoinPlan = 'joinPlan',
  /** 方案报名结果页按钮 */
  PlanApplyResult = 'planApplyResult',
  /** 删除 */
  Delete = 'delete',

  /** admin-发布配置 */
  PublishConfig = 'publishConfig',
  CliConfigModify = 'cliConfigModify',

  // 审核驳回
  Reject = 'reject',
  // 审核通过
  Pass = 'pass',
  // 没有操作按钮时展示
  Hide = 'hide'
}

export enum AuthTypeEnum {
  DirectMtCharge = 26,
  AgentMtCharge = 63,
  SuperMtCharge = 30,
  /** 品牌补贴 */
  BrandCharge = 21,
  /** 商品券-直营门店美补-提报商品券 商品券TODO */
  ProductvoucherDirectMtCharge = 50,
  /** 商品券-代理门店美补-提报商品券 商品券TODO */
  ProductvoucherAgentMtCharge = 59,
  /** 商品券-超美补 */
  ProductSuperMtCharge = 52,
  /** 爆品超美补 */
  BlockbusterSuperMtCharge = 31,
  /** 统一招商平台-合作运营确认美补权限 */
  PoiConfirmMtCharge = 2002,
}

export const AuthTypeText: Record<AuthTypeEnum, string> = {
  [AuthTypeEnum.DirectMtCharge]: '直营门店美补权限',
  [AuthTypeEnum.AgentMtCharge]: '代理门店美补权限',
  [AuthTypeEnum.SuperMtCharge]: '超美补权限',
  [AuthTypeEnum.BrandCharge]: '品牌补贴',
  [AuthTypeEnum.ProductvoucherDirectMtCharge]: '商品券-直营门店美补-提报商品券',
  [AuthTypeEnum.ProductvoucherAgentMtCharge]: '商品券-代理门店美补-提报商品券',
  [AuthTypeEnum.ProductSuperMtCharge]: '商品券-超美补',
  [AuthTypeEnum.BlockbusterSuperMtCharge]: '爆品超美补',
  [AuthTypeEnum.PoiConfirmMtCharge]: '合作运营确认美补权限',
}

export enum AuthHandlersEnum {
  /** 活动复制鉴权 */
  AuthActCopy = 'AuthActCopy',
  /** 后端接口鉴权 */
  AuthFromBackEnd = 'AuthFromBackEnd',
  /** 方案后端接口鉴权，用于活动列表验证方案权限 */
  AuthActFromBackEndOfPlan = 'AuthActFromBackEndOfPlan',
  /** 方案灰度鉴权 */
  AuthPlanGray = 'AuthPlanGray',
  /** 方案拷贝鉴权 */
  AuthPlanCopy = 'AuthPlanCopy',
  /** 活动灰度鉴权 */
  AuthActGray = 'AuthActGray',
  /** 流量资源鉴权 */
  AuthNetFlow = 'AuthNetFlow',
  /** 补贴鉴权 */
  AuthSubsidy = 'AuthSubsidy',
}
export const AuthHandlersText: Record<AuthHandlersEnum, string> = {
  [AuthHandlersEnum.AuthActCopy]: '活动复制接口鉴权',
  [AuthHandlersEnum.AuthFromBackEnd]: '后端接口鉴权',
  [AuthHandlersEnum.AuthPlanGray]: '方案灰度鉴权',
  [AuthHandlersEnum.AuthPlanCopy]: '方案复制鉴权',
  [AuthHandlersEnum.AuthActGray]: '活动灰度鉴权',
  [AuthHandlersEnum.AuthNetFlow]: '流量资源鉴权',
  [AuthHandlersEnum.AuthSubsidy]: '补贴鉴权',
  [AuthHandlersEnum.AuthActFromBackEndOfPlan]: '活动列表操作验证方案权限',
}

export enum ApplyChargeCodeEnum {
  /** 直营门店美补、代理门店美补、品牌补贴申请用这个 */
  CommonCode = 104,
  /** 品牌和美补共补用这个 */
  UniteBrandChargeCode = 107,
}

/** 重要！！！！！ 添加类型后，前往：SortedAuthItems 添加排序的类型 ！！！！！ */
export enum CheckSubsidyItem {
  CheckMtChargeAuth = 'checkMtChargeAuth',
  CheckBrandChargeAuth = 'checkBrandChargeAuth',
  /** 合作运营确认时，校验：统一招商平台-合作运营确认美补权限 */
  CheckPoiConfirmMtChargeAuth = 'CheckPoiConfirmMtChargeAuth',
}

export const CheckSubsidyItemText: Record<CheckSubsidyItem, string> = {
  [CheckSubsidyItem.CheckMtChargeAuth]: '检查美补权限',
  [CheckSubsidyItem.CheckBrandChargeAuth]: '检查品牌补贴权限',
  [CheckSubsidyItem.CheckPoiConfirmMtChargeAuth]: '检查合作运营确认美补权限',
}

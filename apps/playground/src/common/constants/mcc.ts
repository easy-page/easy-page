export enum MccKeysEnum {
  ZsptTempAuditRole = 'zspt_temp_audit_role',
  WhiteListAdmin = 'while_list_admin',
  DownloadActListTemplate = 'download_act_list_template',
  /** 商确页PN选项限制 */
  UocOperateConfirmTemplatePnMapping = 'uoc_operate_confirm_template_pn_mapping',
  DegradeConfirmChargeTimeCheck = 'degrade_confirm_charge_time_check',
  SgCouponNameBlackList = 'sg_coupon_name_black_list',
  FactorAssociationRulesMap = 'factor_association_rules_map',
  TimeLimitMinutes4AgentConfirm = 'time_limit_minutes_4_agent_confirm',
  TimeIntervalMinutes4BdConfirmEndTime = 'time_interval_minutes_4_bd_confirm_end_time',
  TimeIntervalMinutes4FmAuditEndTime = 'time_interval_minutes_4_fm_audit_end_time',
  ZsptBmsFactorType = 'zspt_bms_factor_type',
  ZsptBmsFactorDataType = 'zspt_bms_factor_data_type',
  ZsptBmsFactorInputType = 'zspt_bms_factor_input_type',
  ZsptBmsFactorComponentNameOptions = 'zspt_bms_factor_component_name_options',
  NetFlowGrayList = 'net_flow_graylist',

  /** 迁移活动上线白名单控制 */
  MigrateActWhiteList = 'migrate_act_white_list',
  /** 神会员报名结果页降级开关 */
  ShyConditionExitPoiSwitch = 'shy_condition_exit_poi_switch',
  ShyPoiBrandApplySwitch = 'shy_poi_brand_apply_switch',

  /** 合作业务组配置 */
  OrganizationConfig = 'organization_config',
  /** 折扣菜可设置的最大子活动数 */
  AmountLimit4SubActivity = 'amount_limit_4_subactivity',
  /** 外卖折扣菜可设置的最大子活动数 10*/
  AmountLimit4SubActivityWMDiscount = 'amount_limit_4_subactivity_wm_discount',
  FactorCityInvertSize = 'factor_city_invert_size',

  /** 最大膨胀档位 */
  MaxExpandLevel = 'amount_limit_4_expand_in_group',

  /** 最大子方案个数 */
  ShenhuiyuanMaxSubPlan = 'amount_limit_4_group_in_plan',

  /** 活动创建-所属业务选项 */
  ShenhuiyuanBizlineOptions = 'activity_service_type_4_wm',

  /** 门店邀请上传模板地址 */
  PoiInviteTemplateUrl = 'invite_poi_excel_template_url',
  /** 品牌邀请上传模板地址 */
  BrandInviteTemplateUrl = 'invite_poi_brand_excel_template_url',

  /** 报名结果页-状态筛选条件选项 */
  ApplyResultStatus4Poi = 'apply_result_status_4_poi',

  /** 歪马资源位数量限制 */
  DrunkhorseResourcePerActivity = 'drunkhorse_resource_per_activity',

  /** 歪马品类运营确认商品周期间隔*/
  SkuOperateConfirmTimeInterval = 'sku_operate_confirm_time_interval',

  /** 歪马采购运营确认周期间隔 */
  PurchaseOperateConfirmTimeInterval = 'purchase_operate_confirm_time_interval',

  /** 控制是否展示引导建品 */
  DegradeGuideBuildProduct = 'degrade_guide_build_product',

  /** 商确美补审批比例 */
  BrandSubsidyMtSubsidyRatioMap = 'brandSubsidy_mtSubsidy_ratio_map',

  /** 风控审批人 */
  RiskContactPerson = 'risk_contact_person',
  /** 站外联盟红包档位上限 */
  Amount_limit_4_out_site_max_threshold = 'amount_limit_4_out_site_max_threshold',

  /** 站外联盟方案佣金上限阈值 */
  Commission_max_threshold = 'commission_max_threshold',

  /** 神会员场景 */
  ActivitySceneTagConfig = 'activity_scene_tag_config',
}

/** 当前迁移新架构使用的 mcc */
export const UsedContainerMccKeys = [
  MccKeysEnum.NetFlowGrayList,
  MccKeysEnum.UocOperateConfirmTemplatePnMapping,
  MccKeysEnum.BrandSubsidyMtSubsidyRatioMap,

  MccKeysEnum.OrganizationConfig,
  MccKeysEnum.AmountLimit4SubActivity,
  MccKeysEnum.MaxExpandLevel,
  MccKeysEnum.ShenhuiyuanMaxSubPlan,
  MccKeysEnum.ShenhuiyuanBizlineOptions,
  MccKeysEnum.BrandInviteTemplateUrl,
  MccKeysEnum.PoiInviteTemplateUrl,
  MccKeysEnum.ApplyResultStatus4Poi,
  MccKeysEnum.DownloadActListTemplate,
  MccKeysEnum.FactorAssociationRulesMap,
  MccKeysEnum.FactorCityInvertSize,

  MccKeysEnum.ShyConditionExitPoiSwitch,
  MccKeysEnum.ShyPoiBrandApplySwitch,
  MccKeysEnum.DrunkhorseResourcePerActivity,
  MccKeysEnum.SkuOperateConfirmTimeInterval,
  MccKeysEnum.PurchaseOperateConfirmTimeInterval,
  MccKeysEnum.DegradeGuideBuildProduct,
  MccKeysEnum.MigrateActWhiteList,
  MccKeysEnum.AmountLimit4SubActivityWMDiscount,
  MccKeysEnum.RiskContactPerson,
  MccKeysEnum.Amount_limit_4_out_site_max_threshold,
  MccKeysEnum.Commission_max_threshold,
  MccKeysEnum.ActivitySceneTagConfig,
]

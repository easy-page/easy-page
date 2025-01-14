import { OverWatchScenceTypeEnum } from "./constant";

declare global {
  interface Window {
    // 统一招商overwatch projectId
    zsptWatcher: any;
  }
}



export interface IOverWatchInfo {
  /**
   * 上报场景（活动提交/方案提交）此处使用teamId保留字段作为该含义字段
   */
  teamId?: OverWatchScenceTypeEnum
  /**
   * 任务创建人
   */
  misId?: string
  /**
   * 业务线类型
   * 从URL获取bizLine
   */
  bizType?: string
  /**
   * 项目ID用来标记上报唯一性
   * 建议取appkey
   */
  projectId?: string
  /**
   * 场景标记区分方案提交、活动提交
   * planSubmit方案提交
   * actSubmit活动提交
   */
  scenceType?: string
  /**
   * 当前活动操作状态，例如新建，修改，复制，删除
   * 从URL获取, operationType
   */
  scenarioId?: string
  /**
   * 活动来源方案/活动，此处使用subProjectId保留字段作为该含义字段
   * 从URL获取source(方案、活动)
   */
  formId?: string
  /**
   * 活动/方案ID（保持旧提报系统一样字段），此处使用pageId保留字段作为该含义字段
   */
  pageId?: string
  
  /**
   * 模板ID促销类型，此处使用formId保留字段作为该含义字段
   */
  subProjectId?: string
  /**
   * 保留字段，暂未使用
   */
  childProjectId?: string
  /**
   * 是否进入调试模式
   */
  debug?: boolean
}

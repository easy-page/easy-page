// PRD: https://km.sankuai.com/collabpage/2132111062
export enum GrayRuleCode {
  FlowControlGray = 'flowControlGray',
  IceMarkGray = 'iceMarkGray',
  PoiExpScoreGray = 'poiExpScoreGray',
  NonKaConfirmGray = 'nonKaConfirmGray', // 非KA提报流程
  BatchSysCancelAll4Sg = 'batchSysCancelAll4Sg', // 报名结果页面清退
  // TODO 确认一下这里怎么传
  BatchConfirm4ListGray = 'batchConfirm4ListGray', // 品牌列表批量确认
  BatchConfirm4ButtonGray = 'batchConfirm4ButtonGray', // 品牌列表批量确认
}

export enum CheckOpGrayResEnum {
  Pass = '1',
  Fail = '0',
}

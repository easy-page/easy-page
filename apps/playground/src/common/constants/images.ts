export enum PageErrorIconEnum {
  /** 无内容 */
  NoContent = 'empty-active.png',
  /** 暂未开放 */
  NoFunc = 'no-function.png',
  /** 暂未开放 */
  NoAuth = 'no-auth.png',
  NetworkError = 'network-error.png',

}

export const PageErrorTitleText: Record<PageErrorIconEnum, string> = {
  [PageErrorIconEnum.NoContent]: "暂无数据",
  [PageErrorIconEnum.NoFunc]: "暂未开放",
  [PageErrorIconEnum.NoAuth]: "暂无权限",
  [PageErrorIconEnum.NetworkError]: "网络异常，请稍后重试"
}
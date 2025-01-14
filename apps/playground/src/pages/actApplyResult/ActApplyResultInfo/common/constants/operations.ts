export enum BatchAction {
  /** 批量审核通过 */
  Approve = 'approve',
  /** 批量清退 */
  Dismiss = 'dismiss',
  /** 列表审核通过 */
  ListApprove = 'listApprove',
  /** 列表清退 */
  ListDismiss = 'listDismiss',
  /** 列表下载 */
  ListDownload = 'listDownload',
  /** 异步批量清退 */
  AsyncDismiss = 'asyncDismiss',
}

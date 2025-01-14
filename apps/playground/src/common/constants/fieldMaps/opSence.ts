export enum OpSenceId {
  ActInviteCreate = 'actInviteCreate',
  ActInviteCopy = 'actInviteCopy',
  ActInviteView = 'actInviteView',
  ActInviteEdit = 'actInviteEdit',
}

export const OpSenceText: Record<OpSenceId, string> = {
  [OpSenceId.ActInviteCreate]: '【创建】邀请设置',
  [OpSenceId.ActInviteCopy]: '【复制】邀请设置',
  [OpSenceId.ActInviteView]: '【查看】邀请设置',
  [OpSenceId.ActInviteEdit]: '【编辑】邀请设置',
}

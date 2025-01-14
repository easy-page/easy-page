export enum AdminTabs {
  Config = 'config',
  Field = 'field',
}

export const AdminTabsText: Record<AdminTabs, string> = {
  [AdminTabs.Config]: '全局配置',
  [AdminTabs.Field]: 'CRUD 配置',
}

export enum ConfigListColumnId {
  Id = 'id',
  Name = 'name',
  // Icon = 'icon',
  Desc = 'desc',
  BizLine = 'bizLine',
  Type = 'type',
  Owner = 'owner',
  Managers = 'managers',
  WhiteList = 'whiteList',
  Creator = 'creator',
  Updator = 'updator',
  CreatedAt = 'createdAt',
  UpdatedAt = 'updateAt',
  PublishStatus = 'publishStatus',
  IsTemplate = 'isTemplate',
  Env = 'env',
  // Config = 'config',
}

export enum FieldListColumnId {
  // Id = 'id',
  FieldName = 'fieldName',
  FieldId = 'fieldId',
  Belong = 'belong',
  Owner = 'owner',
  // Creator = 'creator',
  Updator = 'updator',
  CreatedAt = 'createdAt',
  UpdatedAt = 'updateAt',
  Env = 'env',
}

export enum LogListColumnId {
  // Id = 'id',
  RecordId = 'recordId',
  OpType = 'opType',
  Operator = 'operator',
  CreatedAt = 'createdAt',
}

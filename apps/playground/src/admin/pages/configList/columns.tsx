import { ConfigListColumnId } from '@/admin/common'
import {
  ConfigBizlineText,
  ConfigEnvText,
  ConfigPublishStatus,
  ConfigPublishStatusText,
  ConfigTypeText,
  FormatStyle,
  getOperationColumnInfo,
  IsConfigTemplate,
  TableUtil,
  UserInfo,
} from '@/common'
import { configCopy, configDelete, configEdit, configView } from './operations'
import { configPublish } from './operations/publish'
import { Tag } from 'antd'
import { ConfigInfo, ConfigListInfo } from '@/common/apis/getConfigList'
import { cliConfigEdit } from './operations/cliEdit'

export enum ConfigSence {
  Config = 'config',
}

export type ConfigContext = {
  userInfo?: UserInfo
}

export const configListColumns = new TableUtil<
  ConfigListInfo<ConfigInfo>, // 表格每行信息字段的结构
  /**
   * 使用场景，当此表格在多个地方使用的时候，可使用同一个 planListColumns 不同的场景来区分
   * 如：活动列表在：主页、加入方案页均会使用，就是 2 个场景
   *  */
  ConfigSence,
  /**
   * 使用场景，当此表格在多个地方使用的时候，可使用同一个 planListColumns 不同的场景来区分
   * 包含：MCC 配置、用户信息
   */
  ConfigContext
>()

configListColumns.createColumns({
  sence: ConfigSence.Config,
  columns: {
    [ConfigListColumnId.Id]: () => ({
      width: 100,
      fixed: 'left',
      title: '配置 ID',
    }),
    [ConfigListColumnId.Name]: () => ({
      width: 220,
      fixed: 'left',
      title: '配置名',
    }),
    [ConfigListColumnId.Desc]: () => ({
      width: 180,
      title: '配置描述',
    }),
    [ConfigListColumnId.BizLine]: () => ({
      width: 100,
      title: '业务线',
      render: (text) => {
        return <div>{ConfigBizlineText[text]}</div>
      },
    }),
    [ConfigListColumnId.Type]: () => ({
      width: 140,
      title: '配置类型',
      render: (text) => {
        return <div>{ConfigTypeText[text]}</div>
      },
    }),
    [ConfigListColumnId.PublishStatus]: () => ({
      width: 100,
      title: '发布状态',
      render: (text) => (
        <Tag
          color={
            text === ConfigPublishStatus.Published ? 'green-inverse' : 'orange'
          }
        >
          {ConfigPublishStatusText[text]}
        </Tag>
      ),
    }),

    [ConfigListColumnId.Env]: () => ({
      width: 100,
      title: '环境',
      render: (text) => ConfigEnvText[text],
    }),
    // [ConfigListColumnId.Icon]: () => ({
    //   width: 140,
    //   fixed: 'left',
    //   title: '配置类型',
    //   render: (text) => {
    //     return <div>{ConfigTypeText[text]}</div>
    //   },
    // }),
    [ConfigListColumnId.Owner]: () => ({
      width: 100,
      title: 'Owner',
    }),
    [ConfigListColumnId.Managers]: () => ({
      width: 100,

      title: '管理员',
    }),
    [ConfigListColumnId.WhiteList]: () => ({
      width: 140,

      title: '白名单',
    }),
    [ConfigListColumnId.IsTemplate]: () => ({
      width: 140,
      title: '是否是模板',
      render: (text) => (text === IsConfigTemplate.No ? '否' : '是'),
    }),
    [ConfigListColumnId.Creator]: () => ({
      width: 100,

      title: '创建人',
    }),
    [ConfigListColumnId.Updator]: () => ({
      width: 100,

      title: '最近更新人',
    }),
    [ConfigListColumnId.CreatedAt]: () => ({
      width: 120,

      title: '创建时间',
      format: FormatStyle.YYYYMMDDHHmmss,
    }),
    [ConfigListColumnId.UpdatedAt]: () => ({
      width: 120,

      title: '更新时间',
      format: FormatStyle.YYYYMMDDHHmmss,
    }),
  },
})

configListColumns.addOperations({
  sence: ConfigSence.Config,
  column: (context) => {
    return getOperationColumnInfo<ConfigListInfo>({
      ...context,
      operations: [
        configEdit,
        // cliConfigEdit,
        configView,
        configCopy,
        configPublish,
        configDelete,
      ],
      maxCount: 4,
      columnProps: {
        title: '操作',
        width: 270,
        fixed: 'right',
      },
    })
  },
})

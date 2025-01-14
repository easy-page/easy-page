import { ConfigId } from '@/admin/common/constant/configDiff'
import { ConfigListInfo } from '@/common/apis/getConfigList'
import React from 'react'

export type DiffRender = (data: ConfigListInfo) => React.ReactNode
export type DiffColumnInfo = Record<ConfigId, DiffRender>

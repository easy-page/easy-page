import {
  ActListColumnId,
  ActListScene,
  AuthUrl,
  OPERATION_COL_KEY,
} from '@/common/constants'
import { ACT_LIST_DEFAULT_OP_COUNT, actListColumns } from './actList'
import { actApplyResult, actView } from './operations'
import { getOperationColumnInfo } from '../../Operations'

actListColumns.copyColumns({
  sence: ActListScene.CrudPlan,
  targetScene: ActListScene.Home,
  copyIds: [...Object.values(ActListColumnId), OPERATION_COL_KEY],
})

actListColumns.addOperations({
  sence: ActListScene.CrudPlan,
  column: ({ userInfo, mccConfig, ...rest }) => {
    return getOperationColumnInfo({
      ...rest,
      operations: [actView, actApplyResult],
      userInfo,
      maxCount: ACT_LIST_DEFAULT_OP_COUNT,
      mccConfig,
      authUrl: AuthUrl.ActAuth,
      columnProps: {
        title: '操作',
        width: 150,
        fixed: 'right',
      },
    })
  },
})

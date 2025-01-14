import { Button, Dropdown, TableColumnProps, message } from 'antd'
import { Operation, execAuth } from './base'
import type { OperaitonContext } from '@/common/auths/planAndActAuths'
import classNames from 'classnames'
import { Dot } from '../../base'
import { ZsptButton } from '../ZsptButton'

export type OperationsOptions<T = Record<string, any>, Sence = string> = {
  operations: Operation<T, Sence>[]
  columnProps: Omit<TableColumnProps<T>, 'render'>
  /** 常显示最大个数，其余操作隐藏 */
  maxCount: number
  /** 当操作要基于场景做区分的时候，需要加一下 */
  sence?: Sence
} & Omit<OperaitonContext<T>, 'record' | 'operation'>

export type OperationMenuProps<T, Sence = string> = OperationsOptions<
  T,
  Sence
> & {
  record: T
}

export const OperationMenu = <T = Record<string, any>, Sence = string>({
  operations,
  userInfo,
  maxCount,
  authUrl,
  mccConfig,
  setShowInviteSettings,
  record,
  configs,
  sence,
  ...rest
}: OperationMenuProps<T, Sence>) => {
  const context: Omit<OperaitonContext<T, Sence>, 'operation'> = {
    userInfo,
    mccConfig,
    record,
    authUrl,
    sence,
    configs,
    setShowInviteSettings,
    ...rest,
  }
  const showOperations = operations.filter((e) =>
    e.show({
      userInfo,
      record,
      configs,
      sence: sence,
      operation: e.id,
      mccConfig,
      authUrl: e.authUrl || authUrl,
      ...rest,
    })
  )
  const alwaysShow = showOperations.slice(0, maxCount)
  const fold = showOperations.slice(maxCount)
  const [messageApi, contextHolder] = message.useMessage()

  return (
    <div className="flex flex-row">
      {contextHolder}
      <div className="flex flex-row flex-wrap">
        {alwaysShow.map((e, idx: number) => {
          const label =
            typeof e.label === 'string' ? e.label : e.label({ row: record })
          return (
            <ZsptButton
              key={e.id}
              type="link"
              className={classNames('pr-1', {
                'pl-0': idx === 0,
                'pl-1': idx !== 0,
              })}
              onClick={async () => {
                const execContext = {
                  operation: e.id,
                  authOperationKey: e.authOperationKey,
                  ...context,
                  authUrl: e.authUrl || authUrl,
                } as OperaitonContext<T, Sence>
                const result = await execAuth<T, Sence>(execContext, e.auth)
                if (result.allow) {
                  return e.action(execContext)
                }
                return result
              }}
            >
              {label}
            </ZsptButton>
          )
        })}
        {
          alwaysShow.length === 0 && <>-</>
        }
        {fold.length > 0 ? (
          <Dropdown
            menu={{
              items: fold.map((e) => {
                const label =
                  typeof e.label === 'string'
                    ? e.label
                    : e.label({ row: record })
                return {
                  label: <div className=" text-[#1677FF]">{label}</div>,
                  key: e.id,
                  className: 'min-w-[150px]',
                  onClick: async () => {
                    messageApi.open({
                      type: 'loading',
                      content: '权限查询中',
                      duration: 0,
                    })
                    const execContext: OperaitonContext<T, Sence> = {
                      operation: e.id,
                      record,
                      configs,
                      authOperationKey: e.authOperationKey,
                      ...context,
                      authUrl: e.authUrl || authUrl,
                    }
                    const result = await execAuth<T, Sence>(execContext, e.auth)
                    messageApi.destroy()
                    if (result.allow) {
                      e.action(execContext)
                    }
                  },
                }
              }),
            }}
            placement="bottomLeft"
            arrow
          >
            <Button type="link" className="pl-0">
              <Dot />
            </Button>
          </Dropdown>
        ) : (
          <></>
        )}
      </div>
    </div>
  )
}

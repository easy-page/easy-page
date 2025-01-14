import { ConfigLogInfoType } from '@/admin/common/apis/getLogList'
import { Drawer } from 'antd'
import { observer } from 'mobx-react'
import { DiffConfigInfo } from '../../configDiff/components/DiffConfigInfo'
import { diffColumnInfos } from '../../configDiff/components/DiffConfigFieldInfo/fields'
import { useMemo } from 'react'
import { AdminOpType, ZsptButton } from '@/common'

export type CrudLogProps = {
  record: ConfigLogInfoType
  onClose: () => void
}

export const CrudLog = observer(({ record, onClose }: CrudLogProps) => {
  const { changedKeys, dataSource } = useMemo(() => {
    if (!record) {
      return { changedKeys: [], dataSource: [] }
    }
    const changedKeys = Object.keys(record.after?.config || {})
    if (record.after.env) {
      changedKeys.push('env')
    }
    if (record.after.whiteList) {
      changedKeys.push('whiteList')
    }
    const dataSource = [
      {
        ...(record?.before || {}),
        name: `改动前`,
        id: 1,
      },
    ]
    if (record.opType !== AdminOpType.Publish) {
      dataSource.push({
        ...(record?.after || {}),
        name: `改动后`,
        id: 2,
      } as any)
    }

    // else if (record.opType === AdminOpType.BatchModify) {

    // }

    return { changedKeys, dataSource }
  }, [record])

  return (
    <Drawer
      destroyOnClose
      closable
      onClose={() => {
        onClose()
      }}
      title={'查看日志'}
      width={'80%'}
      open={Boolean(record)}
    >
      <div className="flex flex-col h-full">
        <div className="flex-1">
          <DiffConfigInfo
            actIds={[1, 2]}
            data={dataSource as any}
            fields={diffColumnInfos}
            onlyOneRecord={true}
            filterFields={changedKeys}
          />
        </div>
        <div className="flex flex-row justify-end h-[70px]">
          <ZsptButton>取消</ZsptButton>
        </div>
      </div>
    </Drawer>
  )
})

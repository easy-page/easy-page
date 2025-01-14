import { BaseContainer, getActDetail, getBizLine } from '@/common'
import { actDetailModel, loadActListToModel } from '@/common/models'
import { Drawer } from 'antd'
import { observer } from 'mobx-react'
import { useEffect } from 'react'
import { ActInviteSettings } from './settingsForm'
import { configListModel } from '@/common/models/configList'

export type InviteSettingsProps = {
  show: boolean
  setShow: (options: { show: boolean; actId: number }) => void
  actId: number
}
export const InviteSettings = observer(
  ({ setShow, show, actId }: InviteSettingsProps) => {
    const { data, error, loading, msg: actErrorMsg } = actDetailModel.getData()
    const { data: configs } = configListModel.getList()
    useEffect(() => {
      const init = async () => {
        actDetailModel.loadData(async () => {
          const res = await getActDetail({ activityId: actId })
          return res
        })
      }
      if (actId) {
        init()
      }
    }, [actId])
    return (
      <Drawer
        open={show}
        destroyOnClose={true}
        onClose={() =>
          setShow({
            actId,
            show: false,
          })
        }
        title="邀请设置"
        classNames={{
          wrapper: 'w-[900px]',
          body: 'p-0',
        }}
      >
        <BaseContainer
          loading={loading || (!error && Object.keys(data || {}).length === 0)}
          error={error}
          errorMsg={actErrorMsg}
        >
          <ActInviteSettings
            configs={configs}
            onClose={() => {
              setShow({
                actId,
                show: false,
              })
              // loadActListToModel({ bizLine: getBizLine() })
            }}
            actInfo={data!}
          />
        </BaseContainer>
      </Drawer>
    )
  }
)

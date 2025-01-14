import { DangerouslySetInnerHTML, UserInfo, ZsptButton } from '@/common'
import { Button, Modal } from 'antd'
import { useMemo, useState } from 'react'
import './index.less'
import { getCreateActItems } from './createActItems'
import { ActItemInfo } from '@/common/apis/getCreateActItems'
import { ConfigListInfo } from '@/common/apis/getConfigList'

export type CreateActProps = {
  userInfo?: UserInfo
  actTemplates: ActItemInfo[]
  configs: ConfigListInfo[]
}
export const CreateAct = ({
  userInfo,
  actTemplates = [],
  configs,
}: CreateActProps) => {
  const [showActDialog, setShowActDialog] = useState(false)
  const items = useMemo(() => {
    console.log('actTemplates', actTemplates)
    return getCreateActItems({ userInfo }, { actTemplates, configs })
  }, [userInfo, actTemplates, configs])

  return (
    <>
      <ZsptButton
        type="primary"
        disabled={items.length === 0}
        tips="暂无创建权限，请联系相关产品添加权限"
        onClick={() => {
          if (items.length === 1) {
            /** 只有 1 个的时候，直接执行 */
            items[0].handler()
            return
          }
          if (items.length > 1) {
            /** 能进入这里肯定是 > 1 的，不存在为 1 情况 */
            setShowActDialog(true)
          }
        }}
      >
        新建活动
      </ZsptButton>
      <Modal
        open={showActDialog}
        title="选择促销类型"
        className="w-[940px] max-h-[700px]"
        cancelText="取消"
        centered
        okButtonProps={{ hidden: true }}
        onCancel={() => setShowActDialog(false)}
        cancelButtonProps={{
          className: 'text-[#1677FF] border-[#1677FF]',
        }}
      >
        <div className="create-act-container">
          {[...items].map((e) => {
            return (
              <div className="create-act-item" key={`${e.roleId}`}>
                <div className="create-act-item-title"> {e.title} </div>
                <div className="create-act-item-desc flex-1">
                  <DangerouslySetInnerHTML>
                    {e.desc || '暂无描述'}
                  </DangerouslySetInnerHTML>
                </div>
                <div className="w-[100%] flex justify-center">
                  <Button
                    type={e.btnType || 'primary'}
                    className="w-[120px] font-bold px-2"
                    onClick={() => {
                      e.handler()
                      setShowActDialog(false)
                    }}
                  >
                    {e.btnText}
                  </Button>
                </div>
              </div>
            )
          })}
        </div>
      </Modal>
    </>
  )
}

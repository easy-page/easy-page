import { UserInfo } from '@/common'
import { Button, Modal } from 'antd'
import { useMemo, useState } from 'react'
import { getCreatePlanItems } from './getCreatePlanItems'
import './index.less'
import classNames from 'classnames'

export type CreatePlanProps = {
  userInfo?: UserInfo
}
export const CreatePlan = ({ userInfo }: CreatePlanProps) => {
  const [showPlanDialog, setShowPlanDialog] = useState(false)

  const items = useMemo(() => {
    return getCreatePlanItems({ userInfo })
  }, [userInfo])

  return (
    <>
      <Button
        type="primary"
        disabled={items.length === 0}
        onClick={() => {
          if (items.length === 1) {
            /** 只有 1 个的时候，直接执行 */
            items[0].handler()
            return
          }
          if (items.length > 0) {
            /** 能进入这里肯定是 > 0 的，不存在为 0 情况 */
            setShowPlanDialog(true)
          }
        }}
      >
        新建方案
      </Button>
      <Modal
        open={showPlanDialog}
        title="选择新建方案类型"
        className="w-[800px]"
        centered
        cancelText="取消"
        okButtonProps={{ hidden: true }}
        onCancel={() => setShowPlanDialog(false)}
      >
        <div className="create-plan-container">
          {items.map((e) => {
            return (
              <div className="create-plan-item" key={`${e.roleId}`}>
                <div className="create-plan-item-title">{e.title}</div>
                <div className="create-plan-item-desc flex-1">
                  {e.desc || '暂无描述'}
                </div>

                <div className="w-[100%] flex justify-center">
                  <Button
                    type={e.btnType || 'primary'}
                    className={classNames('w-[160px] font-bold ', e.btnClass)}
                    onClick={() => {
                      e.handler()
                      setShowPlanDialog(false)
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

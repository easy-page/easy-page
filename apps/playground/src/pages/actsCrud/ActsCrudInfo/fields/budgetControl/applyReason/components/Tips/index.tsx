import { IBudget } from '@/common'
import { Alert, Tooltip } from 'antd'
import './index.less'

export type PnTipsProps = {
  notMisOrgPns: IBudget[]
}
export const PnTips = ({ notMisOrgPns = [] }: PnTipsProps) => {
  const firstNotMisOrgPn = notMisOrgPns?.[0]
  return (
    <Alert
      type="warning"
      showIcon
      className="apply-reason-tip"
      message={
        <>
          您使用了非本人所在组织 pn 号(
          {firstNotMisOrgPn?.pnName
            ? `${firstNotMisOrgPn.pnName}(${firstNotMisOrgPn.pn})`
            : ''}
          {notMisOrgPns.length > 1 ? (
            <Tooltip
              rootClassName="whitespace-nowrap pn-tips"
              title={
                <div className="">
                  {notMisOrgPns.map((item: IBudget) => (
                    <div>
                      {item.pnName}({item.pn})
                    </div>
                  ))}
                </div>
              }
            >
              <span className="apply-reason-tips-text cursor-pointer text-[#386BFF]">
                ...更多
              </span>
            </Tooltip>
          ) : (
            ''
          )}
          )，活动提交后会触发审批流，审批全通过后才可发送活动邀请。如修改活动导致已触发审批的
          pn 范围发生变化、或者审批被驳回，则再次提交将触发一条新的审批流。
        </>
      }
    ></Alert>
  )
}

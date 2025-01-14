import { ActInfo } from '@/common/apis'
import { QuestionCircleOutlined } from '@ant-design/icons'
import { Popover } from 'antd'
import { DangerouslySetInnerHTML } from '../../base/DangerouslySetInnerHtml'
import { ActStatusTag } from '../StatusTag'
import { StatusTagSizeEnum } from '../StatusTag/common'
import './index.less'

export type ActListStatusInfoProps = {
  record: ActInfo
}

export const ActListStatusInfo = ({ record }: ActListStatusInfoProps) => {
  const statusInfo = record.actStatsInfo?.statusInfo || []
  const hasStatusInfo = statusInfo.length > 0
  return (
    <div className="flex flex-row">
      <ActStatusTag status={record.status} size={StatusTagSizeEnum.Small}>
        {record.statusDesc}
      </ActStatusTag>

      {hasStatusInfo ? (
        <Popover
          className="list-status-info-tip"
          title={
            <ul>
              {statusInfo.map((item: any, index: number) => (
                <li
                  key={index}
                  style={{
                    fontSize: '10px',
                  }}
                >
                  <div
                    style={{
                      color: 'red',
                      lineHeight: '10px',
                      minWidth: '100px',
                      textAlign: item.activityStatusCauseTip
                        ? 'left'
                        : 'center',
                    }}
                  >
                    {item.activityStatusCauseDesc}
                  </div>
                  {item.activityStatusCauseTip && (
                    <div style={{ minWidth: 120, maxWidth: 200 }}>
                      <DangerouslySetInnerHTML>
                        {item.activityStatusCauseTip}
                      </DangerouslySetInnerHTML>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          }
        >
          <QuestionCircleOutlined className="ml-2" />
        </Popover>
      ) : (
        <></>
      )}
    </div>
  )
}

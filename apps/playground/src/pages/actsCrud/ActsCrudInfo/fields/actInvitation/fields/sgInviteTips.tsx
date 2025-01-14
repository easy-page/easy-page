import { openInUoc } from '@/common/libs/url'
import { isView } from '@/common/routes/getParams'
import { ExclamationCircleFilled } from '@ant-design/icons'
import { nodeUtil } from '@easy-page/antd-ui'
import { Alert } from 'antd'

export const sgInviteTips = nodeUtil.createCustomNode(
  'invite-tips',
  () => {
    return (
      <Alert
        message={
          <>
            <ExclamationCircleFilled className="inline text-[#fdc84f] relative top-[-3px] mr-1" />
            当前闪购已上线B补活动营销管控，针对特殊情况实行活动管控。各业务组管控策略有差异，请配置活动前了解最新所属业务组的管控策略情况，避免无效提交。
            <a
              target="__blank"
              onClick={() => openInUoc('yxgkclxxcx', '')}
              style={{ color: '#386BFF' }}
            >
              闪购B补活动管控策略详情
            </a>
          </>
        }
        type="warning"
        className="flex flex-row  mb-4"
        closable={false}
      />
    )
  },
  {
    when: {
      show() {
        return !isView()
      },
    },
  },
  {
    formItem: {
      noStyle: true,
    },
  }
)

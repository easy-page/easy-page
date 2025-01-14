import { nodeUtil } from '@easy-page/antd-ui'
import { batchConfirmActStatModel } from '@/common/models/btachConfirmActStat'

import { formateDate, FormatStyle, getQueryString, toJson } from '@/common'

export const confirmActInfo = nodeUtil.createCustomField<any>(
  'confirmActInfo',
  '当前待确认活动数',
  ({ value, onChange, frameworkProps: { store }, disabled }) => {
    const { data } = batchConfirmActStatModel.getData()

    const confirm4Batch = getQueryString('confirm4Batch')

    const isBtachConfirm = confirm4Batch === 'true'

    if (!isBtachConfirm) {
      return (
        <div className="flex flex-col mt-2 relative top-[-4px]">
          <div>
            <span className="mr-2 text-[#FF4D4F]">
              {data.amountTobeConfirm || 0}
            </span>
            (确认周期内活动总
            <span className="ml-1 mr-1">{data.amountInConfirmPeriod}</span>
            ，待确认
            <span className="ml-1 mr-1 text-[#FF4D4F]">
              {data.amountTobeConfirm || 0}
            </span>
            ，审批中
            <span className="ml-1 mr-1">{data.amountAuditing || 0}</span>
            ，确认参加
            <span className="ml-1 mr-1">{data.amountConfirmJoin || 0}</span>
            ，确认不参加
            <span className="ml-1 mr-1">{data.amountConfirmNotJoin || 0}</span>)
          </div>
        </div>
      )
    }

    return (
      <div className="flex flex-col mt-2 relative top-[-3px]">
        <div className="mr-2 text-[#FF4D4F]">{data.amountTobeConfirm}</div>
        <div className="flex mt-2 mb-2">
          <div className="shrink-0">说明：</div>
          <div className="flex flex-col w-[750px]">
            <div>
              1、指业务品牌在活动中补贴提报状态为“待确认”的、从未填写过补贴比例的活动数，不包含已填写过比例、补贴提报状态流转为审核中、确认参加、确认不参加的活动。
            </div>
            <div>
              2、若 1
              个提报后的中邀请了多个业务品牌时，批量操作仅会针对其中从未确认过补贴的业务品牌进行确认，已填写过补贴比例的业务品牌其数据不会被更改。
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    effectedKeys: ['chooseAct'],
    postprocess() {
      return {}
    },
  },
  {
    formItem: {
      colon: false,
      labelCol: { span: 4 },
      wrapperCol: { span: 18 },
    },
  }
)

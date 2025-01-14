import { QuestionTooltip } from '@/common/components/base/QuestionTooltip'
import { nodeUtil } from '@easy-page/antd-ui'

export const commonTitle = ({
  title,
  tooltip,
  id,
}: {
  title: string
  tooltip?: string
  id: string
}) => {
  return nodeUtil.createCustomField(
    `${id}-title`,
    '',
    () => {
      return <QuestionTooltip text={title} tooltip={tooltip} />
    },
    {
      postprocess(context) {
        return {}
      },
    },
    {
      formItem: {
        className: 'col-span-4 mb-0',
        // noStyle: true,
      },
    }
  )
}

export const skuAdminRowTitle = commonTitle({
  id: 'skuAdmin',
  title: '品类运营确认商品',
  tooltip: '发送邀请后，品类运营需填写商品信息，提交的信息在报名结果中查看',
})

export const purchaseManagerRowTitle = commonTitle({
  id: 'purchaseManager',
  title: '采购确认协议',
  tooltip: '发送邀请后，采购需确认协议信息，提交的信息在报名结果中查看',
})

export const supplierRowTitle = commonTitle({
  id: 'supplier',
  title: '供应商报名活动',
  tooltip:
    '采购确认协议后，供应商需签署协议并完成素材上传，提交的信息在报名结果中查看',
})

import { ExclamationCircleFilled } from '@ant-design/icons'
import { nodeUtil } from '@easy-page/antd-ui'
import { Alert } from 'antd'
export const confirmSubsidyTitle = nodeUtil.createCustomField<any>(
  'confirmSubsidyTitle',
  '',
  ({ value, onChange, frameworkProps: { store }, disabled }) => {
    // 当前表单所有配置
    const { pageState } = store
    return (
      <Alert
        message={
          <>
            <ExclamationCircleFilled className="inline text-[#fdc84f] relative top-[-3px] mr-1" />
            以下规则指除品牌承担金额之外，剩余补贴金额的分摊比例
          </>
        }
        type="warning"
        className="flex flex-row w-[80%] p-2  mb-4 mt-2"
        closable={false}
      />
    )
  },
  {}
)

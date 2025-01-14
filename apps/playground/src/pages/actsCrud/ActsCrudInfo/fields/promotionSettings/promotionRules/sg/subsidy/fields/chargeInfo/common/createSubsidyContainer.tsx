import { QuestionCircleOutlined } from '@ant-design/icons'
import { nodeUtil } from '@easy-page/antd-ui'
import { Tooltip } from 'antd'

export type SubsidyFieldContainerOptions = {
  title: string
  id: string
  tooltip?: string
}

export const createSubsidyFieldContainer = ({
  title,
  tooltip,
  id,
}: SubsidyFieldContainerOptions) =>
  nodeUtil.createCustomField(
    `${id}_container`,
    title,
    ({ children }) => {
      return (
        <div className="flex flex-row items-start justify-start">
          {children}
        </div>
      )
    },
    { required: true },
    {
      formItem: {
        tooltip: tooltip ? (
          <Tooltip rootClassName=" whitespace-pre-line " title={tooltip}>
            <QuestionCircleOutlined />
          </Tooltip>
        ) : (
          <></>
        ),
        className: 'mb-2',
      },
      layout: { disableLayout: true },
    }
  )

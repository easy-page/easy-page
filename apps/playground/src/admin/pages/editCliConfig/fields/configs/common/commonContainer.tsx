import { nodeUtil } from '@easy-page/antd-ui'

export const commonContainer = (id: string, label: string) =>
  nodeUtil.createCustomField(
    `${id}Container`,
    label,
    ({ children }) => {
      return (
        <div className="flex p-2 flex-col border border-[#D3E3FD]">
          {children}
        </div>
      )
    },
    {},
    {
      formItem: { required: true },
      layout: {
        disableLayout: true,
      },
    }
  )

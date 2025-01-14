import {
  DEFAULT_COMPONENTS,
  EasyPage,
  NodeInfo,
  NodeInfoWithChildren,
  PageUtil,
} from '@easy-page/antd-ui'
import { OperationAuthFormProps, OperationAuthFormState } from './interface'
import { zsptConfirm } from '../ZsptConfirm'
import { ActAuthInfo } from '@/common/apis/authAct'
import { PlanAuthInfo } from '@/common/apis'

export type OperationAuthOptions = {
  title: string
  tips?: React.ReactNode
  defaultValues: ActAuthInfo | PlanAuthInfo
  nodes: (NodeInfo<any, any, any> | NodeInfoWithChildren<any, any, any>)[]
}

export const operationAuth = ({
  title,
  tips,
  nodes,
  defaultValues,
}: OperationAuthOptions): Promise<Record<string, any> | null> => {
  return new Promise((resolve) => {
    const pu = new PageUtil({ pageId: 'operation-auth' })
    pu.addFields(nodes)
    const dispose = zsptConfirm({
      title,
      footer: null,
      icon: <></>,
      height: 400,
      className: 'w-[800px]',
      closable: true,
      onClose: () => {
        resolve(null)
        dispose.destroy()
      },
      onCancel: () => {
        resolve(null)
        dispose.destroy()
      },
      content: (
        <div className="flex flex-col w-full h-full relative">
          {tips}
          <div className="mt-2 flex flex-col w-full h-full">
            <EasyPage<OperationAuthFormState, OperationAuthFormProps>
              commonUIConfig={{
                form: {
                  labelCol: { span: 8 },
                  labelAlign: 'right',
                  wrapperCol: { span: 12 },
                  className: 'h-full flex flex-col',
                },
                formItem: {
                  colon: false,
                },
              }}
              defaultValues={defaultValues}
              context={{
                onCancel() {
                  dispose.destroy()
                  resolve(null)
                },
                async onSubmit(data) {
                  dispose.destroy()
                  resolve(data)
                },
              }}
              components={{
                ...DEFAULT_COMPONENTS,
              }}
              pageType="form"
              {...pu.getPageInfo()}
            />
          </div>
        </div>
      ),
    })
  })
}

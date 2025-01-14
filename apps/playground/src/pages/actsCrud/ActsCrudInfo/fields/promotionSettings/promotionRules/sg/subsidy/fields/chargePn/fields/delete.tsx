import { nodeUtil } from '@easy-page/antd-ui'
import { ChargeSidePnPageProps } from '../chargePnForm/interface'
import { DeleteOutlined } from '@ant-design/icons'
import { ChargeSidePnPageState } from '@/pages/actsCrud/ActsCrudInfo/fields/interface'

export const deleteIcon = nodeUtil.createCustomField<
  any,
  ChargeSidePnPageState,
  ChargeSidePnPageProps
>(
  'deleteItem',
  '',
  ({ frameworkProps: { store }, disabled }) => {
    const { onRemove } = store.getPageProps()
    if (disabled) {
      return <></>
    }
    return (
      <div className="flex items-center ml-2 h-[32px]">
        <DeleteOutlined
          onClick={() => {
            onRemove()
          }}
        />
      </div>
    )
  },
  {
    effectedKeys: ['onRemove'],
    when: {
      effectedKeys: ['pns.chargeSidePnform'],
      show({ effectedData }) {
        const pns = effectedData['pns.chargeSidePnform']?.childForms
        return pns?.length > 1
      },
    },
    postprocess: () => {
      return {}
    },
  },
  {
    formItem: {
      noStyle: true,
    },
  }
)

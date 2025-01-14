import { FieldOptionIds } from '@/common/constants/fieldMaps'
import { generateId, nodeUtil } from '@easy-page/antd-ui'

export const emptyOptionNode = (id: string) =>
  nodeUtil.createCustomNode(
    generateId('empty-option'),
    () => {
      return (
        <div>
          当前选项{FieldOptionIds[id]}
          无通用选项，请指定存在此选项的对应活动类型进行继承
        </div>
      )
    },
    {}
  )

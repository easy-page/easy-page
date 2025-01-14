import { FieldIdsText } from '@/common/constants/fieldMaps'
import { generateId, nodeUtil } from '@easy-page/antd-ui'

export const emptyField = (id: string) =>
  nodeUtil.createCustomField(
    generateId('empty-field'),
    FieldIdsText[id],
    () => {
      return (
        <div>
          当前字段{id}无通用字段，请指定存在此字段的对应活动类型进行继承
        </div>
      )
    },
    {}
  )

import { AnyNodeInfoType, nodeUtil } from '@easy-page/antd-ui'

export const showDecorator = (id: string, node: AnyNodeInfoType) => {
  return nodeUtil.extends(node, {
    when() {
      return {
        effectedKeys: ['fields'],
        show({ effectedData }) {
          const ids = effectedData['fields'] || []
          return Boolean(
            ids.find((x) => {
              if (Array.isArray(x)) {
                return x.includes(id)
              }
              return x === id
            })
          )
        },
      }
    },
  })
}

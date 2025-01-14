import { nodeUtil } from '@easy-page/antd-ui'
import { Anchor } from 'antd'
import { PrimaryTitleEnum, PrimaryTitleText } from './containers'

export const anchor = (ids: PrimaryTitleEnum[]) =>
  nodeUtil.createCustomNode(
    'anchor',
    () => {
      return (
        <Anchor
          className="fixed top-[20px] right-[0] pr-[20px] bg-white"
          items={ids.map((e) => {
            return {
              key: e,
              href: `#${e}`,
              title: PrimaryTitleText[e],
            }
          })}
        />
      )
    },
    {}
  )

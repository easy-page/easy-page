import { Tag } from 'antd'

export const SwitchRender = ({ value }: { value?: boolean }) => {
  return (
    <Tag color={value ? 'green' : 'default'}>{value ? '打开' : '关闭'}</Tag>
  )
}

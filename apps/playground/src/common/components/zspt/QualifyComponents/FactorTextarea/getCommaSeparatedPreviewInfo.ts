import { getRedText } from '../RedText'

export const getCommaSeparatedPreviewInfo = ({
  text,
  commaSeparated,
}: {
  text: string
  commaSeparated: boolean
}) => {
  if (!text) {
    return ''
  }
  if (!commaSeparated) {
    return getRedText(text)
  }
  const list = text.split(',')
  if (list.length < 6) {
    return getRedText(text)
  }
  return getRedText(`${list.slice(0, 5).join(',')} 等 ${list.length} 个`)
}

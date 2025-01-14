export const UseDefaultActionRender = ({ value }: { value?: boolean }) => {
  return <div>{value ? '使用默认动作' : '不使用默认动作'}</div>
}

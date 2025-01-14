export type SecTitleProps = {
  title: string
  children: any
}

export const SecTitle = ({ title, children }: SecTitleProps) => {
  return (
    <div className="flex flex-col">
      <div className="py-2 font-medium text-base">{title}</div>
      <div>{children}</div>
    </div>
  )
}

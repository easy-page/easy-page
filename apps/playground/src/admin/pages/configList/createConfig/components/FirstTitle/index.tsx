export type FirstTitleProps = {
  title: string
  children: any
}

export const FirstTitle = ({ title, children }: FirstTitleProps) => {
  return (
    <div className="flex flex-col">
      <div className="py-2 font-medium text-lg">{title}</div>
      {children}
    </div>
  )
}

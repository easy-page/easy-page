import classNames from 'classnames'

export const Field = ({
  value,
  label,
  labelClass,
}: {
  value: any
  label: string
  labelClass?: string
}) => {
  return (
    <div className="flex flex-row">
      <div
        className={classNames(
          'flex flex-row justify-start text-sec mb-2 ',
          labelClass
        )}
      >
        {label}
      </div>
      <div className="ml-1">{value}</div>
    </div>
  )
}

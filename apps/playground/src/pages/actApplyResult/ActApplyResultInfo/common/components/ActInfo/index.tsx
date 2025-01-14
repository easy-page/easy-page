import {
  ActFullInfo,
  ActivityInfo,
  FormatStyle,
  formateDate,
  toNumber,
} from '@/common'
import classNames from 'classnames'
import { WeekEnumText } from '@/common/constants/applyResult'
import { ActTitle } from '../Title'

export type ActInfoProps = {
  actDetail: ActFullInfo
}

export const Field = ({
  label,
  value,
  className,
  valueClassName,
}: {
  label: string
  value: string | React.ReactNode
  className?: string
  valueClassName?: string
}) => {
  return (
    <div className={classNames('flex flex-row', className)}>
      <div className="mr-2 min-w-[50px]">{label}：</div>
      <div className={valueClassName}>{value}</div>
    </div>
  )
}

export const AgreementField = ({
  label,
  value,
  contractStatusDesc,
}: {
  label: string
  value: string
  contractStatusDesc: string
}) => {
  return (
    <div className="flex flex-row">
      <div className="mr-2 min-w-[50px]">{label}：</div>
      <div>
        {value ? value : '空'}
        {value ? <> （{contractStatusDesc}）</> : ''}
      </div>
    </div>
  )
}

export const ActInfo = ({ actDetail }: ActInfoProps) => {
  const activityInfo = actDetail.activity || ({} as ActivityInfo)
  const status = activityInfo.status
  return (
    <div className="flex flex-col">
      <ActTitle title={activityInfo.name} status={status} />
      <Field label={'提报活动 ID'} value={`${activityInfo.id}`} />
    </div>
  )
}

export const SkuApplyResultActInfo = ({ actDetail }: ActInfoProps) => {
  const activityInfo = actDetail.activity || ({} as ActivityInfo)
  const status = activityInfo.status

  const getWeekTimes = (weekTimes: string) => {
    const timeArray = weekTimes?.split(',') || []
    if (timeArray?.length === 7) {
      return '每天'
    } else {
      let str = ''
      timeArray.map((item) => {
        str += WeekEnumText[toNumber(item)] + '、'
      })
      return str
    }
  }
  const getPeriod = (value: string) => {
    if (value === '00:00-23:59') {
      return '全天'
    }
    return value
  }
  return (
    <div className="flex flex-col">
      <ActTitle title={activityInfo.name} status={status} />
      <div className="flex">
        <Field
          className="mr-10"
          label={'提报活动 ID'}
          value={`${activityInfo?.id}`}
        />
        <Field
          className="mr-10"
          label={'提报活动时间'}
          value={`${formateDate(
            activityInfo?.promotionTime?.startTime,
            FormatStyle.YYYYMMDDHHmmss
          )} 至 ${formateDate(
            activityInfo?.promotionTime?.endTime,
            FormatStyle.YYYYMMDDHHmmss
          )}`}
        />
        <Field
          className="mr-10"
          label={'周循环'}
          value={getWeekTimes(activityInfo?.promotionTime?.weekTimes)}
        />
        <Field
          className="mr-10"
          label={'生效时段'}
          value={getPeriod(activityInfo?.promotionTime?.period)}
        />
      </div>
    </div>
  )
}

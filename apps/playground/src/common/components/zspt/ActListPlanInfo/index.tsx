import type { ActInfo } from '@/common/apis'
import { DotText } from '../../base/Text'

export type ActListPlanInfoProps = {
  record: ActInfo
}

const Field = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="flex flex-row">
      <div className=" min-w-[70px]">{label}：</div>
      <DotText line={1} className="w-[200px]">
        {value}
      </DotText>
    </div>
  )
}
export const ActListPlanInfo = ({ record }: ActListPlanInfoProps) => {
  if (!record.planId) {
    return <>-</>
  }
  return (
    <div className="flex flex-col">
      {/* <div>ID:{record.planId || '-'}</div>
      <div>名称:{record.planName || '-'}</div>
      <div>创建人:{record.planCreator || '-'}</div> */}
      <Field label="ID" value={`${record.planId || '-'}`} />
      <Field label="名称" value={`${record.planName || '-'}`} />
      <Field label="创建人" value={`${record.planCreator || '-'}`} />
    </div>
  )
}

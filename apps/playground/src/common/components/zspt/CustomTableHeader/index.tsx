import classNames from 'classnames';
import { QuestionTooltip } from '../../base/QuestionTooltip';

export type TableHeaderProps = {
  name: string;
  required?: boolean;
  tooltip?: string;
  extra?: string;
  className?: string;
};
export const TableHeader = ({
  name,
  required,
  tooltip,
  extra,
  className,
}: TableHeaderProps) => {
  return (
    <div className={classNames('flex flex-col', className)}>
      <div className="flex flex-row">
        <div className="text-red-400">{required ? '*' : ''}</div>
        <div className="font-medium">{name}</div>
        {tooltip ? <QuestionTooltip text={''} tooltip={tooltip} /> : <></>}
      </div>
      <div className="text-xs text-sec">{extra || ''}</div>
    </div>
  );
};

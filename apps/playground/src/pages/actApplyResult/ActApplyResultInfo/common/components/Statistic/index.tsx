import { StatisticInfo } from '@/common/apis';

export type StatisticProps = {
  statisticInfo: StatisticInfo[];
};
export const Statistic = ({ statisticInfo = [] }: StatisticProps) => {
  return (
    <div className="flex flex-wrap">
      {statisticInfo.map((item, idx) => {
        return (
          <div key={idx} className="bg-[#F5F6F8] p-4 text-base mr-2">
            <div className="mb-2 font-medium">{item.label}</div>
            <div>
              <span className="font-bold text-2xl">{item.value}</span>个
            </div>
          </div>
        );
      })}
    </div>
  );
};

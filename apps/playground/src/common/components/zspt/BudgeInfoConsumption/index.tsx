// 列表项 预算消耗/总预算
import { ActInfo } from '@/common/apis';
import { Tooltip } from 'antd';
import React from 'react';
type BudgetInfoConsumptionProps = {
  row: ActInfo;
};
export const BudgetInfoConsumption: React.FC<BudgetInfoConsumptionProps> = ({
  row,
}) => {
  const budgetInfo = row.actStatsInfo?.budgetInfo || [];
  return (
    <div>
      {budgetInfo.length > 0 && budgetInfo[0].chargeOrg ? (
        <>
          <div style={{ marginBottom: '3px' }}>
            <span>{budgetInfo[0].chargeOrg}:</span>
            <span>
              {Math.round(budgetInfo[0].usedAmount)}元/
              {Math.round(budgetInfo[0].budgetAmount)}元&nbsp;&nbsp;
              {Math.round(budgetInfo[0].usedPercent)}%
            </span>
          </div>
          {budgetInfo.length > 1 && (
            <Tooltip
              title={
                <>
                  {budgetInfo.map((item, index) => (
                    <div key={index} style={{ marginBottom: '3px' }}>
                      <span>{item.chargeOrg}:</span>
                      <span>
                        {Math.round(item.usedAmount)}元/
                        {Math.round(item.budgetAmount)}元&nbsp;&nbsp;
                        {Math.round(item.usedPercent)}%
                      </span>
                    </div>
                  ))}
                </>
              }
            >
              <a style={{ color: '#386BFF' }}>查看全部</a>
            </Tooltip>
          )}
        </>
      ) : (
        '-'
      )}
    </div>
  );
};

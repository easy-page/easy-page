import { SubsidyRule } from '@/common/apis';
import { Table } from 'antd';
import {
  MtLowestSubsidyColumnId,
  MtLowestSubsidyScene,
  mtLowestSubsidyColumns,
} from './columns';
import { preprocessMeituanSubsidy } from './preprocessMeituanSubsidy';

export type MtLowestSubsidyTableProps = {
  rules?: SubsidyRule[];
  highlightPrice?: boolean;
};

export const MtLowestSubsidyTable = ({
  rules = [],
  highlightPrice,
}: MtLowestSubsidyTableProps) => {
  const data = preprocessMeituanSubsidy(rules) || [];
  const columns = mtLowestSubsidyColumns.getColumns({
    sence: MtLowestSubsidyScene.PlanView,
    ids: [
      MtLowestSubsidyColumnId.MerchantRequestPrice,
      MtLowestSubsidyColumnId.MeituanSubsidyPrice,
    ],
    context: {
      highlightPrice,
    },
  });
  return (
    <Table
      pagination={false}
      columns={columns as any}
      dataSource={data}
      bordered
    ></Table>
  );
};

export * from './preprocessMeituanSubsidy';

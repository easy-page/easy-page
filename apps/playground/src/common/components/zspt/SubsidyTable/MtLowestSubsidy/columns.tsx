import { TableUtil } from '../../ZsptTableUtil';

export type MtLowestSubsidyRecord = {
  meituanSubsidyPrice: number;
  merchantRequestPrice: number;
};

export enum MtLowestSubsidyScene {
  PlanView = 'planView',
}

export const mtLowestSubsidyColumns = new TableUtil<
  MtLowestSubsidyRecord,
  MtLowestSubsidyScene,
  {
    highlightPrice?: boolean;
  }
>();

export enum MtLowestSubsidyColumnId {
  MerchantRequestPrice = 'merchantRequestPrice',
  MeituanSubsidyPrice = 'meituanSubsidyPrice',
}
mtLowestSubsidyColumns.createColumns({
  sence: MtLowestSubsidyScene.PlanView,
  columns: {
    [MtLowestSubsidyColumnId.MerchantRequestPrice]: () => ({
      width: 160,
      title: '商家实际补贴',
      tooltip: '指商家的A出资，不包含差异化商补；满X元指大于等于X元。',
      render: (val) => {
        return `满${val}元`;
      },
    }),
    [MtLowestSubsidyColumnId.MeituanSubsidyPrice]: ({ highlightPrice }) => ({
      width: 160,
      title: '美团最低补贴',
      render: (val) =>
        !highlightPrice ? (
          `${val}元`
        ) : (
          <div>
            <span className="text-red-400">{val}</span>元
          </div>
        ),
    }),
  },
});

import {
  ChildFormItem,
  ChildFormState,
  DEFAULT_COMPONENTS,
  EasyPage,
  generateId,
  nodeUtil,
  validateAllChildForm,
} from '@easy-page/antd-ui';
import { Content4Shy, ISubActivity, SubsidyOptEnum } from '@/common';
import { StockReqFormState } from './interface';
import { stockFormInfo } from './pageInfo';
import { appendToContent4Shy } from '../utils/appendToSubActRule';
import {
  StockRequestEnum,
  StockRequestType,
  StockRuleItem,
} from '@/common/apis/saveAct/interfaces/stockReq';
import { getFromContent4Shy } from '../utils/getFromContent4Shy';
import { ShenhuiyuanFormState } from '../../../../interface';

const StockReqPrefix = 'stock-req';
const formId = generateId(StockReqPrefix);

export const stockReq = nodeUtil.createChildForm<
  ChildFormState<StockReqFormState>,
  ShenhuiyuanFormState
>('stockRequest', {
  name: '库存要求',
  validate: async ({ value, onChange }) => {
    // console.log('what fuck vvvv:', value, Object.keys(value.formUtils || {}));
    const results = await validateAllChildForm(value, { onChange });
    const hasError = results.find((e) => Boolean(e.errors));
    return { success: !hasError };
  },

  preprocess({ defaultValues }) {
    const stockRule =
      getFromContent4Shy<Content4Shy['stockRule']>(
        'stockRule',
        defaultValues,
      ) || [];
    const baseLevel = (stockRule || []).find(
      (e) => e.key === StockRequestEnum.Stock4Base,
    );
    const expandLevel = (stockRule || []).find(
      (e) => e.key === StockRequestEnum.Stock4Expand,
    );
    const childFormDefaultValues: Record<
      string,
      Partial<Record<StockRequestEnum, StockRuleItem>>
    > = {
      [formId]: {
        [StockRequestEnum.Stock4Base]: baseLevel,
        [StockRequestEnum.Stock4Expand]: expandLevel,
      },
    };
    const childFormItems: ChildFormItem[] = [
      {
        id: formId,
        label: '',
      },
    ];
    return {
      choosedItemId: formId,
      childForms: childFormItems,
      childFormDefaultValues,
    };
  },
  postprocess({ value, processedFormData }) {
    const childForms = Object.values(value.formUtils || {}).map((e) =>
      e.getFormData(),
    );
    const stockInfo = childForms?.[0] || {};
    const processedSubActs = processedFormData.subActivity || [];

    const stockRule = processedSubActs?.[0]?.content4Shy?.stockRule || [];

    stockRule.push(
      stockInfo[StockRequestEnum.Stock4Base],
      stockInfo[StockRequestEnum.Stock4Expand],
    );

    const subAct: ISubActivity[] = appendToContent4Shy(processedFormData, {
      stockRule,
    });
    // 库存要求只有一行
    return {
      subActivity: subAct,
    };
  },
  childFormContainer: ({
    setChildFormRef,
    onChildFormChanged,
    value,
    disabled,
  }) => {
    return (
      <EasyPage
        components={{ ...DEFAULT_COMPONENTS }}
        setFormUtil={(ref) => setChildFormRef(ref, formId)}
        pageType="form"
        onChange={() => {
          onChildFormChanged();
        }}
        context={{
          editable: !disabled,
        }}
        defaultValues={value.childFormDefaultValues?.[formId]}
        {...stockFormInfo}
      />
    );
  },
  required: true,
  value: {
    childForms: [
      {
        label: '',
        id: formId,
      },
    ],
    choosedItemId: formId,
  },
});

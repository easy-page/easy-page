import { nodeUtil } from '@easy-page/antd-ui';
import { MerchantMaxSubsidyFormProps } from '../interface';
import { MerchantMaxSubsidyFormState } from '../../../subPlan';
// import { MerchantMaxSubsidyFormState } from '../../../../../interface';

export const stepNumber = nodeUtil.createCustomField<
  MerchantMaxSubsidyFormState,
  MerchantMaxSubsidyFormProps
>(
  'stepNumber',
  '',
  ({ frameworkProps: { store } }) => {
    const formIndex = (store.getProp('formIndex') || 0) as number;
    return <div className="col-span-1">{formIndex + 1}</div>;
  },
  {
    effectedKeys: ['formIndex'],
  },
  {
    formItem: { className: 'mb-0' },
  },
);

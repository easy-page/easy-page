import { nodeUtil } from '@easy-page/antd-ui';
import { MeituanLowestSubsidyFormProps } from '../interface';
import { MeituanLowestSubsidyFormState } from '../../../subPlan';
// import { MeituanLowestSubsidyFormState } from '../../../../../interface';

export const merchantRequestPrice = nodeUtil.createCustomField<
  string,
  MeituanLowestSubsidyFormState,
  MeituanLowestSubsidyFormProps
>(
  'merchantRequestPrice',
  '',
  ({ value }) => {
    
    return <div>{ value ? `满 ${value} 元`: <span className='text-sec'>取上方表格信息</span>}</div>;
  },
  {},
  {
    formItem: {
      className: 'col-span-1 mb-0',
    },
  },
);

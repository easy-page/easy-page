import {
  DEFAULT_COMPONENTS,
  EXTRA_COMPONENTS,
  EasyPage,
} from '@easy-page/antd-ui';
import { godPricePlanInfo } from './pageInfo';
import { GodPricePlanFormProps, GodPricePlanFormState } from './interface';

export const CreateGodPricePlan = () => {
  return (
    <EasyPage<GodPricePlanFormState, GodPricePlanFormProps>
      pageType="form"
      components={{
        ...DEFAULT_COMPONENTS,
        ...EXTRA_COMPONENTS,
      }}
      // commonUIConfig={{
      //   formItem: {
      //     className: 'font-medium',
      //   },
      // }}
      {...godPricePlanInfo}
    />
  );
};

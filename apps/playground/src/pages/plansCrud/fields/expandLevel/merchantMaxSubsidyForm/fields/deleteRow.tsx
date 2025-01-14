import { nodeUtil } from '@easy-page/antd-ui';
import { MerchantMaxSubsidyFormProps } from '../interface';
// import { MerchantMaxSubsidyFormState } from '../../../../../interface';
import classNames from 'classnames';
import { MerchantMaxSubsidyFormState } from '../../../subPlan';

export const deleteRow = nodeUtil.createCustomField<
  any,
  MerchantMaxSubsidyFormState,
  MerchantMaxSubsidyFormProps
>(
  'deleteRow',
  '',
  ({ frameworkProps: { store }, disabled }) => {
    const { onRemove, formId, formIndex } =
      store.getPageProps() as MerchantMaxSubsidyFormProps;
    if (formIndex === 0) {
      return <></>;
    }
    return (
      <div
        className={classNames('', {
          'text-[#858692] cursor-not-allowed': disabled,
          'cursor-pointer text-[#FF192D]': !disabled,
        })}
        onClick={() => {
          if (!disabled) {
            onRemove(formId);
          }
        }}
      >
        删除
      </div>
    );
  },
  {
    effectedKeys: ['onRemove'],
  },
  {
    formItem: { noStyle: true, className: 'mb-0' },
  },
);

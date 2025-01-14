import { nodeUtil } from '@easy-page/antd-ui';
import { SearchRuleId } from '../../../constants';
import { validateIdFilter } from '@/common';

const MAX_UPC_LENGTH = 500;

export const upc = nodeUtil.createField(
  SearchRuleId.Upc,
  'UPC 码',
  {
    value: '',
    validate: ({ value }) => {
      return validateIdFilter(value, MAX_UPC_LENGTH);
    },
  },
  {
    input: {
      placeholder: `最多${MAX_UPC_LENGTH}个 UPC，逗号分隔`,
      allowClear: true,
    },
  },
);

import { SearchRuleId } from '../../../constants';
import { idFilter } from './idFilter';

export const skuId = idFilter(SearchRuleId.SkuIds, 'SKUID');

import { SearchRuleId } from '../../../constants';
import { idFilter } from './idFilter';

export const poiId = idFilter(SearchRuleId.PoiIds, '门店 ID');

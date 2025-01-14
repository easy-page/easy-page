import { SearchRuleId } from '../../constants'
import { SelectState } from '@easy-page/antd-ui'
import { GetActApplyResStatusOptionsRes } from '@/common/apis/getActApplyResStatusOptions'
import { Dayjs } from 'dayjs'
import { ActFullInfo, CityListItem } from '@/common/apis'

export type ActApplyResultFilterFormState = {
  [SearchRuleId.SubActName]: SelectState<string>
  [SearchRuleId.SkuName]: string
  [SearchRuleId.ApplyTime]: Dayjs
  [SearchRuleId.Status]: SelectState<string>
  [SearchRuleId.BrandIds]: string;
  [SearchRuleId.CityIds]: SelectState<string>;
  [SearchRuleId.PoiIds]: string;
  [SearchRuleId.PoiName]: string;
  [SearchRuleId.SkuIds]: number[];
  [SearchRuleId.Upc]: string;
  [SearchRuleId.SubsidyLevel]: SelectState<string>
  [SearchRuleId.BrandIds]: string
  [SearchRuleId.CityIds]: SelectState<string>
  [SearchRuleId.PoiIds]: string
  [SearchRuleId.PoiName]: string
  [SearchRuleId.Upc]: string
}

export type ActApplyResultFilterFormProps = {
  subActivity: ActFullInfo['subActivity']
  cities: CityListItem[]
  statusOptions: GetActApplyResStatusOptionsRes
}

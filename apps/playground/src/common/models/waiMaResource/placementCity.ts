import { JhdTypeItem } from '@/common/apis'
import { ResourceTemplate } from '@/common/apis/getSourceInfoList'
import { Empty } from '@easy-page/antd-ui'
import { ListModel } from '../base/list'
import { MapModel } from '../base/map'
import { ProvinceItem } from '@/common/apis/queryCityInfo'

class PlacementCity extends ListModel<ProvinceItem, Empty> {}

export const placementCityModel = new PlacementCity({
  disablePage: true,
  defaultFilters: {},
})

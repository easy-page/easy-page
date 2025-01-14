import { nodeUtil } from "@easy-page/antd-ui";
import { SearchRuleId } from "../../../constants";
import { isEmptyStr } from "@/common/libs";

export const poiName = nodeUtil.createField(SearchRuleId.PoiName, '门店名称', {
  value: '',
  postprocess({ value }) {
    if (isEmptyStr(value)) {
      return {}
    }
    return {
      [SearchRuleId.PoiName]: value
    }
  },
}, {

  input: {
    placeholder: '请输入',
    allowClear: true,
  }
})
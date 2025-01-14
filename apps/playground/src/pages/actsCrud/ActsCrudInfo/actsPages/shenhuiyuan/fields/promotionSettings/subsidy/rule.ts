import { nodeUtil } from "@easy-page/antd-ui";
import { DefaultRuleInfoState, SubsidyRuleEnum } from "../../../common/constant";
import { Content4Shy } from "@/common/apis/saveAct/interfaces";
import { ISubActivity } from "@/common/apis/saveAct/interfaces/subAct";
import { appendToContent4Shy } from "./utils/appendToSubActRule";
import { getFromContent4Shy } from "./utils/getFromContent4Shy";
import { ShenhuiyuanFormState } from "../../../interface";
import { hasPeriodInfo } from "./utils/hasPeriodInfo";
import { ConfirmSceneEnum } from "@/common/fields";
import { Modal } from "antd";

export const subsidyRuleInfo = nodeUtil.createField<SubsidyRuleEnum[], ShenhuiyuanFormState>('subsidyRuleInfo', '补贴条件', {
  mode: 'multiple',
  postprocess: ({ value, processedFormData }) => {
    const subAct: ISubActivity[] = appendToContent4Shy(processedFormData, {
      customSubsidyCondition: [...value],
    });
    return {
      subActivity: subAct,
    };
  },

  actions: [{
    effectedKeys: ['poiType'],
    action: () => {
      // 门店发生变化，清空表格
      return {
        fieldValue: [...DefaultRuleInfoState],
        validate: false,
      };
    },
  }],
  effectedKeys: ['confirmDialogManager', 'ruleTable'],
  preprocess({ defaultValues }) {
    const data = getFromContent4Shy<Content4Shy['customSubsidyCondition']>(
      'customSubsidyCondition',
      defaultValues,
    );
    return (data || DefaultRuleInfoState) as SubsidyRuleEnum[];
  },
}, {
  checkBoxGroup: {
    handleChange({ value, onChange, preValue, frameworkProps: { store, nodeInfo } }) {

      const { confirmDialogManager, ruleTable } = store.pageState as ShenhuiyuanFormState;
      // const choosePeriod = value.includes(SubsidyRuleEnum.Period) && !preValue.includes(SubsidyRuleEnum.Period)
      const unChoosePeriod = !value.includes(SubsidyRuleEnum.Period) && preValue.includes(SubsidyRuleEnum.Period)

      // 弹窗管理
      if (unChoosePeriod && hasPeriodInfo(ruleTable)) {
        confirmDialogManager?.confirm({
          callback() {
            onChange(value)
          },
          onConfirm() {
            Modal.confirm({
              centered: true,
              title: '提示',
              content: '修改后时段内已填写的信息将会清空，是否修改 ',
              onOk() {
                onChange([...value])
              },
            })
          },
          triggerField: nodeInfo.id,
          sence: ConfirmSceneEnum.ShySubsidyPeriod,
        })
      } else {
        onChange([...value])
      }
    },
  }
}).appendChildren([
  nodeUtil.createNode(SubsidyRuleEnum.UserGroup, { name: '人群' }, { checkBox: { disabled: true } }),
  nodeUtil.createNode(SubsidyRuleEnum.AllDay, { name: '全天' }, { checkBox: { disabled: true } }),
  nodeUtil.createNode(SubsidyRuleEnum.Period, { name: '时段' }),
])
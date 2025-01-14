import {
  ChildFormItem,
  ChildFormState,
  DEFAULT_COMPONENTS,
  EXTRA_COMPONENTS,
  EasyPage,
  FormUtil,
  generateId,
  nodeUtil,
  validateAllChildForm,
} from '@easy-page/antd-ui';
import { RuleTableFormProps, RuleTableFormState } from './interface';
import {
  ShenhuiyuanFormProps,
  ShenhuiyuanFormState,
} from '../../../../interface';
import classNames from 'classnames';
import {
  AddIcon,
  PoiTypeEnum,
  SubsidyConditionKeyEnum,
  SubsidyLevelEnum,
  SubsidyRule,
  SubsidyRuleDetail,
  TableHeader,
  isView,
} from '@/common';
import { getPageInfo } from './pageInfos';
import './index.less';
import {
  RuleTableSuffix,
  SubsidyRuleEnum,
  getDefaultRuleTableState,
} from '../../../../common/constant';
import { getLastFormUtil } from '@/common/fields';
import { Content4Shy } from '@/common/apis/saveAct/interfaces';
import { postprocessPeriod } from './utils';
import { preprocessPeriod } from './utils/processPeriod';
import { message } from 'antd';
import { handlePeriodEffect } from './effects/handlePeriodEffect';

const MAX_PERIOD = 5;

export const DefaultRuleTableId = generateId(RuleTableSuffix);

export const ruleTable = nodeUtil.createChildForm<
  ChildFormState<RuleTableFormState>,
  ShenhuiyuanFormState,
  ShenhuiyuanFormProps
>(
  'ruleTable',
  {
    value: getDefaultRuleTableState(),
    name: ' ',
    childFormContext: ['subsidyRuleInfo', 'poiType'],

    validate: async ({ value, onChange }) => {
      // console.log('what fuck vvvv:', value, Object.keys(value.formUtils || {}));
      const results = await validateAllChildForm(value, { onChange });
      const hasError = results.find((e) => Boolean(e.errors));
      return { success: !hasError };
    },
    preprocess({ defaultValues }) {
      const subAct = defaultValues?.['subActivity'] || [];
      const content4Shy: Content4Shy = subAct?.[0]?.content4Shy;
      const expand = (content4Shy?.subsidyRule || []).find(
        (x) => x.scene === SubsidyLevelEnum.Expand,
      );
      const userLineId = generateId('user-line');
      const allDayLineId = generateId('all-day-line');
      const childFormItems: ChildFormItem[] = [
        {
          id: userLineId,
          label: '',
        },
        {
          id: allDayLineId,
          label: '',
        },
      ];
      if (!expand) {
        return {
          childForms: childFormItems,
          choosedItemId: userLineId,
        };
      }
      const childFormDefaultValues: Record<string, any> = {};
      const userGroupLine = (expand.rule || []).find(
        (e) => e.condition?.key === SubsidyConditionKeyEnum.ScTargetUserType,
      );
      const allDayLine = (expand.rule || []).find(
        (e) => e.condition?.key === SubsidyConditionKeyEnum.ScAllDay,
      );
      const periodLine = (expand.rule || []).find(
        (e) => e.condition?.key === SubsidyConditionKeyEnum.ScPeriod,
      );
      const periodLines = preprocessPeriod(periodLine);

      childFormDefaultValues[userLineId] = userGroupLine;
      childFormDefaultValues[allDayLineId] = allDayLine;
      periodLines.forEach((each, idx) => {
        const id = generateId(`period-id_${idx}`);
        childFormDefaultValues[id] = each;
        childFormItems.push({ id, label: '' });
      });
      const firstId = childFormItems?.[0]?.id;
      return {
        choosedItemId: firstId,
        childForms: childFormItems,
        childFormDefaultValues,
      };
    },
    // https://km.sankuai.com/collabpage/2259900246#id-3.3.2%20%E6%8F%90%E6%8A%A5%E6%B4%BB%E5%8A%A8%20%40%E9%82%B5%E7%90%B3
    postprocess({ value, processedFormData }) {
      const childForms = postprocessPeriod(
        Object.values(value.formUtils || {}).map((e) => {
          return e?.getFormData() || {};
        }) as SubsidyRuleDetail[],
      );
      const subAct = processedFormData?.['subActivity'] || [
        {
          name: generateId('sub-act-name'),
        },
      ];
      const content4Shy: Content4Shy = subAct[0]?.content4Shy || {
        subsidyRule: [],
      };

      const subsidyRule: SubsidyRule[] = content4Shy.subsidyRule || [];

      let expand = subsidyRule.find((x) => x.scene === SubsidyLevelEnum.Expand);
      if (!expand) {
        subsidyRule.push({ scene: SubsidyLevelEnum.Expand, rule: [] });
        expand = subsidyRule.find((x) => x.scene === SubsidyLevelEnum.Expand);
      }

      expand.rule = expand.rule || [];
      expand.rule = [...expand.rule, ...childForms];
      content4Shy.subsidyRule = subsidyRule;
      subAct[0].content4Shy = content4Shy;
      return {
        subActivity: subAct,
      };
    },
    childFormContainer: (props) => {
      const {
        value,
        onAdd,
        onRemove,
        setChildFormRef,
        childFormContextData,
        disabled,
        onChildFormChanged,
      } = props as any;
      const { childForms, childFormDefaultValues, formUtils } =
        value as ChildFormState<RuleTableFormState>;
      const showAddPeriod = childFormContextData?.['subsidyRuleInfo']?.includes(
        SubsidyRuleEnum.Period,
      );
      const disableAdd = disabled || childForms.length - 2 >= MAX_PERIOD;
      const poiType = childFormContextData?.['poiType'];
      const isDirect = poiType === PoiTypeEnum.Direct;
      return (
        <div className="flex flex-col">
          <div className="grid grid-cols-12 gap-8 bg-[#F5F5F6] py-2 px-4 min-w-[900px]">
            <TableHeader
              className="col-span-3"
              name="补贴条件"
              tooltip="仅满足以下条件时，差异化商补才生效；人群补贴可同全天/时段叠加，时段和全天互斥，时段优先级高于全天。"
            />
            <TableHeader
              className="col-span-3"
              extra="0.5~20，支持0.5结尾的一位小数"
              required
              // tooltip="xxx"
              name="商家补贴（元）"
            />
            <TableHeader
              className="col-span-3"
              extra="0.5~20，支持0.5结尾的一位小数"
              required
              // tooltip="xxx"
              name="BD补贴（元）"
            />
            {isDirect ? (
              <></>
            ) : (
              <TableHeader
                className="col-span-3"
                extra="0.5~20，支持0.5结尾的一位小数"
                required
                name="代理商CM补贴（元）"
              />
            )}
          </div>
          {childForms.map((each, idx) => {
            const pageInfo = getPageInfo(idx);
            const defaultVal = childFormDefaultValues?.[each.id];
            return (
              <EasyPage<RuleTableFormState, RuleTableFormProps>
                pageType="form"
                commonUIConfig={{
                  form: {
                    className: classNames(
                      'grid grid-cols-12 gap-8 px-4 py-2 rule-talbe-form items-start min-w-[900px]',
                      {
                        'rule-talbe-form-border-b': idx < 2,
                      },
                    ),
                  },
                }}
                defaultValues={defaultVal}
                effects={[
                  {
                    changedKeys: ['period'],
                    action() {
                      handlePeriodEffect({
                        childForms,
                        formIndex: idx,
                        formUtils,
                      });
                    },
                  },
                ]}
                onChange={() => {
                  onChildFormChanged();
                }}
                context={{
                  formId: each.id,
                  formIdx: idx,
                  onRemove: () => onRemove(each.id),
                  lastFormUtil: getLastFormUtil({ formIndex: idx, value }),
                  ...childFormContextData,
                  editable: disabled ? false : undefined,
                }}
                key={each.id}
                setFormUtil={(ref) => setChildFormRef(ref, each.id)}
                components={{
                  ...DEFAULT_COMPONENTS,
                  ...EXTRA_COMPONENTS,
                }}
                {...pageInfo}
              />
            );
          })}
          {showAddPeriod ? (
            <div className="expand-level-form p-4   flex flex-row items-center min-w-[800px]">
              <div
                onClick={() => {
                  if (!disableAdd) {
                    onAdd();
                  }
                }}
                className={classNames(
                  'flex flex-row text-[#386AFD]  items-center w-[150px]',
                  {
                    'text-sec cursor-not-allowed': disableAdd,
                    'cursor-pointer': !disableAdd,
                  },
                )}
              >
                <AddIcon color={disableAdd ? '#858692' : '#386BFF'} />
                <div
                  className="ml-1"
                  onClick={() => {
                    if (disableAdd && !isView()) {
                      message.info(`最多配置${MAX_PERIOD}个时段`);
                    }
                  }}
                >
                  添加时段（{childForms.length - 2}/{MAX_PERIOD})
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      );
    },
  },
  {
    formItem: {
      wrapperCol: { span: 20 },
    },
  },
);

export * from './interface';

import {
  DEFAULT_COMPONENTS,
  EXTRA_COMPONENTS,
  EasyPage,
  EasyPageOnChangeContext,
  NodeInfo,
  NodeInfoWithChildren,
  PageUtil,
} from '@easy-page/antd-ui';
import { useEffect, useMemo, useState } from 'react';

export type ListFilterProps<State, Props> = {
  /** 条件过滤节点 */
  nodes: (NodeInfo<any, any, any> | NodeInfoWithChildren<any, any, any>)[];

  /** 字符串就行，用来区分表单唯一 */
  filterId: string;

  defaultValues?: Record<string, any>;

  onChange?: (
    context: EasyPageOnChangeContext<State> & {
      hasChanged: (key: keyof State) => boolean;
    },
  ) => void;

  context?: Props;
};

export const CommonListFilter = <State, Props>({
  nodes,
  defaultValues,
  filterId,
  context,
  onChange,
}: ListFilterProps<State, Props>) => {
  /** 用于筛选条件发生变化，刷新表单 */
  const [timestamp, setTimestamp] = useState(new Date().getTime());

  const pu = useMemo(() => {
    return new PageUtil({
      pageId: `${filterId}-filters`,
    });
  }, []);

  useEffect(() => {
    setTimestamp(new Date().getTime());
    pu.addFields(nodes);
  }, [nodes]);

  const pageInfo = pu.getPageInfo();
  console.log('defaultValues:', `${filterId}_${timestamp}`);
  return (
    <EasyPage<State, Props>
      {...pageInfo}
      defaultValues={defaultValues}
      context={context}
      commonUIConfig={{
        formItem: {
          className: 'mb-2',
        },
      }}
      onChange={onChange}
      key={`${filterId}_${timestamp}`}
      components={{ ...DEFAULT_COMPONENTS, ...EXTRA_COMPONENTS }}
      pageType="form"
    />
  );
};

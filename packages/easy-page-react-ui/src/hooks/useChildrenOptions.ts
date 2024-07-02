/* eslint-disable @typescript-eslint/no-explicit-any */
import { SchemaNodeInfo } from '@easy-page/core';
import { IReactionDisposer, reaction } from 'mobx';
import { useEffect, useState } from 'react';
import { EasyPageStore } from '../model';
import { DefaultPageProps } from '../types';
import { BaseFrameworkProps } from '../view';

export type ChildrenOption = {
  value: any;
  label: string;
  disabled?: boolean;
  children?: any;
};

/** 获取 appendChildren 中的选项 */
export const useChildrenOptions = (options: {
  children: any[];
  fieldValue: any;
  frameworkProps: BaseFrameworkProps<
    any,
    Record<string, any>,
    DefaultPageProps<Record<string, any>>
  >;
}): ChildrenOption[] => {
  const {
    children,
    fieldValue,
    frameworkProps: { store },
  } = options;
  const [childrenOptions, setChildrenOptions] = useState<ChildrenOption[]>([]);
  useEffect(() => {
    const showDisposer: IReactionDisposer[] = [];

    const getShowParams = (
      effectedData: any,
      store: EasyPageStore<
        Partial<Record<string, any>>,
        Partial<DefaultPageProps<Record<string, any>>>
      >
    ) => {
      return {
        effectedData: effectedData,
        initRun: false,
        pageProps: store?.getPageProps(),
        pageState: store?.getAllState(),
        defaultValues: store?.getDefaultValues(),
        value: fieldValue,
      };
    };
    const curOptions: ChildrenOption[] = [];
    /** 对于选项来说，没有值，也没有其他属性变化，因此：action 无效 */
    children.forEach((each, idx) => {
      const nodeInfo = each.props?.frameworkProps?.nodeInfo as SchemaNodeInfo<
        any,
        any
      >;
      const effectedKeys = nodeInfo.when?.effectedKeys || [];
      if (nodeInfo?.when) {
        showDisposer.push(
          reaction(
            () => store?.getEffectedData(effectedKeys as string[]),
            (args, preArgs) => {
              const show =
                !nodeInfo.when ||
                (nodeInfo.when &&
                  !nodeInfo.when.show(getShowParams(args, store)));
              let hasChanged = false;
              const hasOpt = childrenOptions.find((e) => e.value === nodeInfo.id);
              const curOpts = childrenOptions.filter((e) => {
                if (e.value !== nodeInfo.id) {
                  return true;
                }
                if (!show) {
                  /** 存在但现在不展示了，则表示变化了 */
                  hasChanged = true;
                }
                return show;
              });

              if (!hasOpt && show) {
                /** 之前不存在，现在需要展示 */
                hasChanged = true;
                curOpts.splice(idx, 0, {
                  value: nodeInfo.id,
                  label: nodeInfo.name,
                  disabled: each.props?.disabled,
                  children: each.props?.children,
                });
              }
              if (hasChanged) {
                setChildrenOptions(curOpts);
              }
            }
          )
        );
      }
      const show =
        !nodeInfo.when ||
        (nodeInfo.when && !nodeInfo.when.show(getShowParams(nodeInfo, store)));
      if (show) {
        curOptions.push({
          value: nodeInfo.id,
          label: nodeInfo.name,
          disabled: each.props?.disabled,
          children: each.props?.children,
        });
      }
    });
    /** 设置初始化选项 */
    setChildrenOptions(curOptions);
    return () => {
      showDisposer.forEach((e) => e?.());
    };
  }, []);
  return childrenOptions;
};

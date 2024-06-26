/* eslint-disable @typescript-eslint/no-explicit-any */
import { IReactionDisposer, reaction } from 'mobx';
import { observer } from 'mobx-react';
import { useEffect, useMemo, useState, useRef, useCallback } from 'react';
import { CORE_COMPONENTS, EffectsManager, getChangedKeys } from '../utils';
import { execAction } from './execAction';
import { ConnectProps, EffectActionOptions, EffectInfo } from './interface';
import { getDefaultVisible } from './getDefaultVisible';

/**
 * - 处理一些通用逻辑
 * - 处理一些特化逻辑
 * - 连接 store
 * - UI 副作用变化可以放在这里
 * @param Element
 * @returns
 */

export function connector(Element: React.JSXElementConstructor<any>) {
  return observer(function useConnector(props: ConnectProps) {
    const {
      frameworkProps: {
        effectedResult,
        effectedLoading,
        nodeInfo,
        store,
        componentName,
        uiType,
        getFormUtil,
        isForm,
      },
      onChange,
      __internal_props_handleChange: handleChange,
      ...restProps
    } = props;
    const { id, actions, when } = nodeInfo;
    const extraProps: any = {
      /**
       * - 默认值不能为 undefined，否则：会使得非受控组件变为受控组件
       * - 但是字段的默认值不在这里能决定
       * - 一般由用户决定： api 上强制填写默认值
       */
      value: store?.pageState[id],
    };
    const isField = uiType === 'ui';
    const isFormItemComponent = uiType === 'formItemUI';
    /**
     * - 注册和使用副作用
     *  - 在表单页面中，副作用的注册和使用都在：FormItem 上
     *  - 在表单页面中，非 FormItem 包裹元素（isFormItem: false）：在组件本身上
     *  - 在非表单页面中，副作用的注册和使用都在：组件本身上
     *
     */
    const canUseEffects =
      (isForm && isFormItemComponent) ||
      (!isForm && isField) ||
      (isForm && !nodeInfo.isFormField && isField);
    if (
      isField &&
      ![(CORE_COMPONENTS.FORM, CORE_COMPONENTS.FORMITEM)].includes(
        componentName
      )
    ) {
      extraProps.onChange = (e: { target: { value: any } } | any) => {
        /**
         * - 部分 UI 库实现差异，有的是 e.target.value 有的直接是 value
         */
        const val = e && e.target ? e.target.value : e;
        if (nodeInfo.isFormField && props.onChange) {
          props.onChange(e);
        }
        store?.setState(id, val);
        /** 传递给 EasyPage 外部感知 */
        if (handleChange) {
          handleChange({ [id]: val });
        }
      };
    }

    /** 副作用结果值 */
    const [effectedInfo, setEffectedInfo] = useState<EffectInfo>({
      loading: effectedLoading ?? false,
      effectedResult,
      initRun: true,
    });

    /** 副作用的值存储，用于在副作用中不是最新的值使用 */
    const effectedInfoRef = useRef<EffectInfo>(effectedInfo);

    const handleSetEffectInfo = useCallback((newInfo: EffectInfo) => {
      setEffectedInfo(newInfo);
      effectedInfoRef.current = newInfo;
    }, []);

    /** 是否展示 */
    const [visible, setVisible] = useState(getDefaultVisible(nodeInfo));
    useEffect(() => {
      const effectManager = new EffectsManager(nodeInfo.id);
      /**
       * - 注册状态变化 reactions
       */
      let stateDisposer: IReactionDisposer | null = null;
      let showDisposer: IReactionDisposer | null = null;
      const doEffectAction = async (options: EffectActionOptions) => {
        try {
          const {
            effectedData: curEffectedData,
            initRun,
            changedKeys,
          } = options;
          const commonEffectInfo: EffectInfo = {
            ...(effectedInfoRef.current || {}),
            initRun,
          };
          // console.log('setEffectedInfo:', setEffectedInfo);
          if (!actions) {
            /** 没有 actions 则基于变化，刷新组件即可 */
            handleSetEffectInfo(commonEffectInfo);
            return;
          }
          handleSetEffectInfo({ ...commonEffectInfo, loading: true });

          const result = await effectManager.executePromise(
            execAction({
              ...props,
              changedKeys,
              initRun,
              effectedData: curEffectedData,
            })
          );

          const formUtil = getFormUtil?.();
          if (result.fieldValue !== undefined) {
            store?.setState(id, result.fieldValue);
            /**
             * - 表单状态变化，副作用触发验证
             * - 更改 form 中状态，并触发验证 */
            formUtil?.setField(id, result.fieldValue, {
              validate: result.validate ?? true,
            });
          }

          /** 更新 action 执行结果 */
          handleSetEffectInfo({
            ...commonEffectInfo,
            effectedResult:
              /** 此次没有结果，就使用上一次的结果 */
              result?.effectResult || effectedInfoRef.current?.effectedResult,
            loading: false,
            upt: result.upt,
          });
        } catch (error: any) {
          console.warn(
            'exec effects action error:',
            nodeInfo.id,
            error?.message
          );
        }
      };
      if (canUseEffects) {
        const effectActionKeys = (actions || [])
          .map((e) => e.effectedKeys || [])
          .flat();
        stateDisposer =
          effectActionKeys.length > 0
            ? reaction(
                () => store?.getEffectedData([...new Set(effectActionKeys)]),
                (args, preArgs) => {
                  const changedKeys = getChangedKeys(args, preArgs);
                  if (changedKeys.length === 0) {
                    return;
                  }

                  return doEffectAction({
                    changedKeys,
                    effectedData: args,
                    initRun: false,
                  });
                }
              )
            : null;
        const effectWhenKeys = when?.effectedKeys || [];
        showDisposer =
          effectWhenKeys.length > 0
            ? reaction(
                () => store?.getEffectedData(effectWhenKeys),
                (args, preArgs) => {
                  const res = when?.show?.({
                    initRun: false,
                    value: store?.getState(nodeInfo.id),
                    pageProps: store?.getPageProps(),
                    pageState: store?.getAllState(),
                    effectedData: args,
                    defaultValues: store?.getDefaultValues(),
                  });
                  if (res !== undefined) {
                    setVisible(res);
                  }
                }
              )
            : null;

        /** 初次进入时，执行 when */
        if (!when?.disableInitRun) {
          const initRunWhen = () => {
            const res = when?.show?.({
              initRun: true,
              value: store?.getState(nodeInfo.id),
              pageProps: store?.getPageProps(),
              pageState: store?.getAllState(),
              effectedData: store?.getEffectedData(effectWhenKeys),
              defaultValues: store?.getDefaultValues(),
            });
            if (res !== undefined) {
              setVisible(res);
            }
          };
          initRunWhen();
        }
        /** 初次执行数组最前面的那个 e.effectedKeys || e.effectedKeys.length === 0 的 */
        const action = actions?.find(
          (e) => e.initRun || !e.effectedKeys || e.effectedKeys.length === 0
        );
        if (action) {
          const effectedData = store.getEffectedData(action.effectedKeys || []);
          doEffectAction({
            changedKeys: action.effectedKeys || [],
            initRun: true,
            effectedData,
          });
        }
      }
      return () => {
        stateDisposer?.();
        showDisposer?.();
        effectManager.cancelCurrentPromise();
      };
    }, []);

    /** 框架提供的 props */
    const newFrameworkProps = useMemo(() => {
      const { effectedResult, loading, upt } = effectedInfo;
      return {
        ...props.frameworkProps,
        effectedResult,
        effectedLoading: loading,
        upt,
      };
    }, [
      effectedInfo?.effectedResult,
      effectedInfo?.loading,
      effectedInfo?.upt,
    ]);

    const parentFrameworkPropsMemo = useMemo(() => {
      // testLog(nodeInfo.id, componentName, 'parentFrameworkPropsMemo')
      return {
        ...props.frameworkProps,
      };
    }, [
      props.frameworkProps?.effectedResult,
      props.frameworkProps?.effectedLoading,
      props.frameworkProps?.upt,
    ]);

    /**
     * - 表单中，被 FormItem 包裹的元素，frameworkProps 来源于父节点变化
     * - 其余来源于副作用
     */
    const finalFrameworkProps =
      isField && isForm && nodeInfo.isFormField
        ? parentFrameworkPropsMemo
        : newFrameworkProps;

    /** 父亲节点传递的普通属性 */
    const parentPropsMemo = useMemo(
      () => ({ ...restProps }),
      [restProps.value]
    );

    /** connector 额外新增 Props */
    const extraPropsMemo = useMemo(
      () => ({ ...extraProps }),
      [store?.getState(id)]
    );

    if (!visible) {
      return <></>;
    }

    return (
      <Element
        key={`${props.frameworkProps.componentName}_${nodeInfo.id}`}
        {...parentPropsMemo}
        frameworkProps={finalFrameworkProps}
        {...extraPropsMemo}
      />
    );
  });
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import { DataContext, Schema } from '@easy-page/core';
import { EasyPageStore } from '../model';
import { ShowChildrenMap } from './interface';

export type FieldValidateRes = {
  errorMsg: string[];
  id: string;
  label: string;
  value: unknown;
};

export type ValidateInfo = {
  message: string;
  field: string;
};
export type ValidateRes = {
  err?: ValidateInfo[];
  fields?: Record<string, ValidateInfo[]>;
};

export type ValidateOptions = {
  /** 需要排除的 key */
  excludes?: string[];
  includes?: string[];
};

export type ForEachOptions<PageState> = {
  showChildren?: ShowChildrenMap<PageState>
}

export abstract class FormUtil<PageState> {

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  abstract store: EasyPageStore<unknown, any>;

  abstract submit(): void;

  abstract getFieldError(name: string): string[];

  abstract getFieldWarning(name: string): string[];

  abstract resetFields(): void;

  abstract setFieldsValue(values: Record<string, any>): void;

  abstract scrollToField(name: string, options?: ScrollOptions): void

  /** 获取表单中可见的表单数据，未执行 postprocess */
  abstract getVisibleData(options?: ForEachOptions<PageState>): Partial<PageState>;

  /** 执行完 postprocess、且表单中可见的表单数据 */
  abstract getFormData(options?: ForEachOptions<PageState>): Partial<PageState>;

  /** 原始的页面数据：表单的所有数据，无论可见与否，未执行：postprocess */
  abstract getOriginFormData(): Partial<PageState>;

  abstract validate(fields: string[]): Promise<ValidateRes>;

  abstract setField(
    key: string,
    value: unknown,
    options?: {
      validate?: boolean;
    }
  ): void;
  abstract getFieldValue(name: any): any;

  /** 验证所有可见字段 */
  abstract validateVisibleFields(
    options?: ValidateOptions
  ): Promise<FieldValidateRes[]>;

  /** 验证所有字段 */
  abstract validateAll(): Promise<any>;

  protected forEachVisibleNode(
    curNode: Schema<any>,
    callback: (options: {
      schema: Schema<any>;
      context: DataContext<any, any, any>;
    }) => boolean,
    options?: ForEachOptions<PageState>
  ) {
    const curFieldValue = this.getFieldValue(curNode.id);
    const context: DataContext<any, any, any> = {
      pageProps: this.store.getPageProps(),
      pageState: this.store.pageState,
      defaultValues: this.store.getDefaultValues(),
      value: curFieldValue,
    };
    const effectedKeys = curNode.when?.effectedKeys || [];
    const showField = curNode.when?.show
      ? curNode.when?.show({
        ...context,
        initRun: false,
        effectedData: this.store.getEffectedData(effectedKeys),
      })
      : true;
    let continueNextNode = true;
    /**
     * - curFieldValue 会在 select 清空的时候为 undefined
     * - 因此，判断字段是否需要校验，貌似需要：
     *  - 是表单字段
     *  - 是展示出来的即可
     */
    if (showField && curNode.isFormField) {
      // 可见的表单字段
      continueNextNode = callback({
        schema: curNode,
        context,
      });
    }

    if (continueNextNode && curNode.children && showField) {
      /**
       * - 判断当前节点类型
       * - 当前节点是选择型节点：只展示被选中的选项
       * - 当前节点是容器型：只要当前节点展示，则默认展示其子组件
       */
      if (curNode.childrenRelation === 'single') {
        const child = curNode.children?.find(
          (each) => {
            const customHandler = options?.showChildren?.[each.id as keyof PageState];
            if (customHandler) {
              return customHandler({
                fieldValue: curFieldValue,
                curNode: each,
                parentNode: curNode
              })
            }
            return each.id === curFieldValue;
          }
        );
        if (child) {
          this.forEachVisibleNode(child, callback, options);
        }
        return;
      }

      if (curNode.childrenRelation === 'coexist') {
        const choosedChildren = curNode.children?.filter((each) => {
          const customHandler = options?.showChildren?.[curNode.id as keyof PageState];
          if (customHandler) {
            return customHandler({
              fieldValue: curFieldValue,
              curNode: each,
              parentNode: curNode
            })
          }

          return ((curFieldValue as string[]) || ([] as string[])).includes(each.id)
        }
        );
        choosedChildren.forEach((each) =>
          this.forEachVisibleNode(each, callback, options)
        );
        return;
      }
      curNode.children.forEach((each) =>
        this.forEachVisibleNode(each, callback, options)
      );
    }
  }
}

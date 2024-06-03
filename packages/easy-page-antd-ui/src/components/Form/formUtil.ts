/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  EasyPageStore,
  FieldValidateRes,
  ForEachOptions,
  FormUtil,
  ValidateOptions,
} from '@easy-page/react-ui';
import { FormInstance } from 'antd';
import { reduce, set } from 'lodash'

export type NodeContext = {
  pageProps: any;
  pageState: any;
  value: any;
};
export class AntdFormUtil extends FormUtil<any> {

  public formRef: React.RefObject<FormInstance>;

  public store: EasyPageStore<any, any>;

  constructor(
    formRef: React.RefObject<FormInstance>,
    store: EasyPageStore<any, any>
  ) {
    super();
    this.formRef = formRef;
    this.store = store;
  }

  getFieldError(name: string) {
    return this.formRef?.current?.getFieldError(name) || []
  }
  getFieldWarning(name: string) {
    return this.formRef?.current?.getFieldWarning(name) || []
  }

  scrollToField(name: string, options?: ScrollOptions | undefined): void {
    return this.formRef?.current?.scrollToField(name, options)
  }

  getFieldValue(name: any) {
    return this.formRef?.current?.getFieldValue(name);
  }

  setFieldsValue(value: Record<string, any>) {
    this.store.setStates(value)
    return this.formRef?.current?.setFieldsValue(value);
  }

  resetFields(): void {
    this.store.resetState()
    return this.formRef?.current?.resetFields()
  }

  async validateVisibleFields(
    options?: ValidateOptions & ForEachOptions<any>
  ): Promise<FieldValidateRes[]> {
    const { excludes = [], includes = [], ...foreachOptions } = options || {};
    const rootSchema = this.store.schema;
    const results: FieldValidateRes[] = [];
    if (!this.formRef.current) {
      console.error(`${rootSchema.id} 的 formRef 实例不存在`);
      return [];
    }
    const nodeToValidate: Record<string, Partial<FieldValidateRes>> = {};
    this.forEachVisibleNode(rootSchema, ({ schema, context }) => {
      nodeToValidate[schema.id] = {
        label: schema.name,
        value: context.value,
        id: schema.id,
      };
      return true;
    }, {
      showChildren: this.store.showChildren,
      ...foreachOptions
    });
    const validateRes = await this.validate(
      Object.keys(nodeToValidate)
        .concat(includes)
        .filter((id) => !excludes?.includes(id))
    );
    console.log('validateRes:', validateRes);
    return results;
  }

  getVisibleData(options?: ForEachOptions<any>): Record<string, any> {
    const data: Record<string, any> = {};
    const rootSchema = this.store.schema;
    if (!this.formRef.current) {
      console.error(`${rootSchema.id} 的 formRef 实例不存在`);
      return {};
    }
    this.forEachVisibleNode(rootSchema, ({ schema, context }) => {
      const { value } = context;
      data[schema.id] = value;
      return true;
    }, options || { showChildren: this.store.showChildren });
    return data;
  }

  getOriginFormData() {
    return this.formRef?.current?.getFieldsValue();
  }

  setField(
    key: string,
    value: any,
    options?: { validate?: boolean | undefined }
  ): void {
    /** 这句 Store 是修复 form 的 setField 不刷新状态问题 */
    this.store.setState(key, value);
    this.formRef.current?.setFieldValue(key, value);
    if (options?.validate) {
      this.formRef.current?.validateFields([key]);
    }
  }

  submit(): void {
    this.formRef.current?.submit();
  }

  getFormData(options?: ForEachOptions<any>): Partial<any> {
    let data: Record<string, any> = {};
    const rootSchema = this.store.schema;
    if (!this.formRef.current) {
      console.error(`${rootSchema.id} 的 formRef 实例不存在`);
      return {};
    }
    this.forEachVisibleNode(rootSchema, ({ schema, context }) => {
      const { value } = context;
      const newVal = schema.postprocess
        ? schema.postprocess({
          ...context,
          processedFormData: data
        })
        : { [schema.id]: value };
      data = {
        ...data,
        ...newVal,
      };
      return true;
    }, options || { showChildren: this.store.showChildren });
    return reduce(data, (acc, value, key) => {
      set(acc, key, value)
      return acc
    }, {});
  }

  validate(fields: string[]): Promise<{ err: any; fields: any }> {
    return this.formRef.current?.validateFields(fields) as any;
  }

  validateAll(): Promise<{ err: any; fields: any }> {
    return this.formRef.current?.validateFields() as any;
  }
}

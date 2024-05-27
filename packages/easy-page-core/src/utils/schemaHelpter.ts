import { Schema, SchemaNodeOption } from '../core/protocol';

/** 创建无 "FormItem" 元素包裹节点 */
export const createSchemaNode = <
  FieldType,
  PageState = Record<string, unknown>,
  PageProps = Record<string, unknown>,
  EffectResultType = unknown
>(
  id: string,
  name: string,
  options: SchemaNodeOption<FieldType, PageState, PageProps, EffectResultType>
) => {
  const schema: Schema<FieldType, PageState, PageProps, EffectResultType> = {
    id,
    name,
    isFormField: false,
    ...options,
  };
  return schema;
};

/** 创建有 "FormItem" 元素包裹节点 */
export const createSchemaField = <
  FieldType,
  PageState = Record<string, unknown>,
  PageProps = Record<string, unknown>,
  EffectResultType = unknown
>(
  id: string,
  name: string,
  options: SchemaNodeOption<FieldType, PageState, PageProps, EffectResultType>
) => {
  const schema: Schema<FieldType, PageState, PageProps, EffectResultType> = {
    id,
    isFormField: true,
    name,
    ...options,
  };
  return schema;
};

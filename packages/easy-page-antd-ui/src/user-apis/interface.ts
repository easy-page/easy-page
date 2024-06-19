/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import { ChildFormContainerProps, ChildFormState, CustomProps } from "../components";
import { NodeOption, EffectKeys, DefaultPageProps, NodeWithChildrenOption, ComponentProps, Empty } from "@easy-page/react-ui";
import { FieldUIConfig } from "@easy-page/react-ui/interface";


export type CustomComponent<
  FieldType = Empty,
  PageState = Record<string, any>,
  PageProps = Empty,
  EffectResultType = Empty
> = FC<Omit<CustomProps<FieldType, EffectResultType, PageState, PageProps>, 'component'>>


export type CreateChildFormOptions<
  FieldType = string,
  PageState = Record<string, any>,
  PageProps = Empty,
  EffectResultType = any
> = NodeOption<FieldType, PageState, PageProps, EffectResultType> & {
  name?: string;
  childFormContext?: EffectKeys<PageState, PageProps>;
  childFormContainer: FC<
    ComponentProps<
      ChildFormContainerProps,
      ChildFormState,
      any,
      PageState,
      PageProps & DefaultPageProps<PageState>
    >
  >;
}

export type CreateContainerOption<
  FieldType = string,
  PageState = Record<string, any>,
  PageProps = Empty,
  EffectResultType = any
> = Omit<
  NodeWithChildrenOption<FieldType, PageState, PageProps, EffectResultType>,
  'value'
> & {
  fieldUIConfig?: FieldUIConfig;
}

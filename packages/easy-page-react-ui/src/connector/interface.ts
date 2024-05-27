/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentProps } from '../view';

export type ConnectProps = ComponentProps<unknown, unknown> & {
  __internal_props_handleChange: (value: Record<string, unknown>) => void;
};

export type EffectActionOptions = {
  effectedData: Record<string, unknown>;
  changedKeys: string[];
  initRun: boolean;
};

export type EffectInfo = {
  loading: boolean;
  effectedResult?: unknown;
  initRun: boolean;
  /** 用于刷新组件 */
  upt?: number;
};

export type EffectOptions = ConnectProps & {
  initRun: boolean;
  effectedData: Record<string, unknown>;
  changedKeys: string[];
};

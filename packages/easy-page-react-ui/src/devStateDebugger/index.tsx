/* eslint-disable @typescript-eslint/no-explicit-any */

import { DefaultValueSource } from './const';

export const generateId = (prefix: string) => {
  return prefix + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
};

export type DevStateDeuggerOptions = {
  formId: string;
};

export type DefaultValueInfo = {
  id: string;
  value: any;
  source: DefaultValueSource;
};

export type LoggerInfo = {
  time: number;
  triggerSence: string;
  value: string;
  id: string;
};

const MAX_COUNT = 20;

export class DevStateDeugger {
  private formId: string;
  private debuggerId: string;
  constructor({ formId }: DevStateDeuggerOptions) {
    this.formId = formId;
    this.debuggerId = generateId(formId);
  }

  getFieldKey(id: string) {
    return `${id}_value_log`;
  }

  printDefaultValueLog(id: string) {
    const fieldKey = this.getFieldKey(id);
    const store = this.getStore();
    const fieldValueLogs = store[fieldKey] as DefaultValueInfo[];
    console.table(fieldValueLogs);
  }

  setValuesInfo(logsInfo: Record<string, DefaultValueInfo[]>) {
    (window as any)[this.debuggerId] = (window as any)[this.debuggerId] || {};
    Object.keys(logsInfo || {}).forEach((id) => {
      const fieldKey = this.getFieldKey(id);
      const logs = (window as any)[this.debuggerId][fieldKey] || [];

      (window as any)[this.debuggerId][fieldKey] = [
        ...logs,
        ...(logsInfo[id] || []),
      ];
    });
  }

  getStore() {
    return ((window as any)[this.debuggerId] || {}) as Record<
      string,
      LoggerInfo[] | DefaultValueInfo[]
    >;
  }

  setStore(id: string, loggs: LoggerInfo[]) {
    (window as any)[this.debuggerId] = (window as any)[this.debuggerId] || {};
    (window as any)[this.debuggerId][id] = loggs;
  }

  printLogs(id: string) {
    const logs = this.getStore();
    const fieldLogs = (logs[id] || []) as LoggerInfo[];
    console.table(
      fieldLogs.map((e) => {
        return {
          ...e,
          time: new Date(e.time).toLocaleString(),
        };
      })
    );
  }

  prepareValue(val: any) {
    if (Array.isArray(val)) {
      return [...val];
    }
    if (typeof val === 'object') {
      return { ...val };
    }
    return val;
  }

  addOnChange(
    id: string,
    value: any,
    {
      triggerSence,
    }: {
      triggerSence: string;
    }
  ) {
    /** key 为字段 id， value 为 onChange 日志，最多存十条 */
    const logs = this.getStore();
    const fieldLogs = (logs[id] || []) as LoggerInfo[];
    if (fieldLogs.length === MAX_COUNT) {
      fieldLogs.shift();
    }
    fieldLogs.push({
      id,
      value: this.prepareValue(value),
      time: new Date().getTime(),
      triggerSence,
    });
    this.setStore(id, fieldLogs);
  }
}

export * from './const';

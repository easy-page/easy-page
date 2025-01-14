import * as React from 'react';
import type { ValidateMessages } from 'rc-field-form/lib/interface';

export type RequiredMark = boolean | 'optional';
export type DirectionType = 'ltr' | 'rtl' | undefined;

export interface ConfigConsumerProps {
    getPrefixCls: (suffixCls?: string, customizePrefixCls?: string) => string;
    direction?: DirectionType;
    FormPro?: {
        validateMessages?: ValidateMessages;
        requiredMark?: RequiredMark;
        colon?: boolean;
    };
}

const defaultGetPrefixCls = (suffixCls?: string, customizePrefixCls?: string) => {
    if (customizePrefixCls) return customizePrefixCls;

    return suffixCls ? `roo-${suffixCls}` : 'roo'
};

export const ConfigContext = React.createContext<ConfigConsumerProps>({
    getPrefixCls: defaultGetPrefixCls,
});
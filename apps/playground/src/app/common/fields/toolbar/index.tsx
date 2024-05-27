import { nodeUtil } from '@easy-page/antd-ui';
import React from 'react';
import { validate } from './validate';
import { submit } from './submit';

export const toolbar = nodeUtil
  .createContainer('tool-bar', ({ children }) => {
    return (
      <div className="flex flex-row" style={{ marginBottom: 12 }}>
        {children}
      </div>
    );
  })
  .appendChildren([validate, submit]);

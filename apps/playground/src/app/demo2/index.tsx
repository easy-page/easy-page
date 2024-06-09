import { DEFAULT_COMPONENTS, EXTRA_COMPONENTS } from '@easy-page/antd-ui';
import { EasyPage } from '@easy-page/react-ui';
import { PageState } from './interface';
import { pageInfo } from './pageInfo';
import { useEffect, useState } from 'react';

export const Demo2 = () => {
  const [context, setContext] = useState([1]);
  useEffect(() => {
    setTimeout(() => setContext([11, 22222]), 2000);
  }, []);
  return (
    <EasyPage<PageState, any>
      components={{
        ...DEFAULT_COMPONENTS,
        ...EXTRA_COMPONENTS,
      }}
      key={'asda'}
      defaultValues={{
        activities: [
          {
            test: 'xxx',
          },
          {
            test: 'xxx22',
          },
        ],
      }}
      context={{
        t: context,
      }}
      pageType="form"
      {...pageInfo}
    />
  );
};

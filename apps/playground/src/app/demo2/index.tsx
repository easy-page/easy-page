import { DEFAULT_COMPONENTS, EXTRA_COMPONENTS } from '@easy-page/antd-ui';
import { EasyPage, Empty } from '@easy-page/react-ui';
import { PageState } from './interface';
import { pageInfo } from './pageInfo';
import { useEffect, useState } from 'react';

export const Demo2 = () => {
  const [editable, setEditable] = useState(false);
  // useEffect(() => {
  //   setTimeout(() => {
  //     setEditable(true);
  //   }, 1000);
  // }, []);
  return (
    <EasyPage<PageState, Empty>
      components={{
        ...DEFAULT_COMPONENTS,
        ...EXTRA_COMPONENTS,
      }}
      key={'asda'}
      pageId="cssss"
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
        // t: userInfo,
        editable: { canNotEditKeys: ['name'] },
      }}
      pageType="form"
      {...pageInfo}
    />
  );
};

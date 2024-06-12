import { DEFAULT_COMPONENTS, EXTRA_COMPONENTS } from '@easy-page/antd-ui';
import { EasyPage } from '@easy-page/react-ui';
import { PageState } from './interface';
import { pageInfo } from './pageInfo';
import { useEffect, useState } from 'react';

export const Demo2 = () => {
  // const [userInfo, setUserInfo] = useState<any>();

  // useEffect(() => {
  //   setTimeout(() => {
  //     setUserInfo({ id: '1', name: '22', avatar: '' });
  //   });
  // }, []);
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
      context={
        {
          // t: userInfo,
        }
      }
      pageType="form"
      {...pageInfo}
    />
  );
};

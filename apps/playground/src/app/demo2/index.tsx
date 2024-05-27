import { DEFAULT_COMPONENTS, EXTRA_COMPONENTS } from '@easy-page/antd-ui';
import { EasyPage } from '@easy-page/react-ui';
import { PageState } from './interface';
import { pageInfo } from './pageInfo';

export const Demo2 = () => {
  return (
    <EasyPage<PageState>
      components={{
        ...DEFAULT_COMPONENTS,
        ...EXTRA_COMPONENTS,
      }}
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
        editable: {
          canNotEditKeys: ['age'],
          // canEditKeys: [
          //   'age',
          //   'desc',
          //   'friend',
          //   'sex',
          //   'swtccc',
          //   'time1',
          //   'time2',
          //   'name',
          //   'hobby',
          // ],
        },
      }}
      pageType="form"
      {...pageInfo}
    />
  );
};

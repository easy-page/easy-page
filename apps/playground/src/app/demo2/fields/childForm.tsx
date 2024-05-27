import {
  ChildFormState,
  DEFAULT_COMPONENTS,
  EasyPage,
  Empty,
  FormUtil,
  generateId,
  nodeUtil,
  validateAllChildForm,
} from '@easy-page/antd-ui';
import { Tabs } from 'antd';
import { PageState } from '../interface';
import { childFormInfo } from './pageInfo';
import { useMemo } from 'react';
import { MyComponent } from './Text';

const TAB_PREFIX = 'child-form';
const defaultActId = generateId(TAB_PREFIX);

export const Text111 = ({ id }: { id: string }) => {
  return <div>ttt{id}</div>;
};

export const childForm = nodeUtil.createChildForm<
  ChildFormState,
  PageState,
  { actId: string }
>(
  'child-form',
  {
    childFormContext: ['name', 'actId'],
    preprocess({ defaultValues }) {
      const acts = defaultValues.activities || [];
      const defaultActId1 = generateId(TAB_PREFIX);
      return {
        childForms: acts.map((e, idx: number) => ({
          label: `子活动${idx}`,
          id: idx === 0 ? defaultActId1 : generateId(TAB_PREFIX),
        })),
        choosedItemId: defaultActId1,
      };
    },
    postprocess({ value }) {
      const { formUtils, childForms } = value;
      console.log('childFormIds:', childForms.map((e) => e.id).join(','));
      console.log('formUtils:', Object.keys(formUtils || {}).join(','));
      return {
        activities: childForms.map((e) => {
          const util = formUtils?.[e.id];

          const data = util?.getFormData();
          return data;
        }),
      };
    },
    validate: async ({ value }) => {
      const results = await validateAllChildForm(value);
      const hasError = results.find((e) => Boolean(e.errors));
      return { success: !hasError };
    },
    childFormContainer: ({
      value,
      onChange,
      onRemove,
      onAdd,

      childFormContextData,
      setChildFormRef,
      onChildFormChanged,
      frameworkProps: { store },
    }) => {
      console.log('childFormContextData:', childFormContextData);
      const { childForms = [], choosedItemId } = value || {};
      const defaultValues = store.getDefaultValues();

      // eslint-disable-next-line react-hooks/rules-of-hooks
      // const childFormItems = useMemo(() => {
      //   return childForms.map((e, idx) => {
      //     const smallPoint = ((defaultValues || {}) as any).activities?.[idx];
      //     console.log('rrrrrrr:', e.id);
      //     return {
      //       id: e.id,
      //       icon: e.icon,
      //       key: e.id,
      //       label: e.label || `子活动${idx + 1}`,
      //       children: (
      //         <EasyPage
      //           components={DEFAULT_COMPONENTS}
      //           key={e.id}
      //           defaultValues={smallPoint}
      //           context={childFormContextData}
      //           pageType="form"
      //           pageId={e.id}
      //           onChange={() => onChildFormChanged()}
      //           setFormUtil={(ref) => {
      //             console.log('set reff', ref.store.pageId);
      //             setChildFormRef(ref, ref.store.pageId);
      //           }}
      //           {...childFormInfo}
      //         />
      //       ),
      //     };
      //   });
      // }, []);
      return (
        <div>
          <Tabs
            activeKey={choosedItemId}
            destroyInactiveTabPane={false}
            type="editable-card"
            onChange={(id) =>
              onChange({
                ...value,
                choosedItemId: id,
              })
            }
            onEdit={(e, action) => {
              if (action === 'add') {
                onAdd();
              } else if (action === 'remove') {
                onRemove(e as string);
              }
            }}
            items={childForms.map((e, idx) => {
              const smallPoint = ((defaultValues || {}) as any).activities?.[
                idx
              ];
              console.log('rrrrrrr:', e.id);
              return {
                id: e.id,
                icon: e.icon,
                key: e.id,
                forceRender: true,
                label: e.label || `子活动${idx + 1}`,
                children: (
                  <EasyPage
                    components={DEFAULT_COMPONENTS}
                    key={e.id}
                    defaultValues={smallPoint}
                    context={childFormContextData}
                    pageType="form"
                    pageId={e.id}
                    onChange={() => onChildFormChanged()}
                    setFormUtil={(ref) => {
                      console.log('set reff', ref.store.pageId);
                      setChildFormRef(ref, ref.store.pageId);
                    }}
                    {...childFormInfo}
                  />
                ),
              };
            })}
          ></Tabs>
        </div>
      );
    },
  },
  {
    childForm: {
      childFormIdPrefix: TAB_PREFIX,
    },
  }
);

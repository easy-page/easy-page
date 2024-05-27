import { PageUtil, nodeUtil } from '@easy-page/antd-ui';
import { Button, Modal } from 'antd';
import { age } from './fields/age';
import { childForm } from './fields/childForm';
import { desc } from './fields/desc';
import { friend } from './fields/friend';
import { hobby } from './fields/hobby';
import { name } from './fields/name';
import { sex } from './fields/sex';
import { myswitch } from './fields/switch';
import { time1, time2 } from './fields/time';
import { goods } from './fields/goods';
const pageUtil = new PageUtil({
  pageId: 'demo1',
});

pageUtil.addFields([
  goods,
  name,
  hobby,
  age,
  sex,
  myswitch,
  time1,
  time2,
  sex,
  desc,
  friend,
  childForm,
  nodeUtil.createCustomNode(
    'submit',
    ({ frameworkProps: { getFormUtil } }) => {
      return (
        <Button
          onClick={() => {
            const formUtil = getFormUtil?.();
            console.log(formUtil?.getFormData());
            console.log(formUtil?.getVisibleData());
          }}
        >
          提交
        </Button>
      );
    },
    {
      value: '',
    }
  ),
  nodeUtil.createCustomNode(
    'validate',
    ({ frameworkProps: { getFormUtil } }) => {
      return (
        <Button
          className="ml-2"
          onClick={async () => {
            const formUtil = getFormUtil?.();
            // const res = await formUtil?.validateAll();
            console.log('data:', formUtil?.getFormData());
          }}
        >
          验证
        </Button>
      );
    },
    {
      value: '',
    }
  ),
]);

export const pageInfo = pageUtil.getPageInfo();
console.log('pageInfo:', pageInfo);

import { PageUtil, nodeUtil } from '@easy-page/antd-ui';
import { Button, Modal } from 'antd';
import { age } from './fields/age';
import { childForm } from './fields/childForm';
import { desc, desc1, desc2 } from './fields/desc';
import { friend } from './fields/friend';
import { hobby } from './fields/hobby';
import { demandName, name } from './fields/name';
import { sex } from './fields/sex';
import { myswitch } from './fields/switch';
import { time1, time2 } from './fields/time';
import { goods } from './fields/goods';
import { childForm1 } from './fields/childForm1';
import { testC } from './fields/testC';
import { check, check2 } from './fields/checkbox';
import { customField } from './fields/custom';
const pageUtil = new PageUtil({
  pageId: 'demo1',
});

pageUtil.addFields([
  demandName,
  sex,
  // desc1(),
  // goods,
  // hobby,
  // age,
  // myswitch,
  // time1,
  // time2,
  // sex,
  // desc,
  // friend,
  // demandName,
  // testC,
  // childForm,
  // childForm1,
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
            try {
              const res = await formUtil?.validateAll();
              console.log('123123123:', res);
            } catch (error) {
              console.log('cccccass:', error);
            }
            // console.log('data:', formUtil?.getFormData());
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

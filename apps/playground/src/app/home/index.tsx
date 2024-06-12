import { useEffect } from 'react';
import { Form, Select } from 'antd';
import { DemoTemplate } from '../components/DemoTemplate';
import { Demo2 } from '../demo2';

export const Home = () => {
  useEffect(() => {
    return () => {
      console.log('unmount home');
    };
  }, []);
  return (
    <div className="flex flex-col">
      <DemoTemplate
        title="开发基础组件"
        scenceDesc="此 Demo 主要用于展示基础的组件如何定义。"
        demo={
          <div className="flex flex-row">
            <Demo2></Demo2>
            {/* <CreateProfile /> */}
          </div>
        }
        demoUrl="https://wwww.baidu.com"
      />
    </div>
  );
};

// <Form initialValues={{ xx: 1 }}>
// <Form.Item
//   name={'xx'}
//   rules={[
//     {
//       validateTrigger: 'onChange',
//       validator(rule, value, callback) {
//         console.log('rrrrrrun:');
//         if (!value) {
//           callback('xxx');
//         } else {
//           callback('');
//         }
//       },
//     },
//   ]}
// >
//   <Select
// options={[
//   { label: '1', value: 1 },
//   { label: '2', value: 2 },
// ]}
//   />
// </Form.Item>
// </Form>;

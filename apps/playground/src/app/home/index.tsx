import { useEffect } from 'react';
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

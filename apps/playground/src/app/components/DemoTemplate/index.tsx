import { GithubOutlined } from '@ant-design/icons';
import { Tag } from 'antd';
import './index.css';
/* eslint-disable @typescript-eslint/no-explicit-any */
export type DemoTemplateProps = {
  /** demo 标题 */
  title: string;

  /** 场景描述 */
  scenceDesc: string;

  /** demo 组件展示 */
  demo: React.ReactNode;

  /** 代码地址 */
  demoUrl: string;
};

const Title = (props: { children: any }) => {
  return <div className="text-xl font-bold mb-4">{props.children}</div>;
};

const SecondTitle = (props: { children: any }) => {
  return <div className="text-lg font-bold pb-4">{props.children}</div>;
};

const Desc = (props: { children: any }) => {
  return <div className="px-2 text-sm">{props.children}</div>;
};

export const DemoTemplate = (props: DemoTemplateProps) => {
  const { title, scenceDesc, demo, demoUrl } = props;
  return (
    <div className="p-4">
      <Title>{title}</Title>
      <div className="mb-4">
        <SecondTitle>场景描述</SecondTitle>
        <Desc>{scenceDesc}</Desc>
      </div>

      <div className="">
        <SecondTitle>演示</SecondTitle>
        <div className="p-8 rounded demo-container">{demo}</div>
        <div className="py-2 text-sm mt-2 rounded">
          <span className="text-[#4D5562]">演示仓库地址:</span>
          <a className="ml-2" href={demoUrl} target="_blank" rel="noreferrer">
            <Tag icon={<GithubOutlined />} color="#55acee">
              {title}
            </Tag>
          </a>
        </div>
      </div>
    </div>
  );
};

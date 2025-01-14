import {
  PageErrorIconEnum,
  PageErrorTitleText,
  getS3Url,
} from '@/common/constants';

export type ErrorPageProps = {
  error: PageErrorIconEnum;
  title?: string;
  desc?: string;
  tips?: string;
};
export const ErrorPage = ({ error, desc, title, tips }: ErrorPageProps) => {
  const titleText = title || PageErrorTitleText[error];
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      <img src={getS3Url(error)} />
      <div className="mt-4 font-medium">{titleText}</div>
      {desc ? <div className="text-sec mt-2">服务端信息：{desc}</div> : <></>}
      {tips ? <div className="text-sec mt-2">{tips}</div> : <></>}
    </div>
  );
};

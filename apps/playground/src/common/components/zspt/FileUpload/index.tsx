import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload, UploadProps } from 'antd';

export type BtnText = {
  uploaded: string;
  unUpload: string;
};
export type FileUploadProps = UploadProps & {
  btnTextConfig: BtnText;
  uploading: boolean;
};
export const FileUpload = (props: FileUploadProps) => {
  const { btnTextConfig, fileList = [], uploading, disabled, ...restProps } = props;
  const btnText =
    fileList?.length > 0 ? btnTextConfig.uploaded : btnTextConfig.unUpload;
  return (
    <Upload fileList={fileList} disabled={disabled} {...restProps}>
      <Button loading={uploading} disabled={disabled} type="primary" icon={<UploadOutlined />}>
        {btnText}
      </Button>
    </Upload>
  );
};

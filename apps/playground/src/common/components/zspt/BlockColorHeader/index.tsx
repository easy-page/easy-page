import React from 'react';
import { Tooltip } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import './index.less';

interface IProps {
  title: string;
  tooltip?: React.ReactNode;
}

export const BlockColorHeader: React.FC<IProps> = (props) => {
  return (
    <div className="block-color-header">
      <span className="block-color-header-title">{props.title}</span>
      {props.tooltip && (
        <Tooltip title={props.tooltip} placement="right">
          <QuestionCircleOutlined />
        </Tooltip>
      )}
    </div>
  );
};

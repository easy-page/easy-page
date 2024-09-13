import React, { FC, useState } from 'react';
import * as RUToolbar from '@radix-ui/react-toolbar';
import { Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import classNames from 'classnames';
import { ChevronDownIcon } from '@radix-ui/react-icons';

type DropdownComProps = {
  icon: React.ReactNode;
  value: string;
  label: string;
};
export const DropdownCom: FC<DropdownComProps> = ({ icon, value, label }) => {
  const [isDropDownShow, setIsDropDownShow] = useState(false);

  const textColorOption: MenuProps['items'] = [
    {
      key: 0,
      label: (
        <div>
          <span className="text-xs">字体颜色</span>
          <div className="flex mt-4px">
            <span className="textColor">A</span>
            <span className="textColor">A</span>
            <span className="textColor">A</span>
            <span className="textColor">A</span>
            <span className="textColor">A</span>
            <span className="textColor">A</span>
            <span className="textColor">A</span>
          </div>
          <span className="text-xs mb-4px">背景颜色</span>
          <div className="flex mt-4px">
            <span className="bgColor transparent"></span>
            {['', '#FBBFBC'].map((item) => {
              return (
                <span
                  className="bgColor"
                  style={{ backgroundColor: item }}
                ></span>
              );
            })}
          </div>
        </div>
      ),
    },
  ];

  return (
    <Dropdown
      menu={{ items: textColorOption }}
      placement="bottomLeft"
      arrow
      onOpenChange={(open: boolean, info: { source: 'trigger' | 'menu' }) => {
        setIsDropDownShow(open);
      }}
    >
      <RUToolbar.ToggleItem
        className="ToolbarToggleItem"
        value={value}
        aria-label={label}
        onClick={() => {
          // toggleLeafStyle(editor, { textDecoration: 'underline', textUnderlineOffset: '0.2em', textDecorationSkipInk: 'none' });
        }}
      >
        <span className="highlightIcon">{icon}</span>
        <ChevronDownIcon
          className={classNames(
            'arrow ml-1',
            isDropDownShow ? 'rotateIcon' : ''
          )}
        />
      </RUToolbar.ToggleItem>
    </Dropdown>
  );
};

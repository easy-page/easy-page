import { PlusOutlined } from '@ant-design/icons';
import { TnElementRef } from '../../../store';
import { getElementInfo } from './utils/getRefInfo';
import { useEffect, useMemo, useState } from 'react';
import { Button, Popover } from 'antd';
import { ElementFloatIcon } from './icons';

export type ElementToolbarProps = {
  className?: string;
  refInfo: TnElementRef | null;
};
export const ElementToolbar = ({ className, refInfo }: ElementToolbarProps) => {
  const elementInfo = useMemo(() => getElementInfo(refInfo), [refInfo]);
  console.log('elementInfoeleme11ntInfo:', elementInfo);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setOpen(false);
  }, [refInfo]);
  if (!elementInfo) {
    return null;
  }
  return (
    <div
      style={{
        position: 'absolute',
        left: elementInfo?.x - 40,
        top: elementInfo?.y - 4,
        opacity: elementInfo ? 1 : 0,
        zIndex: 50,
        transition: 'left 0.1s ease, top 0.1s ease, opacity 0.1s ease',
      }}
    >
      <Popover
        arrow={false}
        open={open}
        placement="left"
        content={<div>123213</div>}
      >
        <Button
          onMouseOver={() => {
            setOpen(true);
          }}
          className={'flex items-center py-1 px-2'}
        >
          {elementInfo.isEmpty ? (
            <PlusOutlined />
          ) : (
            ElementFloatIcon[elementInfo.elementType]
          )}
        </Button>
      </Popover>
    </div>
  );
};

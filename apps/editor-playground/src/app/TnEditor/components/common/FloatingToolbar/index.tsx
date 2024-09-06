'use client';
import * as RUToolbar from '@radix-ui/react-toolbar';
import { flip, offset } from '@floating-ui/core';
import { Tooltip, Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import classNames from 'classnames';
import {
  FontBoldIcon,
  FontItalicIcon,
  StrikethroughIcon,
  TextAlignCenterIcon,
  TextAlignLeftIcon,
  TextAlignRightIcon,
  UnderlineIcon,
  Link2Icon,
  TextIcon,
  ChevronDownIcon,
  CheckIcon,
} from '@radix-ui/react-icons';
import './index.less';
import {
  FloatingToolbarState,
  useFloatingToolbar,
  useFloatingToolbarState,
} from './hooks';
import {
  getDriectRangeDirection,
  RangeDirection,
} from './utils/getRangeDirection';
import { PortalBody } from '../PortalBody';
import React, { useState } from 'react';
import { toggleLeafStyle } from '../../../actions';
import { useComposedRef, useEditorRef } from '../../../hooks';
import { H1 } from '../icons/H1';
import { H2 } from '../icons/H2';
import { H3 } from '../icons/H3';
import { H4 } from '../icons/H4';
import { H5 } from '../icons/H5';
import { H6 } from '../icons/H6';
import { TextAlignMent } from '../icons/TextAlignMent';
import { AlignEnum } from '../../../interface';
import { addBlockProperties } from '../../../slate/transform';
import { Code } from '../icons/Code';

export type BaseFloatingToolbarProps = {
  state?: FloatingToolbarState;
  children?: any;
  editorId: string;
  componentRef?: React.ForwardedRef<HTMLDivElement>;
  className?: string;
};

const titleArr = [
  {
    com: <TextIcon />,
    name: '正文',
  },
  {
    com: <H1 />,
    name: '一级标题',
  },
  {
    com: <H2 />,
    name: '二级标题',
  },
  {
    com: <H3 />,
    name: '三级标题',
  },
  {
    com: <H4 />,
    name: '四级标题',
  },
  {
    com: <H5 />,
    name: '五级标题',
  },
  {
    com: <H6 />,
    name: '六级标题',
  },
];

const titleAlignArr = [
  {
    com: <TextAlignLeftIcon />,
    name: '左对齐',
    id: AlignEnum.Left,
  },
  {
    com: <TextAlignCenterIcon />,
    name: '居中对齐',
    id: AlignEnum.Center,
  },
  {
    com: <TextAlignRightIcon />,
    name: '右对齐',
    id: AlignEnum.Right,
  },
];

const BaseFloatingToolbar = ({
  state,
  children,
  componentRef,
  ...props
}: BaseFloatingToolbarProps) => {
  const rangeDirection = getDriectRangeDirection();
  const floatingToolbarState = useFloatingToolbarState({
    ...state,
    floatingOptions: {
      placement:
        rangeDirection === RangeDirection.BackWardSelection
          ? 'bottom-start'
          : 'top-start',
      middleware: [
        offset(12),
        flip({
          padding: 12,
          fallbackPlacements: [
            'top-start',
            'top-end',
            'bottom-start',
            'bottom-end',
          ],
        }),
      ],
      ...state?.floatingOptions,
    },
  });

  const {
    ref: floatingRef,
    props: rootProps,
    hidden,
  } = useFloatingToolbar(floatingToolbarState);

  const ref = useComposedRef<HTMLDivElement>(componentRef, floatingRef);

  if (hidden) return null;

  return (
    <PortalBody>
      <RUToolbar.Root
        ref={ref}
        {...rootProps}
        {...props}
        onMouseDown={(e) => {
          /** 这个很重要，不阻止的话，就会使得编辑器的 focus 不对 */
          e.preventDefault();
        }}
      >
        {children}
      </RUToolbar.Root>
    </PortalBody>
  );
};

export const FloatingToolbar = React.forwardRef<
  React.ElementRef<typeof RUToolbar.Root>,
  BaseFloatingToolbarProps
>(({ className, editorId, ...props }, componentRef) => {
  const editor = useEditorRef(editorId);
  const [active, setActive] = useState(0);
  const [textAlignActive, setTextAlignActive] = useState(0);

  const items: MenuProps['items'] = titleArr.map((item, index) => {
    return {
      key: index,
      label: (
        <div
          className={classNames(
            'flex items-center',
            active === index ? 'active' : ''
          )}
          onClick={() => {
            setActive(index);
          }}
        >
          {item.com}
          <div className="w-32 ml-4">{item.name}</div>
          {active === index && <CheckIcon />}
        </div>
      ),
    };
  });

  const titleAlignArrItems: MenuProps['items'] = titleAlignArr.map(
    (item, index) => {
      return {
        key: index,
        label: (
          <div
            className={classNames(
              'flex items-center border-black border-1',
              textAlignActive === index ? 'active' : ''
            )}
            onClick={() => {
              setTextAlignActive(index);
              addBlockProperties(editor, { align: item.id });
              setTimeout(() => {
                console.log('editor.children', editor.children);
              });
            }}
          >
            {item.com}
            <div className="w-32 ml-4">{item.name}</div>
            {textAlignActive === index && <CheckIcon />}
          </div>
        ),
      };
    }
  );

  return (
    <BaseFloatingToolbar
      {...props}
      editorId={editorId}
      className={classNames(className, 'absolute z-50 ToolbarRoot')}
      componentRef={componentRef}
    >
      <RUToolbar.ToggleGroup type="multiple" aria-label="Text formatting">
        <Dropdown
          menu={{ items }}
          placement="bottomLeft"
          arrow
          onOpenChange={(
            open: boolean,
            info: { source: 'trigger' | 'menu' }
          ) => {
            console.log('onOpenChange', open);
          }}
        >
          <RUToolbar.ToggleItem
            className="ToolbarToggleItem"
            value="text"
            aria-label="text"
            onClick={() => {
              // toggleLeafStyle(editor, { fontWeight: 600 });
            }}
          >
            {titleArr[active].com}
            <ChevronDownIcon className="arrow ml-1" />
          </RUToolbar.ToggleItem>
        </Dropdown>
      </RUToolbar.ToggleGroup>

      <RUToolbar.Separator className="ToolbarSeparator" />

      <RUToolbar.ToggleGroup type="multiple" aria-label="TextAlign formatting">
        <Dropdown
          menu={{ items: titleAlignArrItems }}
          placement="bottomLeft"
          arrow
          onOpenChange={(
            open: boolean,
            info: { source: 'trigger' | 'menu' }
          ) => {
            console.log('onOpenChange', open);
          }}
        >
          <RUToolbar.ToggleItem
            className="ToolbarToggleItem"
            value="textAlign"
            aria-label="textAlign"
            onClick={() => {
              // toggleLeafStyle(editor, { fontWeight: 600 });
            }}
          >
            <TextAlignMent />
            <ChevronDownIcon className="arrow ml-1" />
          </RUToolbar.ToggleItem>
        </Dropdown>
      </RUToolbar.ToggleGroup>

      <RUToolbar.Separator className="ToolbarSeparator" />

      <RUToolbar.ToggleGroup
        type="single"
        defaultValue="center"
        aria-label="Text alignment"
      >
        <Tooltip title="粗体（⌘ + B）">
          <RUToolbar.ToggleItem
            className="ToolbarToggleItem"
            value="bold"
            aria-label="Bold"
            onClick={() => {
              toggleLeafStyle(editor, { fontWeight: 600 });
            }}
          >
            <FontBoldIcon />
          </RUToolbar.ToggleItem>
        </Tooltip>

        <Tooltip title="删除线（⌘ + Shift + X）">
          <RUToolbar.ToggleItem
            className="ToolbarToggleItem"
            value="deleteline"
            aria-label="删除线"
            onClick={() => {
              toggleLeafStyle(editor, { textDecoration: 'line-through' });
              // toggleProperties(editor, {
              //   url: 'https://www.baidu.com',
              // });
            }}
          >
            <StrikethroughIcon />
          </RUToolbar.ToggleItem>
        </Tooltip>

        <Tooltip title="斜体（⌘ + I）">
          <RUToolbar.ToggleItem
            className="ToolbarToggleItem"
            value="italic"
            aria-label="Italic"
            onClick={() => {
              toggleLeafStyle(editor, { fontStyle: 'italic' });
            }}
          >
            <FontItalicIcon />
          </RUToolbar.ToggleItem>
        </Tooltip>

        <Tooltip title="下划线（⌘ + U）">
          <RUToolbar.ToggleItem
            className="ToolbarToggleItem"
            value="underline"
            aria-label="下划线"
            onClick={() => {
              toggleLeafStyle(editor, {
                textDecoration: 'underline',
                textUnderlineOffset: '0.2em',
                textDecorationSkipInk: 'none',
              });
            }}
          >
            <UnderlineIcon />
          </RUToolbar.ToggleItem>
        </Tooltip>

        <Tooltip title="链接（⌘ + K）">
          <RUToolbar.ToggleItem
            className="ToolbarToggleItem"
            value="link"
            aria-label="链接"
            onClick={() => {
              // toggleLeafStyle(editor, { textDecoration: 'underline', textUnderlineOffset: '0.2em', textDecorationSkipInk: 'none' });
            }}
          >
            <Link2Icon />
          </RUToolbar.ToggleItem>
        </Tooltip>

        <Tooltip title="代码（Ctrl + ⌘ + C）">
          <RUToolbar.ToggleItem
            className="ToolbarToggleItem"
            value="link"
            aria-label="链接"
            onClick={() => {
              // toggleLeafStyle(editor, { textDecoration: 'underline', textUnderlineOffset: '0.2em', textDecorationSkipInk: 'none' });
            }}
          >
            <Code />
          </RUToolbar.ToggleItem>
        </Tooltip>
      </RUToolbar.ToggleGroup>

      <RUToolbar.Separator className="ToolbarSeparator" />

      {/* <RUToolbar.Link
        className="ToolbarLink"
        href="#"
        target="_blank"
        style={{ marginRight: 10 }}
      >
        Edited 2 hours ago
      </RUToolbar.Link> */}
    </BaseFloatingToolbar>
  );
});

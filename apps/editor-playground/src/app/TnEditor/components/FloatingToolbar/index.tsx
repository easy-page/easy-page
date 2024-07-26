'use client';

import * as RUToolbar from '@radix-ui/react-toolbar';

import { flip, offset } from '@floating-ui/core';
import { useComposedRef } from '../../hooks/useComposedRef';
import classNames from 'classnames';

import {
	FontBoldIcon,
	FontItalicIcon,
	StrikethroughIcon,
	TextAlignCenterIcon,
	TextAlignLeftIcon,
	TextAlignRightIcon,
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
import React from 'react';
import { useEditorRef } from '../../hooks';
import { toggleLeafStyle } from '../../actions';
import { toggleProperties } from '../../actions/toggleProperties';

export type BaseFloatingToolbarProps = {
	state?: FloatingToolbarState;
	children?: any;
	editorId: string;
	componentRef?: React.ForwardedRef<HTMLDivElement>;
	className?: string;
};

const BaseFloatingToolbar = ({
	state,
	children,
	componentRef,
	...props
}: BaseFloatingToolbarProps) => {
	const rangeDirection = getDriectRangeDirection();
	console.log('rangeDirection:', rangeDirection);
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

	console.log('rootProps:', rootProps, hidden);

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
	// const editor = useSlate();
	return (
		<BaseFloatingToolbar
			{...props}
			editorId={editorId}
			className={classNames(className, 'absolute z-50 ToolbarRoot')}
			componentRef={componentRef}
		>
			<RUToolbar.ToggleGroup type="multiple" aria-label="Text formatting">
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
				<RUToolbar.ToggleItem
					className="ToolbarToggleItem"
					value="italic"
					aria-label="Italic"
					onClick={() => {
						toggleLeafStyle(editor, { textDecoration: 'line-through' });
					}}
				>
					<FontItalicIcon />
				</RUToolbar.ToggleItem>
				<RUToolbar.ToggleItem
					className="ToolbarToggleItem"
					value="strikethrough"
					aria-label="无序列表"
					onClick={() => {
						toggleProperties(editor, {
							url: 'https://www.baidu.com',
						});

						// toggleType()
					}}
				>
					<StrikethroughIcon />
				</RUToolbar.ToggleItem>
			</RUToolbar.ToggleGroup>
			<RUToolbar.Separator className="ToolbarSeparator" />
			<RUToolbar.ToggleGroup
				type="single"
				defaultValue="center"
				aria-label="Text alignment"
			>
				<RUToolbar.ToggleItem
					className="ToolbarToggleItem"
					value="left"
					aria-label="Left aligned"
				>
					<TextAlignLeftIcon />
				</RUToolbar.ToggleItem>
				<RUToolbar.ToggleItem
					className="ToolbarToggleItem"
					value="center"
					aria-label="Center aligned"
				>
					<TextAlignCenterIcon />
				</RUToolbar.ToggleItem>
				<RUToolbar.ToggleItem
					className="ToolbarToggleItem"
					value="right"
					aria-label="Right aligned"
				>
					<TextAlignRightIcon />
				</RUToolbar.ToggleItem>
			</RUToolbar.ToggleGroup>
			<RUToolbar.Separator className="ToolbarSeparator" />
			<RUToolbar.Link
				className="ToolbarLink"
				href="#"
				target="_blank"
				style={{ marginRight: 10 }}
			>
				Edited 2 hours ago
			</RUToolbar.Link>
			<RUToolbar.Button
				className="ToolbarButton"
				style={{ marginLeft: 'auto' }}
			>
				Share
			</RUToolbar.Button>
		</BaseFloatingToolbar>
	);
});

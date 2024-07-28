import classNames from 'classnames';
import { RenderElementProps } from 'slate-react';

import React from 'react';
import { CustomElement } from '../../../interface';

export type SelectHocProps = {
  renderElementProps: RenderElementProps;
  component: JSX.Element;
};

export const SelectHoc = ({
  component,
  renderElementProps,
}: SelectHocProps) => {
  const { element } = renderElementProps;

  if ((element as CustomElement).selected) {
    console.log('elementelementelement:', component, element);
    return React.cloneElement(component, {
      className: classNames(component.props.className, 'bg-[#D8E0FB] rounded'),
    });
  }
  return component;
};

import { RenderElementProps } from '@easy-page-slate-react';
import { TnElement } from '../../common/TnElement';

export const HeadingElement = (props: RenderElementProps) => {
  const { element } = props;
  const { size = 0 } = element;
  return (
    <TnElement
      wrapperClassName="heading-block-wrapper"
      blockNodeClassName="heading-block"
      nodeChildrenClassName="heading-children ml-4"
      blockNodeStyle={{ fontSize: 20 - size * 2, fontWeight: 700 }}
      {...props}
    ></TnElement>
  );
};

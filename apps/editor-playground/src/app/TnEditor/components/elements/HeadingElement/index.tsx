import { RenderElementProps } from '@easy-page-slate-react';
import { TnElement } from '../../common/TnElement';
import { splitChildren } from '../../../plugins/utils/splitChildren';

export const HeadingElement = (props: RenderElementProps) => {
  const { children, element } = props;
  const { size = 0 } = element;
  const { elementChildren, textChildren } = splitChildren(children);
  return (
    <TnElement {...props}>
      <div className="heading-block-wrapper">
        <div
          className="heading-block"
          style={{ fontSize: 20 - size * 2, fontWeight: 700 }}
        >
          {textChildren}
        </div>
        <div className="heading-children ml-4">{elementChildren}</div>
      </div>
    </TnElement>
  );
};

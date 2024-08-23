import { RenderElementProps } from '@easy-page-slate-react';
import { TnElement } from '../../common/TnElement';
import { splitChildren } from '../../../plugins/utils/splitChildren';

export const TodoElement = (props: RenderElementProps) => {
  const { attributes, children } = props;
  const { elementChildren, textChildren } = splitChildren(children);
  return (
    <TnElement {...props}>
      <div className="text-block-wrapper" {...attributes}>
        <div className="text-block">
          <span>
            <input type="checkbox" />
          </span>
          {textChildren}
        </div>
        <div className="text-children ml-4">{elementChildren}</div>
      </div>
    </TnElement>
  );
};

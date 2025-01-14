import classNames from 'classnames';
import * as React from 'react';

interface DefaultExpandIconProps<RecordType> {
  prefixCls: string;
  onExpand: (record: RecordType, e: React.MouseEvent<HTMLElement>) => void;
  record: RecordType;
  expanded: boolean;
  expandable: boolean;
}

function renderExpandIcon() {
  return function expandIcon<RecordType>({
    prefixCls,
    onExpand,
    record,
    expanded,
    expandable,
  }: DefaultExpandIconProps<RecordType>) {
    const iconPrefix = `${prefixCls}-row-expand-icon`;

    return (
      // <span
      //     className="roo-table-arrow cursor-pointer"
      //     onClick={e => {
      //       onExpand(record, e!);
      //       e.stopPropagation();
      //     }}
      // >
      //     <i
      //         className={`roo-icon roo-icon-chevron-${(expandable && expanded) ? 'down' : 'right'}`}
      //     />
      // </span>
      <button
        type="button"
        onClick={e => {
          onExpand(record, e!);
          e.stopPropagation();
        }}
        className={classNames(iconPrefix, {
          [`${iconPrefix}-spaced`]: !expandable,
          [`${iconPrefix}-expanded`]: expandable && expanded,
          [`${iconPrefix}-collapsed`]: expandable && !expanded,
        })}
        aria-expanded={expanded}
      />
    );
  };
}

export default renderExpandIcon;

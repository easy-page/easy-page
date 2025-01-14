import { Tooltip } from 'antd';

export const DotText = ({
  children,
  line,
  className,
}: {
  children: any;
  line: number;
  className?: string;
}) => {
  return (
    <Tooltip title={children}>
      <div
        className={className}
        style={
          line === 1
            ? {
                textOverflow: 'ellipsis',
                display: 'block',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
              }
            : {
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                overflow: 'hidden',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: line,
              }
        }
      >
        {children}
      </div>
    </Tooltip>
  );
};

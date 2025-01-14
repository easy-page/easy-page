import classNames from 'classnames';

export type SubPanelContentProps = {
  title: string;
  children?: any;
  titleClass?: string;
};

export const SubPanelContent = ({
  title,
  children,
  titleClass,
}: SubPanelContentProps) => {
  return (
    <div className="flex flex-col my-4">
      <div
        className={classNames(
          'font-medium mb-2',
          {
            'text-lg': !titleClass,
          },
          titleClass,
        )}
      >
        {title}
      </div>
      {children}
    </div>
  );
};

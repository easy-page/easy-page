import { nodeUtil } from '@easy-page/antd-ui';
import { CancelOptions, cancel } from './cancel';
import { SubmitOption, submit } from './submit';

export type ToolbarOptions<T> = CancelOptions & SubmitOption<T>;
export function toolbar<T>(
  id: string,
  { cancelHandler, cancelText, submitHandler, submitText }: ToolbarOptions<T>,
) {
  return nodeUtil
    .createContainer(id, ({ children }) => {
      return <div className="flex flex-row justify-end">{children}</div>;
    })
    .appendChildren([
      cancel({ cancelHandler, cancelText }),
      submit({
        submitHandler,
        submitText,
      }),
    ]);
}

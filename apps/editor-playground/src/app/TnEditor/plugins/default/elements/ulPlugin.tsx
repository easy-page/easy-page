import { UlElement } from '../../../components/elements/UlElement';
import { TnEditorRenderPlugin } from '../../interfaces/plugin';

export const UL_ELEMENT = 'ul';

/**
 * - select-none 可以阻止用户选择
 */
export const ulPlugin: TnEditorRenderPlugin = {
  elementType: UL_ELEMENT,
  render: (props) => {
    return <UlElement {...props} />;
  },
  id: 'ul_plugin',
  name: '无需列表-UL插件',
};

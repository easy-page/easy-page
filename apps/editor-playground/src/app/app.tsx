// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.less';
import { TnEditor } from './TnEditor/Editor';
import { CustomElement } from './TnEditor/interface';
import {
  TEXT_ELEMENT,
  textPlugin,
  UL_ELEMENT,
  ulPlugin,
  LI_ELEMENT,
  liPlugin,
  OL_ELEMENT,
  olPlugin,
  CODE_ELEMENT,
  codePlugin,
} from './TnEditor';
import './app.less';

export function App() {
  const initialValue: CustomElement[] = [
    {
      type: 'p',

      children: [
        {
          text: 'xx', // 叶子
        },
      ],
    },
  ];
  return (
    <div className="p-10 w-full h-full flex items-center">
      <TnEditor
        initialValue={initialValue}
        placeholder="请输入"
        elementPlugins={{
          [TEXT_ELEMENT]: textPlugin,
          [UL_ELEMENT]: ulPlugin,
          [LI_ELEMENT]: liPlugin,
          [OL_ELEMENT]: olPlugin,
          [CODE_ELEMENT]: codePlugin,
        }}
        editorId={'editor'}
      />
    </div>
  );
}

export default App;

# EasyPage

> 文档站：https://easy-page.github.io/easy-page-doc/

Make Front-End Development Easier

## 什么是 EasyPage ？

EasyPage 正如其名，含义是：简单的页面。它能让我们的前端页面开发更加简单。

它提供了一套描述式的 API，来帮助你高效地开发用户界面。无论是简单还是复杂的界面，EasyPage 都可以胜任。

下面是一个最基本的示例，创建一个姓名的表单：

```tsx
// ./name.tsx
import { nodeUtil } from '@easy-page/antd-ui';

export const name = nodeUtil.createField('name', '姓名', {
  value: '',
  required: true,
});
```

> 详细 Demo，可参考文档站中介绍。

上面的字段定义，展示了 EasyPage 的两个特性：

- 简洁性
  - 我想用任何的写法去描述一个姓名字段，都会比上面更长。
  - 随着场景的复杂，EasyPage 的简介优势则更加明显。
- 描述性
  - 基于描述，与 UI ”解耦“，底层可做更多适配（antd、acro 等 UI），为业务逻辑的复用性提供了更多的想象空间。

你可能已经有了些疑问——先别急，在后续的文档中我们会详细介绍每一个细节。现在，请继续看下去，以确保你对 EasyPage 作为一个框架到底提供了什么有一个宏观的了解。

## EasyPage 能做什么？

- 它可以用于开发**表单页面**，也可直接用于开发**前端页面**。
- 它可以帮我们做页面**状态管理**，再也不用手动在组件间各种透传 Props。
- 它可以帮我们做页面的**精确渲染**，再也不用为因为状态变化，导致刷新过多，降低页面性能而烦恼。
- 它可以帮我们监听页面内任意状态变化，并执行相关**副作用处理**，去改变组件的：值、组件 Props、选项、显隐状态等。
- 它可以帮我们更好的**复用逻辑**，减少代码中大量的 if else 判断以及相互影响。
- 它可以帮助我们解决复杂的业务场景难题，如：**父子表单**多层嵌套内外联动、**数组表单增删**等。

:::info

> - 在后续的文档中，我们将一一见识到上述好处。
>   :::

## EasyPage 的优势是什么？

### 简洁性

上述示例可以初步看到其简洁性，下面我们描述如下复杂逻辑，再看其简洁性。

- 新建一个性别字段，两个选项：男、女
- 当选中“男”时，出现字段：喜欢看的书（输入框）
- 当选中“女”时，不出现任何内容。

```tsx
/** 选项 **/
const manOption = nodeUtil.createNode('man', { name: '男' });
const womenOption = nodeUtil.createNode('female', { name: '女' });

/** 字段 **/
const sexField = nodeUtil.createField('sex', '性别', { value: '', mode: 'single' });

/** 子表单字段 **/
const hobby = nodeUtil.createField('like', '喜欢看的书', { value: '' });

export const sex = sexField.appendChildren([manOption.appendChildren([hobby]), womenOption]);
```

非常轻松就描述出了一个复杂的联动效果。

> - 若此场景有更简洁的写法，请在 Github 下评论。

### 高内聚、低耦合

**你可以想象到的关于字段的一切，都可以在自身定义中，完整独立逻辑闭环。**

以下还是以表单元素为一个实际的例子，来展示上述特点：

- 新建一个年龄字段，以输入框展示，必填。

```tsx
import { Empty, InputEffectedType, nodeUtil } from '@easy-page/antd-ui';
import React from 'react';

export const age = nodeUtil.createField<string, { name: string }, Empty, InputEffectedType>('age', '年龄', {
  /** 默认值 */
  value: '',
  /** 必填 * 号 */
  required: true,
});
```

- 【联动属性】基于姓名字段，来展示 placeholder: `${name} 的年龄`

```tsx
      import { Empty, InputEffectedType, nodeUtil } from '@easy-page/antd-ui';
      import React from 'react';

      export const age = nodeUtil.createField<string,{ name: string },Empty,InputEffectedType>(
        'age',
        '年龄',
        {
          ...,
          actions: [
            {
              effectedKeys: ['name'],
              /** 加载时，立即执行 */
              initRun: true,
              action: ({ effectedData }) => {
                return {
                  effectResult: {
                    inputProps: {
                      placeholder: `${effectedData.name || '-'} 的年龄`,
                    },
                  },
                };
              },
            },
          ],
      );

```

- 【联动显隐】当 `姓名=a` 时，隐藏年龄

```tsx
    import { Empty, InputEffectedType, nodeUtil } from '@easy-page/antd-ui';
    import React from 'react';

    export const age = nodeUtil.createField<string,{ name: string },Empty,InputEffectedType>(
      'age',
      '年龄',
      {
      ...,
        /** 字段显示与隐藏 */
        when: {
          effectedKeys: ['name'],
          show({ effectedData }) {
            return effectedData.name !== 'a';
          },
        },
      },
      {
        ...
      }
    );

```

- 【联动提示】当 `age < 10` 时，提示：儿童

```tsx
  import { Empty, InputEffectedType, nodeUtil } from '@easy-page/antd-ui';
  import React from 'react';

  export const age = nodeUtil.createField<string,{ name: string },Empty,InputEffectedType>(
    'age',
    '年龄',
    {
      ...
    },
    {
      /** 输入框配置 */
      input: { trigger: 'onChange' },
      /** FormItem 配置 */
      formItem: {
        /** 自定义提示语：带上下文 */
        customExtra: ({ value }) => {
          return <div>{value && +value < 10 ? '儿童' : ''}</div>;
        },
      },
    }
  );
```

- 【提交时，数据处理】将数据处理成数字

```tsx
  import { Empty, InputEffectedType, nodeUtil } from '@easy-page/antd-ui';
  import React from 'react';

  export const age = nodeUtil.createField<string,{ name: string },Empty,InputEffectedType>(
    'age',
    '年龄',
    {
      ...,
      /** 数据预处理 */
      postprocess(context) {
        return {
          age: Number(context.value),
        };
      },
      ...
    },
    {
      ...
    }
  );
```

- 【联动校验】当 `age < 0 || age > 200` 时，提示：请输入合法年龄；当 `姓名=pk` 时，age > 200 合法；当姓名变化时，触发 age 校验。

```tsx
  import { Empty, InputEffectedType, nodeUtil } from '@easy-page/antd-ui';
  import React from 'react';

  export const age = nodeUtil.createField<string,{ name: string },Empty,InputEffectedType>(
    'age',
    '年龄',
    {
      ...,
      /** 字段验证 */
      validate({ value, pageState }) {
        if (!value) {
          return { success: false, errorMsg: '请输入年龄' };
        }
        if (+value < 0 || (+value > 200 && pageState.name !== 'pk')) {
          return { success: false, errorMsg: '请输入合法年龄' };
        }
        return { success: true };
      },

    },
    {
      ...
      },
    }
  );
```

从上可见，上述字段逻辑比较复杂，依赖 `name` 的填写，做相关联动，但从头到尾，并没有去其他地方做任何事情，自身就可以把逻辑完全描述。
充分可见其：**高内聚、低耦合**特点。

> - 表单元素往往逻辑最重，联动最多。
> - 若此场景有更简洁的写法，请在 Github 下评论。

### 复用性

对于组件复用，相信大家都不陌生，在这种场景下，我们可以抽离公共组件：

- 梳理抽象业务逻辑、定义组件接口

但随着业务的愈发复杂，我们发现：

- 【抽象难】组件很难抽象的很完美，几乎都会有不满足的情况。
- 【场景复杂】组件内渐渐基于业务场景，逐步增多的 if else。
- 【耦合】牵一发而动全身，有时改了某个组件，却影响了其他页面逻辑。

这种现象和问题在表单里体现的更加淋漓尽致。JAVA 面向对象思想中，提出了：继承的概念来解决复用性问题，但在前端 hooks 的写法下，很难实践。也造成了现在的困扰。

但，EasyPage 提出了针对这一场景的解决方案，以下还是承接上面的例子，来展示其复用性。

- 继承 age 的属性，定义一个 newAge 字段，变化如下：
  - 字段名改为：我的年龄
  - 字段改为：非必填
  - 字段校验：允许为空
  - 字段显示：任何时候都展示
  - 字段增加 Tooltip 提示：这是新的年龄

```tsx
import { nodeUtil } from '@easy-page/antd-ui';
import { age } from './age';

export const newAge = nodeUtil.extends(age, {
  name: '我的年龄',
  required: false,
  validate(oldValidate) {
    return (options) => {
      if (!options.value) {
        return { success: true };
      }
      return oldValidate?.(options);
    };
  },
  when(oldWhen) {
    return {
      effectedKeys: oldWhen?.effectedKeys || [],
      show(context) {
        return true;
      },
    };
  },
  fieldUIConfig: (oldConfig) => {
    const newConfig = { ...(oldConfig || {}) };
    newConfig.formItem = newConfig.formItem || {};
    newConfig.formItem.tooltip = '这是新的年龄';
    return newConfig;
  },
});
```

可以看到，上述年龄字段继承了原来的所有逻辑，并进行了修改和更新，并和原来的代码无任何冲突和交集，也无需做任何的抽象处理。

### 扩展性

扩展性主要是从开发角度来描述，如何更灵活的应对各种场景。

首先，我们想创建一个输入框字段：

```tsx
import { nodeUtil } from '@easy-page/antd-ui';

export const name = nodeUtil.createField('name', '姓名', {
  value: '',
  required: true,
});
```

一般创建的默认组件：

- 输入型，默认：输入框组件
- 选择型，默认：单选-RadioGroup、多选-CheckBoxGroup

其余，靠指定组件，如：写一个描述字段：

```tsx
export const desc = nodeUtil.createField(
  'desc',
  '介绍',
  {
    value: '',
  },
  {
    /** 指定 TextArea 组件 **/
    ui: UI_COMPONENTS.TEXTAREA,
  }
);
```

> - `@easy-page/antd-ui` 包里的组件即目前所支持的组件。

如果默认的组件，还无法满足要求。此时，有两种方式：

- 采用自定义节点完成
  ```tsx
  export const desc1 = nodeUtil.createCustomField(
    'desc',
    '介绍',
    ({ value, onChange }) => {
      /** 自定义输入框组件 */
      return <Input value={value} onChange={onChange} />;
    },
    {
      value: '',
    }
  );
  ```
- 详见文档站。

我们除了可以：扩展一个通用组件外，可能还因为不同的公司，要求的基础组件库不一样，如：

- 在字节可能是 arco、在阿里可能是 antd

我们可以参考：`@easy-page/antd-ui` 扩展一个自己的组件库，扩展成本大概在 1 - 2 天左右。

> - 在框架的设计上，预留了支持 vue 的可能
> - 除了编写页面外，做 cli 的问题列表开发，也可以扩展

## EasyPage 和 Formily

### 相同点

- 都是基于 Schema 描述 + 解析引擎模式渲染页面
- 都能做到精确渲染

### 差异

- **面向场景不同**
  - 我们不单单解决**表单**开发的问题，更解决**前端页面**开发的问题。
- **Schema 设计不同**
  - Formily 最初设计更倾向于用 Schema 描述一切，Schema 比较庞大，只能是 JSON 模式，而非 JS。
  - EasyPage 只描述数据和数据之间的关系，Schema + UIConfig，数据和 UI 信息分离，Schema 比较简洁，是 JS 协议，非纯粹 JSON Schema。
- **解决研发提效思路不同**
  - Formily 更倾向于通过：Schema 描述（拖拉拽等方式）减少基础代码开发量，提升开发效率。
  - 我们则是倾向于建立研发标准，减少代码量，在具有非常好的**可维护性**同时，提升研发效率。
- **使用方式不同**
  - Formily 可以通过：拖拉拽、组件描述、schema 描述等多种方式来开发页面。
  - EasyPage 通过轻量的 API，来开发页面。（后续会支持更赞的方式，埋一个彩蛋！）

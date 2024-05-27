import React from 'react';

export class MyComponent extends React.Component<{ pageId: string }> {
  constructor(props: any) {
    super(props);
    console.log('pppp:', props.pageId);
  }
  render() {
    const { pageId } = this.props as any;

    return (
      <div>
        <h1>Page ID: {pageId}</h1>
        {/* 其他组件内容 */}
      </div>
    );
  }
}

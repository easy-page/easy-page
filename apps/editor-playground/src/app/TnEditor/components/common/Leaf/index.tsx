import { RenderLeafProps } from 'slate-react';

export const Leaf = (props: RenderLeafProps) => {
  const { text, ...styles } = props.leaf;
  return (
    <>
      <span {...props.attributes} style={styles}>
        {props.children || '\u2060'}
      </span>
      {/* <span data-string="true" data-enter="true" data-leaf="true">
        &#8203;
      </span> */}
    </>
  );
};

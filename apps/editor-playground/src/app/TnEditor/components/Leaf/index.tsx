import { RenderLeafProps } from 'slate-react';

export const Leaf = (props: RenderLeafProps) => {
  const { text, ...styles } = props.leaf;
  return (
    <span {...props.attributes} style={styles}>
      {props.children}
    </span>
  );
};

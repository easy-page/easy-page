import React from 'react';

export const RED_TEXT_COLOR = '#FF4A47';

export const getRedText = (text: string) => {
  return `<font color="${RED_TEXT_COLOR}">${text}</font>`;
};

export const RedText: React.FC = ({ children }: { children: any }) => (
  <span
    style={{
      color: RED_TEXT_COLOR,
    }}
  >
    {children}
  </span>
);

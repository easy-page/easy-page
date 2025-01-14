import { ReactElement } from 'react';
import { unmount as reactUnmount, render } from './render';

export function renderToBody(element: ReactElement, customContainer?: HTMLDivElement) {
  const container = customContainer || document.createElement('div');
  document.body.appendChild(container);
  function unmount() {
    const unmountResult = reactUnmount(container);
    if (unmountResult && container.parentNode) {
      container.parentNode.removeChild(container);
    }
  }
  render(element, container);
  return unmount;
}

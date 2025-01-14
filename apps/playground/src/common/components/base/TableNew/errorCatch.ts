export function errorCatch() {
    window.addEventListener('error', (e) => {
        // Ignore ResizeObserver error
        if (e.message && e.message.indexOf('ResizeObserver loop') > -1) {
          e.stopPropagation();
          e.stopImmediatePropagation();
        }
    });
}

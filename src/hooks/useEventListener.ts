import { onUnmounted } from "vue";
// 页面事件监听
export function useEventListener(event:keyof WindowEventMap,listener:(this: Window, ev: Event) => any) {
    const start = () => {
      window.addEventListener(event, listener);
    };
  
    const stop = () => {
      window.removeEventListener(event, listener);
    };
    start()
    onUnmounted(() => {
      stop();
    });
    return {stop};
}
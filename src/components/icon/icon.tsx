import { h, defineComponent } from "vue";
import { Icon } from '@iconify/vue';
export default defineComponent({
  // name: "IconifyIcon",
  props: {
    icon: {
      type: String,
      default: ""
    }
  },
  render() {
    const attrs = this.$attrs;
    return h(
      Icon,
      {
        icon: `${this.icon}`,
        style: attrs?.style
          ? Object.assign(attrs.style as unknown as any, { outline: "none" })
          : { outline: "none" },
        ...attrs
      },
      {
        default: () => []
      }
    );
  }
});

<template>
  <Transition
    @after-leave="onClose"
    enter-active-class="animate__animated animate__fadeInUp"
    leave-active-class="animate__animated animate__fadeOutUp"
  >
    <div
      :id="id"
      class="message"
      :style="{ top: top + 'px' }"
      v-show="visibled"
    >
      <v-alert
        class="alert"
        outlined
        :type="type"
        max-width="300"
        variant="tonal"
      >
       {{ message }}
      </v-alert>
    </div>
  </Transition>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, ref } from 'vue'
import { useTimeoutFn } from '@vueuse/core'
import 'animate.css'

export default defineComponent({
  name: 'message',
  props: {
    id: String,
    type: {
      validator: (value: string) => {
        return ['success', 'warning', 'error', 'info'].includes(value)
      },
      default: 'info',
      type: String as PropType<'error' | 'success' | 'warning' | 'info'>,
    },
    top: {
      type: Number,
      default: 56,
    },
    message: {
      type: String,
      default: '',
    },
    duration: {
      type: Number,
      default: 3000,
    },
    onClose: {
      type: Function,
      default: () => {},
    },
  },
  setup(props) {
    const visibled = ref(false)

    let stopTimer: (() => void) | undefined = undefined

    // 开启定时器
    const startTimer = () => {
      if (props.duration > 0) {
        ;({ stop: stopTimer } = useTimeoutFn(() => {
          if (visibled.value) close() // 取消展示
        }, props.duration))
      }
    }

    const clearTimer = () => {
      stopTimer?.()
    }

    // 为了重新开始计时
    const reTime = () => {
      clearTimer()
      startTimer()
    }

    const close = () => {
      visibled.value = false
    }

    onMounted(() => {
      startTimer()
      visibled.value = true
    })

    return {
      visibled,
      close,
      reTime,
    }
  },
})
</script>

<style scoped lang="scss">
.message {
  position: fixed;
  pointer-events: none;
  left: 0;
  right: 0;
  z-index: 9999;
  transition: top 0.7s linear;

  .alert {
    margin: auto;
  }
}
</style>

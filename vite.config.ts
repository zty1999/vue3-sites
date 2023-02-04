import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite';
import { resolve } from 'path';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // 自动注册components目录下的组件
    Components({
      dirs: ['src/components', 'src/**/components'], // 用于搜索组件的目录的相对路径 默认只搜索src/components/ 下的组件
      // dts: resolve(pathSrc, 'components.d.ts'),
      resolvers: [ ]
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '#': resolve(__dirname, './src/types'),
      // 解决警告You are running the esm-bundler build of vue-i18n.
      'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js'
    }
  },
})

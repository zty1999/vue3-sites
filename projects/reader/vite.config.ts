import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import styleImport from 'vite-plugin-style-import';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
		vue(),
		styleImport({
      libs: [
        {
          libraryName: 'vant',
          esModule: true,
          resolveStyle: (name) => resolve(__dirname, `node_modules/vant/es/${name}/style`),
        },
      ],
    }),],
  resolve: {
		alias: {
			// '@': resolve('src'),
			// "comps": resolve('src/components'),
			// "apis": resolve('src/apis'),
			// "views": resolve('src/views'),
			// "utils": resolve('src/utils'),
			// "routes": resolve('src/routes'),
			// "styles": resolve('src/styles'),
			// "reader": resolve('src/apps/reader')
		}
	},
	// server: {
	// 	//服务器主机名
	// 	host: 'http://106.55.30.242',
	// 	//端口号
	// 	port: 7337,
	// 	//设为 true 时若端口已被占用则会直接退出，而不是尝试下一个可用端口
	// 	strictPort: false,
	// 	//服务器启动时自动在浏览器中打开应用程序,当此值为字符串时，会被用作 URL 的路径名
	// 	open: false,
	// 	//自定义代理规则
	// 	proxy: {
	// 		// 选项写法
	// 		'/parse': {
	// 			target: 'http://106.55.30.242',
	// 			changeOrigin: true,
	// 			rewrite: path => path.replace(/^\/parse/, '')
	// 		}
	// 	}
	// },
	// Parse.initialize("spark");
// (Parse.masterKey as any) = 'mulean666';
// (Parse.javaScriptKey as any) = 'mulean666';
// (Parse as any).serverURL = "http://106.55.30.242/parse";
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        reader: resolve(__dirname, 'src/apps/reader/index.html')
      }
    }
  },
	
})

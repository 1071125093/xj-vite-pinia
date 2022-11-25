/*
 * @Author: XiaoJun
 * @Date: 2022-07-07 17:25:21
 * @LastEditors: XiaoJun
 * @LastEditTime: 2022-11-23 16:08:45
 * @Description: 组件功能
 * @FilePath: /xj-vite-pinia/vite.config.ts
 */
// import { defineConfig } from 'vite'
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import DefineOptions from 'unplugin-vue-define-options/vite'
import path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
export default ({ mode }) => {
  return defineConfig({
    plugins: [
      vue({
        reactivityTransform: true,
      }),
      DefineOptions(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
        imports: [
          'vue',
          // 'vue-i18n', '@vueuse/head',
        ],
        //需要按需自动引入的依赖包
        dts: 'src/auto-import.d.ts',
        //选择auto-import.d.ts生成的位置'
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    server: {
      host: true,
      port: 10086,
      // open: true,
      https: false,
      cors: true,
      proxy: {
        // '/api': {
        //   target: 'http://192.168.217.68:8080',
        //   changeOrigin: true,
        //   rewrite: (path) => {
        //     return path.replace(/^\/api/, '123123')
        //   },
        // },
        '/api': {
          target: 'http://127.0.0.1:8080/',
          changeOrigin: false,
          rewrite: (path) => path.replace(/^\/api/, '/05'),
        },
        '^/fallback/.*': {
          target: 'http://jsonplaceholder.typicode.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/fallback/, ''),
        },
      },
    },
    css: {
      // css预处理器
      preprocessorOptions: {
        less: {
          charset: false,
          additionalData: '@import "@/assets/less/global.less";',
        },
      },
    },
    test: {
      // 启用类似 jest 的全局测试 API
      globals: true,
      // 使用 happy-dom 模拟 DOM
      // 这需要你安装 happy-dom 作为对等依赖（peer dependency）
      environment: 'happy-dom',
    },
  })
}

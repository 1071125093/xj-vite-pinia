/*
 * @Author: XiaoJun
 * @Date: 2022-07-07 17:25:21
 * @LastEditors: XiaoJun
 * @LastEditTime: 2022-09-22 18:00:23
 * @Description: 组件功能
 * @FilePath: /xj-vite-pinia/vite.config.ts
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import DefineOptions from 'unplugin-vue-define-options/vite'
import path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// https://vitejs.dev/config/
export default ({ mode }) => {
  return defineConfig({
    plugins: [
      vue(),
      DefineOptions(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
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
  })
}

/*
 * @Author: XiaoJun
 * @Date: 2022-07-07 17:25:21
 * @LastEditors: XiaoJun
 * @LastEditTime: 2022-08-10 11:19:09
 * @Description: 组件功能
 * @FilePath: /xj-vite-pinia/vite.config.ts
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
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
    host: '0.0.0.0',
    port: 9909,
    open: true,
    https: false,
    cors: true,
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

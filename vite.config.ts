/*
 * @Author: XiaoJun
 * @Date: 2022-07-07 17:25:21
 * @LastEditors: XiaoJun
 * @LastEditTime: 2023-04-10 17:51:02
 * @Description: 组件功能
 * @FilePath: /xj-vite-pinia/vite.config.ts
 */
// import { defineConfig } from 'vite'
import { defineConfig } from 'vitest/config'
// import Macros from 'unplugin-vue-macros'
// import VueMacros from 'unplugin-vue-macros/vite'
import Vue from '@vitejs/plugin-vue'
// import DefineOptions from 'unplugin-vue-define-options/vite'
import path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver, NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import resolveExternalsPlugin from 'vite-plugin-resolve-externals'
import { visualizer } from 'rollup-plugin-visualizer'
export default ({ mode }) => {
  return defineConfig({
    plugins: [
      Vue(),
      visualizer({
        emitFile: false,
        gzipSize: true,
        filename: 'report.html', //分析图生成的文件名
        open: true //如果存在本地服务端口，将在打包后自动展示
      }),
      // Macros.vite({
      //   plugins: {
      //     vue: Vue(),
      //     // vueJsx: VueJsx(), // 如果需要
      //   },
      // }),
      // vue({
      //   reactivityTransform: true,
      // }),
      // DefineOptions(),
      resolveExternalsPlugin({
        AMap: 'AMap'
      }),
      AutoImport({
        imports: [
          'vue',
          '@vueuse/core'
          // 'vue-i18n', ,
        ],
        //需要按需自动引入的依赖包
        dts: 'src/auto-import.d.ts'
        //选择auto-import.d.ts生成的位置'
      }),
      Components({
        resolvers: [ElementPlusResolver(), NaiveUiResolver()]
      })
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
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
        '/xjApi': {
          target: 'http://192.168.217.68:99',
          changeOrigin: false,
          rewrite: (path) => path.replace(/^\/xjApi/, '')
        },
        '^/fallback/.*': {
          target: 'http://jsonplaceholder.typicode.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/fallback/, '')
        }
      }
    },
    css: {
      // css预处理器
      preprocessorOptions: {
        less: {
          charset: false,
          additionalData: '@import "@/assets/less/global.less";'
        }
      }
    },
    test: {
      // 启用类似 jest 的全局测试 API
      globals: true,
      // 使用 happy-dom 模拟 DOM
      // 这需要你安装 happy-dom 作为对等依赖（peer dependency）
      environment: 'happy-dom'
    },
    build: {
      outDir: 'xjDist', //输出目录名
      minify: 'terser', //压缩方式
      terserOptions: {
        compress: {
          drop_console: true, //剔除console,和debugger
          drop_debugger: true
        }
      },
      // chunkSizeWarningLimit: 1500,大文件报警阈值设置,不建议使用
      rollupOptions: {
        output: {
          //静态资源分类打包
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
          manualChunks(id) {
            //静态资源分拆打包
            if (id.includes('node_modules')) {
              return id.toString().split('node_modules/')[1].split('/')[0].toString()
            }
          }
        }
      }
    }
  })
}

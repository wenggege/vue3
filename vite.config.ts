import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  console.log(env.VITE_BASE_URL)

  return {
    plugins: [
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      })
    ],
    resolve: {
      // 配置别名
      alias: {
        '@': resolve(__dirname, 'src')
      }
    },
    server: {
      port: 8089,
      open: true,
      hmr: true, // 启用热更新
      proxy: {
        '/Api': {
          target: env.VITE_BASE_URL_REPLAY,
          changeOrigin: true,
          ws: true,
          rewrite: (path) => path.replace(/^\/Api/, '')
        },
        '/common': {
          target: env.VITE_BASE_URL,
          changeOrigin: true,
          ws: true,
          rewrite: (path) => path.replace(/^\/common/, '')
        },
        '/api': {
          target: env.VITE_BASE_URL_API,
          changeOrigin: true,
          ws: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        },
        '/test': {
          target: env.VITE_BASE_URL_TEST,
          changeOrigin: true,
          ws: true,
          rewrite: (path) => path.replace(/^\/test/, '')
        },
        '/config': {
          target: env.VITE_BASE_URL_CONFIG,
          changeOrigin: true,
          ws: true,
          rewrite: (path) => path.replace(/^\/config/, '')
        },
      }
    },
    build: {
      outDir: 'dist',
      sourcemap: false,
      chunkSizeWarningLimit: 1500,
      rollupOptions: {
        output: {
          entryFileNames: `assets/[name].${new Date().getTime()}.js`,
          chunkFileNames: `assets/[name].${new Date().getTime()}.js`,
          assetFileNames: `assets/[name].${new Date().getTime()}.[ext]`,
          compact: true,
          manualChunks: {
            vue: ['vue', 'vue-router', 'pinia']
          }
        }
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/common/styles/index.scss" as *;`
        }
      }
    }
  }
})

import { loadEnv } from 'vite';
import { viteMockServe } from 'vite-plugin-mock';
import { createVuePlugin } from 'vite-plugin-vue2';
import { createSvgPlugin } from 'vite-plugin-vue2-svg';

import path from 'path';

const CWD = process.cwd();

export default ({ mode }) => {
  const { VITE_BASE_URL } = loadEnv(mode, CWD);

  return {
    base: VITE_BASE_URL,
    resolve: {
      alias: {
        '~': path.resolve(__dirname, './'),
        '@': path.resolve(__dirname, './src'),
      },
    },

    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {
            // 如需自定义组件其他 token, 在此处配置
          },
        },
      },
    },

    plugins: [
      createVuePlugin({
        jsx: true,
      }),
      viteMockServe({
        mockPath: 'mock',
        localEnabled: true,
      }),
      createSvgPlugin(),
    ],
    // cssCodeSplit: false,

    build: {
      sourcemap: false,
      minify: 'terser',
      chunkSizeWarningLimit: 1500,
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      },
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return id
                .toString()
                .split('node_modules/')[1]
                .split('/')[0]
                .toString();
            }
          },
          chunkFileNames: (chunkInfo) => {
            const facadeModuleId = chunkInfo.facadeModuleId
              ? chunkInfo.facadeModuleId.split('/')
              : [];
            const fileName =
              facadeModuleId[facadeModuleId.length - 2] || '[name]';
            return `js/${fileName}/[name].[hash].js`;
          }
        }
      }
    },

    server: {
      host: '0.0.0.0',
      port: 3001,
      proxy: {
        '/web': {
          // 用于开发环境下的转发请求
          // 更多请参考：https://vitejs.dev/config/#server-proxy
          target: 'ws://10.18.220.188:5518',
          changeOrigin: true,
          rewrite:(path) => path.replace(/^\/web/,'')
        },
      },
    },
  };
};

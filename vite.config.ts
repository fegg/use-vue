import { defineConfig } from 'vite'
import path from 'path';

/**
 * @type {import('vite').UserConfig}
 */
export default defineConfig({
  optimizeDeps: {
    include: [
      'lodash',
    ],
    exclude: ['vue-demi'],
  },
  build: {
    minify: true,
    lib: {
      entry: path.resolve('./src/index.ts'),
      name: 'use-vue',
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue-demi'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
});

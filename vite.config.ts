import { defineConfig, loadEnv, Plugin } from 'vite'
import react from '@vitejs/plugin-react'

const bufferPolyfillPlugin = (): Plugin => {
  return {
    name: 'buffer-polyfill',
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        return html.replace(
          '<head>',
          `<head>
    <script>
      (function() {
        // Simple polyfill for Buffer before any modules load
        var bufferExports = {};
        var Buffer = (function() {
          function Buffer(arg, encodingOrOffset, length) {
            if (typeof arg === 'number') {
              return new Uint8Array(arg);
            }
            if (typeof arg === 'string') {
              return new TextEncoder().encode(arg);
            }
            return new Uint8Array(arg, encodingOrOffset, length);
          }
          Buffer.from = function(value, encodingOrOffset, length) {
            if (typeof value === 'string') {
              return new TextEncoder().encode(value);
            }
            if (value instanceof ArrayBuffer || value instanceof Uint8Array) {
              return new Uint8Array(value, encodingOrOffset, length);
            }
            if (Array.isArray(value)) {
              return new Uint8Array(value);
            }
            return new Uint8Array(value);
          };
          Buffer.alloc = function(size) {
            return new Uint8Array(size);
          };
          Buffer.allocUnsafe = function(size) {
            return new Uint8Array(size);
          };
          return Buffer;
        })();

        window.Buffer = Buffer;
        globalThis.Buffer = Buffer;
        window.global = window;
        if (!globalThis.process) {
          globalThis.process = { env: {} };
        }
      })();
    </script>`
        )
      }
    }
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    base: '/Coinvoy/', // Added for GitHub Pages deployment
    plugins: [bufferPolyfillPlugin(), react()],
    server: {
      hmr: {
        overlay: false
      }
    },
    define: {
      'import.meta.env.VITE_SUPABASE_URL': JSON.stringify(env.VITE_SUPABASE_URL),
      'import.meta.env.VITE_SUPABASE_ANON_KEY': JSON.stringify(env.VITE_SUPABASE_ANON_KEY),
      'global': 'globalThis'
    },
    resolve: {
      alias: {
        buffer: 'buffer',
        process: 'process/browser'
      }
    },
    optimizeDeps: {
      esbuildOptions: {
        define: {
          global: 'globalThis'
        }
      },
      include: ['buffer']
    }
  }
})

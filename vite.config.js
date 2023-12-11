// vite.config.js
import { resolve } from 'path'
import { defineConfig, loadEnv } from 'vite'
import manifest from './scripts/manifest.js'

export default ({ mode }) => {
    process.env = {...process.env, ...loadEnv(mode, process.cwd())};
    return defineConfig({
        optimizeDeps: { force: true },
        plugins: [
            {
                name: 'build-manifest',
                async buildStart() {
                    manifest();
                },
            },
        ],
        build: {
            minify: false,
            lib: {
                entry: resolve(__dirname, './src/main.ts'),
                name: 'lookerstudio-vite-starter',
                fileName: 'main',
            },
        },
    })
}
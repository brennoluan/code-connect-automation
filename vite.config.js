import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    test: {
        environment: 'jsdom',
        setupFiles: './src/tests/setup.js',
        globals: true,
        coverage: {
            provider: 'v8',
            thresholds: {
                global: {
                    statements: 60,
                    branches: 60,
                    functions: 60,
                    lines: 60,
                },
                exclude: ['node_modules', 'src/tests', 'cypress'],
            },
        },
    },
})

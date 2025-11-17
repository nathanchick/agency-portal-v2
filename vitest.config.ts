import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

export default defineConfig({
    plugins: [react()],
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: ['./resources/js/tests/setup.ts'],
        css: true,
        coverage: {
            provider: 'v8',
            reporter: ['text', 'json', 'html'],
            exclude: [
                'node_modules/',
                'resources/js/tests/',
                '**/*.d.ts',
                '**/*.config.*',
                '**/mockData',
                '**/*.test.{ts,tsx}',
            ],
        },
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, './resources/js'),
            'ziggy-js': resolve(__dirname, './vendor/tightenco/ziggy'),
        },
    },
});

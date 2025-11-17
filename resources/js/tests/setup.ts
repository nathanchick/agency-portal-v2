import '@testing-library/jest-dom';
import { expect, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

// Cleanup after each test case
afterEach(() => {
    cleanup();
});

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
    })),
});

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
    constructor() {}
    disconnect() {}
    observe() {}
    takeRecords() {
        return [];
    }
    unobserve() {}
} as any;

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
    constructor() {}
    disconnect() {}
    observe() {}
    unobserve() {}
} as any;

// Mock route function from ziggy-js
global.route = vi.fn((name: string, params?: any) => {
    const routes: Record<string, string> = {
        'dashboard.widgets.index': '/dashboard/widgets',
        'dashboard.widgets.save': '/dashboard/widgets/save',
        'dashboard.widgets.reset': '/dashboard/widgets/reset',
        'dashboard.widgets.toggle': '/dashboard/widgets/:key/toggle',
        'tickets.show': '/tickets/:id',
    };
    let url = routes[name] || `/${name}`;
    if (params) {
        Object.keys(params).forEach((key) => {
            url = url.replace(`:${key}`, params[key]);
        });
    }
    return url;
}) as any;

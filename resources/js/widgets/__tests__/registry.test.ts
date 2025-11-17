/**
 * Widget Registry Tests
 *
 * Basic tests to verify the widget registry system works correctly
 */

import { getWidget, hasWidget, getRegisteredWidgetKeys, widgetRegistry } from '../index'

describe('Widget Registry', () => {
    test('widgetRegistry is defined', () => {
        expect(widgetRegistry).toBeDefined()
        expect(typeof widgetRegistry).toBe('object')
    })

    test('test widget is registered', () => {
        expect(widgetRegistry['test.widget']).toBeDefined()
    })

    test('getWidget returns component for valid key', () => {
        const widget = getWidget('test.widget')
        expect(widget).not.toBeNull()
        expect(typeof widget).toBe('function')
    })

    test('getWidget returns null for invalid key', () => {
        const widget = getWidget('nonexistent.widget')
        expect(widget).toBeNull()
    })

    test('hasWidget returns true for registered widget', () => {
        expect(hasWidget('test.widget')).toBe(true)
    })

    test('hasWidget returns false for unregistered widget', () => {
        expect(hasWidget('nonexistent.widget')).toBe(false)
    })

    test('getRegisteredWidgetKeys returns array of keys', () => {
        const keys = getRegisteredWidgetKeys()
        expect(Array.isArray(keys)).toBe(true)
        expect(keys).toContain('test.widget')
    })

    test('getRegisteredWidgetKeys count matches registry', () => {
        const keys = getRegisteredWidgetKeys()
        expect(keys.length).toBe(Object.keys(widgetRegistry).length)
    })
})

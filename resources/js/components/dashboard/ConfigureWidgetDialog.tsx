/**
 * ConfigureWidgetDialog Component
 *
 * Dialog for configuring widget settings.
 * Dynamically generates form fields based on the widget's settings_schema.
 */

import { useState, useEffect } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Settings, AlertCircle } from 'lucide-react'

interface UserWidget {
    id: number
    widget_key: string
    position: number
    width: number
    is_visible: boolean
    settings?: Record<string, any>
}

interface WidgetConfig {
    key: string
    module: string
    name: string
    description: string
    icon?: string
    component: string
    default_width: number
    default_visible: boolean
    roles: string[]
    configurable: boolean
    settings_schema?: Record<string, SettingSchema>
}

interface SettingSchema {
    type: 'text' | 'number' | 'select' | 'yes_no' | 'date_range' | 'multiselect' | 'color'
    label: string
    default?: any
    min?: number
    max?: number
    step?: number
    options?: Record<string, string>
    required?: boolean
    placeholder?: string
    help?: string
}

interface ConfigureWidgetDialogProps {
    open: boolean
    onClose: () => void
    widget: UserWidget | null
    widgetConfig: WidgetConfig | null
    onSave: (widgetId: number, settings: Record<string, any>) => void
}

export function ConfigureWidgetDialog({
    open,
    onClose,
    widget,
    widgetConfig,
    onSave,
}: ConfigureWidgetDialogProps) {
    const [formValues, setFormValues] = useState<Record<string, any>>({})
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [isSaving, setIsSaving] = useState(false)

    // Initialize form values when dialog opens
    useEffect(() => {
        if (open && widget && widgetConfig?.settings_schema) {
            const initialValues: Record<string, any> = {}

            // Populate with current settings or defaults
            Object.entries(widgetConfig.settings_schema).forEach(([key, schema]) => {
                if (widget.settings && key in widget.settings) {
                    initialValues[key] = widget.settings[key]
                } else if ('default' in schema) {
                    initialValues[key] = schema.default
                } else {
                    // Set sensible defaults based on type
                    switch (schema.type) {
                        case 'number':
                            initialValues[key] = schema.min || 0
                            break
                        case 'yes_no':
                            initialValues[key] = false
                            break
                        case 'multiselect':
                            initialValues[key] = []
                            break
                        default:
                            initialValues[key] = ''
                    }
                }
            })

            setFormValues(initialValues)
            setErrors({})
        }
    }, [open, widget, widgetConfig])

    // Validate a single field
    const validateField = (key: string, value: any, schema: SettingSchema): string | null => {
        if (schema.required && (value === '' || value === null || value === undefined)) {
            return `${schema.label} is required`
        }

        if (schema.type === 'number') {
            const numValue = Number(value)
            if (isNaN(numValue)) {
                return `${schema.label} must be a number`
            }
            if (schema.min !== undefined && numValue < schema.min) {
                return `${schema.label} must be at least ${schema.min}`
            }
            if (schema.max !== undefined && numValue > schema.max) {
                return `${schema.label} must be at most ${schema.max}`
            }
        }

        if (schema.type === 'select' && schema.options) {
            if (value && !Object.keys(schema.options).includes(value)) {
                return `${schema.label} has an invalid value`
            }
        }

        return null
    }

    // Validate all fields
    const validateForm = (): boolean => {
        if (!widgetConfig?.settings_schema) return true

        const newErrors: Record<string, string> = {}

        Object.entries(widgetConfig.settings_schema).forEach(([key, schema]) => {
            const error = validateField(key, formValues[key], schema)
            if (error) {
                newErrors[key] = error
            }
        })

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleFieldChange = (key: string, value: any) => {
        setFormValues(prev => ({
            ...prev,
            [key]: value,
        }))

        // Clear error for this field if it exists
        if (errors[key]) {
            setErrors(prev => {
                const newErrors = { ...prev }
                delete newErrors[key]
                return newErrors
            })
        }
    }

    const handleSave = async () => {
        if (!widget) return

        // Validate form
        if (!validateForm()) {
            return
        }

        setIsSaving(true)
        try {
            await onSave(widget.id, formValues)
            onClose()
        } catch (error) {
            console.error('Failed to save widget settings:', error)
        } finally {
            setIsSaving(false)
        }
    }

    const handleCancel = () => {
        setErrors({})
        onClose()
    }

    // Render a form field based on its type
    const renderField = (key: string, schema: SettingSchema) => {
        const value = formValues[key]
        const error = errors[key]

        switch (schema.type) {
            case 'text':
                return (
                    <div key={key} className="space-y-2">
                        <Label htmlFor={key}>
                            {schema.label}
                            {schema.required && <span className="text-destructive ml-1">*</span>}
                        </Label>
                        <Input
                            id={key}
                            type="text"
                            value={value || ''}
                            onChange={(e) => handleFieldChange(key, e.target.value)}
                            placeholder={schema.placeholder}
                            className={error ? 'border-destructive' : ''}
                        />
                        {schema.help && (
                            <p className="text-xs text-muted-foreground">{schema.help}</p>
                        )}
                        {error && (
                            <p className="text-xs text-destructive">{error}</p>
                        )}
                    </div>
                )

            case 'number':
                return (
                    <div key={key} className="space-y-2">
                        <Label htmlFor={key}>
                            {schema.label}
                            {schema.required && <span className="text-destructive ml-1">*</span>}
                        </Label>
                        <Input
                            id={key}
                            type="number"
                            value={value ?? ''}
                            onChange={(e) => handleFieldChange(key, e.target.value)}
                            min={schema.min}
                            max={schema.max}
                            step={schema.step || 1}
                            placeholder={schema.placeholder}
                            className={error ? 'border-destructive' : ''}
                        />
                        {schema.help && (
                            <p className="text-xs text-muted-foreground">{schema.help}</p>
                        )}
                        {error && (
                            <p className="text-xs text-destructive">{error}</p>
                        )}
                    </div>
                )

            case 'select':
                return (
                    <div key={key} className="space-y-2">
                        <Label htmlFor={key}>
                            {schema.label}
                            {schema.required && <span className="text-destructive ml-1">*</span>}
                        </Label>
                        <Select
                            value={value || ''}
                            onValueChange={(newValue) => handleFieldChange(key, newValue)}
                        >
                            <SelectTrigger className={error ? 'border-destructive' : ''}>
                                <SelectValue placeholder={schema.placeholder || `Select ${schema.label}`} />
                            </SelectTrigger>
                            <SelectContent>
                                {schema.options && Object.entries(schema.options).map(([optKey, optLabel]) => (
                                    <SelectItem key={optKey} value={optKey}>
                                        {optLabel}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {schema.help && (
                            <p className="text-xs text-muted-foreground">{schema.help}</p>
                        )}
                        {error && (
                            <p className="text-xs text-destructive">{error}</p>
                        )}
                    </div>
                )

            case 'yes_no':
                return (
                    <div key={key} className="space-y-2">
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label htmlFor={key}>
                                    {schema.label}
                                    {schema.required && <span className="text-destructive ml-1">*</span>}
                                </Label>
                                {schema.help && (
                                    <p className="text-xs text-muted-foreground">{schema.help}</p>
                                )}
                            </div>
                            <Switch
                                id={key}
                                checked={!!value}
                                onCheckedChange={(checked) => handleFieldChange(key, checked)}
                            />
                        </div>
                        {error && (
                            <p className="text-xs text-destructive">{error}</p>
                        )}
                    </div>
                )

            case 'date_range':
                // For date_range, we'll use a select with presets for now
                // In a more complete implementation, you might use a date picker component
                return (
                    <div key={key} className="space-y-2">
                        <Label htmlFor={key}>
                            {schema.label}
                            {schema.required && <span className="text-destructive ml-1">*</span>}
                        </Label>
                        <Select
                            value={value || ''}
                            onValueChange={(newValue) => handleFieldChange(key, newValue)}
                        >
                            <SelectTrigger className={error ? 'border-destructive' : ''}>
                                <SelectValue placeholder={schema.placeholder || 'Select date range'} />
                            </SelectTrigger>
                            <SelectContent>
                                {schema.options && Object.entries(schema.options).map(([optKey, optLabel]) => (
                                    <SelectItem key={optKey} value={optKey}>
                                        {optLabel}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {schema.help && (
                            <p className="text-xs text-muted-foreground">{schema.help}</p>
                        )}
                        {error && (
                            <p className="text-xs text-destructive">{error}</p>
                        )}
                    </div>
                )

            default:
                return (
                    <Alert key={key} variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                            Unsupported field type: {schema.type}
                        </AlertDescription>
                    </Alert>
                )
        }
    }

    if (!widget || !widgetConfig) {
        return null
    }

    const hasNoSettings = !widgetConfig.settings_schema || Object.keys(widgetConfig.settings_schema).length === 0
    const isNotConfigurable = !widgetConfig.configurable

    return (
        <Dialog open={open} onOpenChange={(isOpen) => !isOpen && handleCancel()}>
            <DialogContent className="max-w-2xl max-h-[80vh] flex flex-col">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Settings className="h-5 w-5" />
                        Configure {widgetConfig.name}
                    </DialogTitle>
                    <DialogDescription>
                        {widgetConfig.description}
                    </DialogDescription>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto pr-2">
                    {isNotConfigurable ? (
                        <Alert>
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>
                                This widget is not configurable.
                            </AlertDescription>
                        </Alert>
                    ) : hasNoSettings ? (
                        <Alert>
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>
                                This widget has no settings to configure.
                            </AlertDescription>
                        </Alert>
                    ) : (
                        <div className="space-y-6 py-4">
                            {Object.entries(widgetConfig.settings_schema!).map(([key, schema]) =>
                                renderField(key, schema)
                            )}
                        </div>
                    )}

                    {/* Preview of current settings */}
                    {!isNotConfigurable && !hasNoSettings && (
                        <div className="mt-6 p-4 rounded-lg bg-muted">
                            <h4 className="text-sm font-semibold mb-2">Current Settings</h4>
                            <pre className="text-xs overflow-x-auto">
                                {JSON.stringify(formValues, null, 2)}
                            </pre>
                        </div>
                    )}
                </div>

                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={handleCancel}
                        disabled={isSaving}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSave}
                        disabled={isSaving || isNotConfigurable || hasNoSettings}
                    >
                        {isSaving ? 'Saving...' : 'Save Settings'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

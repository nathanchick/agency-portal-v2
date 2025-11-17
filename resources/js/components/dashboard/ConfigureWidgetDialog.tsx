/**
 * ConfigureWidgetDialog Component
 *
 * Dialog for configuring widget settings.
 * Uses WidgetSettingsForm for dynamic form field generation.
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
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Settings, AlertCircle } from 'lucide-react'
import {
    WidgetSettingsForm,
    SettingsSchema,
    SettingsValues,
    SettingsErrors,
    SettingSchema,
} from './WidgetSettingsForm'

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
    settings_schema?: SettingsSchema
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
    const [formValues, setFormValues] = useState<SettingsValues>({})
    const [errors, setErrors] = useState<SettingsErrors>({})
    const [isSaving, setIsSaving] = useState(false)

    // Initialize form values when dialog opens
    useEffect(() => {
        if (open && widget && widgetConfig?.settings_schema) {
            const initialValues: SettingsValues = {}

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
    }

    const handleClearError = (key: string) => {
        setErrors(prev => {
            const newErrors = { ...prev }
            delete newErrors[key]
            return newErrors
        })
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
                        <div className="py-4">
                            <WidgetSettingsForm
                                schema={widgetConfig.settings_schema!}
                                values={formValues}
                                onChange={handleFieldChange}
                                errors={errors}
                                onClearError={handleClearError}
                            />
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

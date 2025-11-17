/**
 * WidgetSettingsForm Component
 *
 * Reusable component for rendering dynamic forms from widget settings schemas.
 * Handles all supported setting types with validation and error display.
 */

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
import { Badge } from '@/components/ui/badge'
import { AlertCircle, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

/**
 * Schema definition for a single setting field
 */
export interface SettingSchema {
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

/**
 * Complete settings schema - mapping of field keys to their schemas
 */
export type SettingsSchema = Record<string, SettingSchema>

/**
 * Form values - mapping of field keys to their values
 */
export type SettingsValues = Record<string, any>

/**
 * Form errors - mapping of field keys to error messages
 */
export type SettingsErrors = Record<string, string>

/**
 * Props for the WidgetSettingsForm component
 */
export interface WidgetSettingsFormProps {
    /**
     * The settings schema defining all form fields
     */
    schema: SettingsSchema

    /**
     * Current form values
     */
    values: SettingsValues

    /**
     * Callback when a field value changes
     */
    onChange: (key: string, value: any) => void

    /**
     * Optional validation errors to display
     */
    errors?: SettingsErrors

    /**
     * Optional callback when an error is cleared
     */
    onClearError?: (key: string) => void
}

/**
 * WidgetSettingsForm - Dynamic form generator for widget settings
 *
 * Renders form fields based on the provided schema with validation
 * and error handling.
 */
export function WidgetSettingsForm({
    schema,
    values,
    onChange,
    errors = {},
    onClearError,
}: WidgetSettingsFormProps) {
    const handleFieldChange = (key: string, value: any) => {
        onChange(key, value)

        // Clear error for this field if callback provided
        if (errors[key] && onClearError) {
            onClearError(key)
        }
    }

    // Render a form field based on its type
    const renderField = (key: string, fieldSchema: SettingSchema) => {
        const value = values[key]
        const error = errors[key]

        switch (fieldSchema.type) {
            case 'text':
                return (
                    <TextFieldInput
                        key={key}
                        fieldKey={key}
                        schema={fieldSchema}
                        value={value}
                        error={error}
                        onChange={handleFieldChange}
                    />
                )

            case 'number':
                return (
                    <NumberFieldInput
                        key={key}
                        fieldKey={key}
                        schema={fieldSchema}
                        value={value}
                        error={error}
                        onChange={handleFieldChange}
                    />
                )

            case 'select':
                return (
                    <SelectFieldInput
                        key={key}
                        fieldKey={key}
                        schema={fieldSchema}
                        value={value}
                        error={error}
                        onChange={handleFieldChange}
                    />
                )

            case 'yes_no':
                return (
                    <YesNoFieldInput
                        key={key}
                        fieldKey={key}
                        schema={fieldSchema}
                        value={value}
                        error={error}
                        onChange={handleFieldChange}
                    />
                )

            case 'date_range':
                return (
                    <DateRangeFieldInput
                        key={key}
                        fieldKey={key}
                        schema={fieldSchema}
                        value={value}
                        error={error}
                        onChange={handleFieldChange}
                    />
                )

            case 'multiselect':
                return (
                    <MultiSelectFieldInput
                        key={key}
                        fieldKey={key}
                        schema={fieldSchema}
                        value={value}
                        error={error}
                        onChange={handleFieldChange}
                    />
                )

            case 'color':
                return (
                    <ColorFieldInput
                        key={key}
                        fieldKey={key}
                        schema={fieldSchema}
                        value={value}
                        error={error}
                        onChange={handleFieldChange}
                    />
                )

            default:
                return (
                    <Alert key={key} variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                            Unsupported field type: {(fieldSchema as any).type}
                        </AlertDescription>
                    </Alert>
                )
        }
    }

    return (
        <div className="space-y-6">
            {Object.entries(schema).map(([key, fieldSchema]) =>
                renderField(key, fieldSchema)
            )}
        </div>
    )
}

/**
 * Helper component for text input fields
 */
interface FieldInputProps {
    fieldKey: string
    schema: SettingSchema
    value: any
    error?: string
    onChange: (key: string, value: any) => void
}

function TextFieldInput({ fieldKey, schema, value, error, onChange }: FieldInputProps) {
    return (
        <div className="space-y-2">
            <Label htmlFor={fieldKey}>
                {schema.label}
                {schema.required && <span className="text-destructive ml-1">*</span>}
            </Label>
            <Input
                id={fieldKey}
                type="text"
                value={value || ''}
                onChange={(e) => onChange(fieldKey, e.target.value)}
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
}

function NumberFieldInput({ fieldKey, schema, value, error, onChange }: FieldInputProps) {
    return (
        <div className="space-y-2">
            <Label htmlFor={fieldKey}>
                {schema.label}
                {schema.required && <span className="text-destructive ml-1">*</span>}
            </Label>
            <Input
                id={fieldKey}
                type="number"
                value={value ?? ''}
                onChange={(e) => onChange(fieldKey, e.target.value)}
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
}

function SelectFieldInput({ fieldKey, schema, value, error, onChange }: FieldInputProps) {
    return (
        <div className="space-y-2">
            <Label htmlFor={fieldKey}>
                {schema.label}
                {schema.required && <span className="text-destructive ml-1">*</span>}
            </Label>
            <Select
                value={value || ''}
                onValueChange={(newValue) => onChange(fieldKey, newValue)}
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
}

function YesNoFieldInput({ fieldKey, schema, value, error, onChange }: FieldInputProps) {
    return (
        <div className="space-y-2">
            <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                    <Label htmlFor={fieldKey}>
                        {schema.label}
                        {schema.required && <span className="text-destructive ml-1">*</span>}
                    </Label>
                    {schema.help && (
                        <p className="text-xs text-muted-foreground">{schema.help}</p>
                    )}
                </div>
                <Switch
                    id={fieldKey}
                    checked={!!value}
                    onCheckedChange={(checked) => onChange(fieldKey, checked)}
                />
            </div>
            {error && (
                <p className="text-xs text-destructive">{error}</p>
            )}
        </div>
    )
}

function DateRangeFieldInput({ fieldKey, schema, value, error, onChange }: FieldInputProps) {
    // For date_range, we use a select with presets for now
    // In a more complete implementation, you might use a date picker component
    return (
        <div className="space-y-2">
            <Label htmlFor={fieldKey}>
                {schema.label}
                {schema.required && <span className="text-destructive ml-1">*</span>}
            </Label>
            <Select
                value={value || ''}
                onValueChange={(newValue) => onChange(fieldKey, newValue)}
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
}

function MultiSelectFieldInput({ fieldKey, schema, value, error, onChange }: FieldInputProps) {
    // Ensure value is always an array
    const selectedValues: string[] = Array.isArray(value) ? value : []

    const handleToggle = (optKey: string) => {
        const newValues = selectedValues.includes(optKey)
            ? selectedValues.filter(v => v !== optKey)
            : [...selectedValues, optKey]

        onChange(fieldKey, newValues)
    }

    const handleRemove = (optKey: string) => {
        const newValues = selectedValues.filter(v => v !== optKey)
        onChange(fieldKey, newValues)
    }

    return (
        <div className="space-y-2">
            <Label htmlFor={fieldKey}>
                {schema.label}
                {schema.required && <span className="text-destructive ml-1">*</span>}
            </Label>

            {/* Display selected values as badges */}
            {selectedValues.length > 0 && (
                <div className="flex flex-wrap gap-2 p-2 border rounded-md bg-muted/30">
                    {selectedValues.map(optKey => (
                        <Badge key={optKey} variant="secondary" className="gap-1">
                            {schema.options?.[optKey] || optKey}
                            <button
                                type="button"
                                onClick={() => handleRemove(optKey)}
                                className="ml-1 hover:text-destructive"
                            >
                                <X className="h-3 w-3" />
                            </button>
                        </Badge>
                    ))}
                </div>
            )}

            {/* Options list */}
            <div className={`border rounded-md ${error ? 'border-destructive' : ''}`}>
                <div className="max-h-48 overflow-y-auto">
                    {schema.options && Object.entries(schema.options).map(([optKey, optLabel]) => (
                        <div
                            key={optKey}
                            className="flex items-center gap-2 p-2 hover:bg-muted/50 cursor-pointer border-b last:border-b-0"
                            onClick={() => handleToggle(optKey)}
                        >
                            <input
                                type="checkbox"
                                checked={selectedValues.includes(optKey)}
                                onChange={() => handleToggle(optKey)}
                                className="h-4 w-4 rounded border-gray-300"
                            />
                            <span className="text-sm">{optLabel}</span>
                        </div>
                    ))}
                </div>
            </div>

            {schema.help && (
                <p className="text-xs text-muted-foreground">{schema.help}</p>
            )}
            {error && (
                <p className="text-xs text-destructive">{error}</p>
            )}
        </div>
    )
}

function ColorFieldInput({ fieldKey, schema, value, error, onChange }: FieldInputProps) {
    return (
        <div className="space-y-2">
            <Label htmlFor={fieldKey}>
                {schema.label}
                {schema.required && <span className="text-destructive ml-1">*</span>}
            </Label>
            <div className="flex gap-2">
                <Input
                    id={fieldKey}
                    type="color"
                    value={value || '#000000'}
                    onChange={(e) => onChange(fieldKey, e.target.value)}
                    className={`w-20 h-10 p-1 cursor-pointer ${error ? 'border-destructive' : ''}`}
                />
                <Input
                    type="text"
                    value={value || ''}
                    onChange={(e) => onChange(fieldKey, e.target.value)}
                    placeholder={schema.placeholder || '#000000'}
                    className={`flex-1 ${error ? 'border-destructive' : ''}`}
                    pattern="^#[0-9A-Fa-f]{6}$"
                />
            </div>
            {schema.help && (
                <p className="text-xs text-muted-foreground">{schema.help}</p>
            )}
            {error && (
                <p className="text-xs text-destructive">{error}</p>
            )}
        </div>
    )
}

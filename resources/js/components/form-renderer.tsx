import {FormField} from '@/components/form-builder';
import {Label} from '@/components/ui/label';
import {Input} from '@/components/ui/input';
import {Textarea} from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

interface FormRendererProps {
    fields: FormField[];
    values: Record<string, any>;
    onChange: (fieldId: string, value: any) => void;
    errors?: Record<string, string>;
}

export default function FormRenderer({fields, values, onChange, errors}: FormRendererProps) {
    const renderField = (field: FormField) => {
        const value = values[field.id] || '';
        const error = errors?.[field.id];

        switch (field.type) {
            case 'input':
                return (
                    <div key={field.id} className="space-y-2">
                        <Label htmlFor={field.id}>
                            {field.label}
                            {field.required && <span className="text-destructive ml-1">*</span>}
                        </Label>
                        <Input
                            id={field.id}
                            type={field.inputType || 'text'}
                            value={value}
                            onChange={(e) => onChange(field.id, e.target.value)}
                            required={field.required}
                            placeholder={field.label}
                        />
                        {error && <p className="text-sm text-destructive">{error}</p>}
                    </div>
                );

            case 'textarea':
                return (
                    <div key={field.id} className="space-y-2">
                        <Label htmlFor={field.id}>
                            {field.label}
                            {field.required && <span className="text-destructive ml-1">*</span>}
                        </Label>
                        <Textarea
                            id={field.id}
                            value={value}
                            onChange={(e) => onChange(field.id, e.target.value)}
                            required={field.required}
                            placeholder={field.label}
                            rows={4}
                        />
                        {error && <p className="text-sm text-destructive">{error}</p>}
                    </div>
                );

            case 'select':
                return (
                    <div key={field.id} className="space-y-2">
                        <Label htmlFor={field.id}>
                            {field.label}
                            {field.required && <span className="text-destructive ml-1">*</span>}
                        </Label>
                        <Select
                            value={value}
                            onValueChange={(val) => onChange(field.id, val)}
                            required={field.required}
                        >
                            <SelectTrigger id={field.id}>
                                <SelectValue placeholder={`Select ${field.label}`}/>
                            </SelectTrigger>
                            <SelectContent>
                                {field.options?.map((option, idx) => (
                                    <SelectItem key={idx} value={option}>
                                        {option}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {error && <p className="text-sm text-destructive">{error}</p>}
                    </div>
                );

            case 'datetime':
                let inputType = 'date';
                if (field.datetimeType === 'time') {
                    inputType = 'time';
                } else if (field.datetimeType === 'datetime') {
                    inputType = 'datetime-local';
                }

                return (
                    <div key={field.id} className="space-y-2">
                        <Label htmlFor={field.id}>
                            {field.label}
                            {field.required && <span className="text-destructive ml-1">*</span>}
                        </Label>
                        <Input
                            id={field.id}
                            type={inputType}
                            value={value}
                            onChange={(e) => onChange(field.id, e.target.value)}
                            required={field.required}
                        />
                        {error && <p className="text-sm text-destructive">{error}</p>}
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="space-y-6">
            {fields.map((field) => renderField(field))}
        </div>
    );
}

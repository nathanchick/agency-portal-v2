import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Switch} from '@/components/ui/switch';
import {Textarea} from '@/components/ui/textarea';

interface SettingFieldProps {
    moduleName: string;
    settingKey: string;
    label: string;
    type: string;
    value: string | null;
    description?: string;
    onChange: (moduleName: string, settingKey: string, value: string) => void;
}

export default function SettingField({
    moduleName,
    settingKey,
    label,
    type,
    value,
    description,
    onChange,
}: SettingFieldProps) {
    const fieldId = `${moduleName}_${settingKey}`;

    const handleChange = (newValue: string | boolean) => {
        // Convert boolean to string for yes_no type
        if (type === 'yes_no') {
            onChange(moduleName, settingKey, newValue ? '1' : '0');
        } else {
            onChange(moduleName, settingKey, newValue as string);
        }
    };

    // Render different field types
    if (type === 'yes_no') {
        return (
            <div className="space-y-2">
                <div className="flex items-center space-x-2">
                    <Switch
                        id={fieldId}
                        checked={value === '1'}
                        onCheckedChange={handleChange}
                    />
                    <Label htmlFor={fieldId} className="cursor-pointer">
                        {label}
                    </Label>
                </div>
                {description && (
                    <p className="text-sm text-muted-foreground">
                        {description}
                    </p>
                )}
            </div>
        );
    }

    if (type === 'textarea') {
        return (
            <div className="space-y-2">
                <Label htmlFor={fieldId}>{label}</Label>
                <Textarea
                    id={fieldId}
                    value={value || ''}
                    onChange={(e) => handleChange(e.target.value)}
                    placeholder={label}
                />
                {description && (
                    <p className="text-sm text-muted-foreground">
                        {description}
                    </p>
                )}
            </div>
        );
    }

    // Default to text/encrypted input
    const inputType = type === 'encrypted' ? 'password' : 'text';

    return (
        <div className="space-y-2">
            <Label htmlFor={fieldId}>{label}</Label>
            <Input
                id={fieldId}
                type={inputType}
                value={value || ''}
                onChange={(e) => handleChange(e.target.value)}
                placeholder={label}
            />
            {description && (
                <p className="text-sm text-muted-foreground">{description}</p>
            )}
        </div>
    );
}

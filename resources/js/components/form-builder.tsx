import {useState} from 'react';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    useSortable,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {Card, CardContent} from '@/components/ui/card';
import {GripVertical, Trash2, Plus, ChevronDown, ChevronRight} from 'lucide-react';
import {Checkbox} from '@/components/ui/checkbox';
import {Textarea} from '@/components/ui/textarea';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible';

export interface FormField {
    id: string;
    type: 'input' | 'select' | 'textarea' | 'datetime';
    label: string;
    required: boolean;
    inputType?: 'text' | 'email' | 'tel';
    datetimeType?: 'date' | 'time' | 'datetime';
    options?: string[];
}

interface FormBuilderProps {
    value: string; // JSON string
    onChange: (value: string) => void;
}

function SortableField({
                           field,
                           onUpdate,
                           onDelete,
                       }: {
    field: FormField;
    onUpdate: (field: FormField) => void;
    onDelete: () => void;
}) {
    const [isOpen, setIsOpen] = useState(false);
    const {attributes, listeners, setNodeRef, transform, transition, isDragging} =
        useSortable({id: field.id});

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    const handleLabelChange = (label: string) => {
        onUpdate({...field, label});
    };

    const handleRequiredChange = (required: boolean) => {
        onUpdate({...field, required});
    };

    const handleInputTypeChange = (inputType: 'text' | 'email' | 'tel') => {
        onUpdate({...field, inputType});
    };

    const handleDatetimeTypeChange = (datetimeType: 'date' | 'time' | 'datetime') => {
        onUpdate({...field, datetimeType});
    };

    const handleOptionsChange = (options: string) => {
        onUpdate({...field, options: options.split('\n').filter(o => o.trim())});
    };

    const getFieldTypeLabel = () => {
        switch (field.type) {
            case 'input':
                return 'Input';
            case 'select':
                return 'Select';
            case 'textarea':
                return 'Text Area';
            case 'datetime':
                return 'Date/Time';
            default:
                return field.type;
        }
    };

    return (
        <div ref={setNodeRef} style={style} className="mb-3">
            <Card>
                <CardContent className="p-0">
                    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
                        <div className="flex items-center gap-3 p-4">
                            <div
                                {...attributes}
                                {...listeners}
                                className="cursor-grab active:cursor-grabbing"
                            >
                                <GripVertical className="h-5 w-5 text-muted-foreground"/>
                            </div>

                            <CollapsibleTrigger asChild>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="p-0 hover:bg-transparent"
                                >
                                    {isOpen ? (
                                        <ChevronDown className="h-4 w-4 text-muted-foreground"/>
                                    ) : (
                                        <ChevronRight className="h-4 w-4 text-muted-foreground"/>
                                    )}
                                </Button>
                            </CollapsibleTrigger>

                            <div className="flex-1 flex items-center gap-3">
                                <span className="text-sm font-medium px-2 py-1 bg-primary/10 text-primary rounded">
                                    {getFieldTypeLabel()}
                                </span>
                                <span className="text-sm font-medium">
                                    {field.label || 'Untitled Field'}
                                </span>
                                {field.required && (
                                    <span className="text-xs text-muted-foreground">*Required</span>
                                )}
                            </div>

                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={onDelete}
                                className="text-destructive hover:text-destructive"
                            >
                                <Trash2 className="h-4 w-4"/>
                            </Button>
                        </div>

                        <CollapsibleContent>
                            <div className="px-4 pb-4 space-y-4 border-t pt-4">
                                <div>
                                    <Label htmlFor={`label-${field.id}`}>Field Label</Label>
                                    <Input
                                        id={`label-${field.id}`}
                                        value={field.label}
                                        onChange={(e) => handleLabelChange(e.target.value)}
                                        placeholder="e.g., Full Name"
                                    />
                                </div>

                                {field.type === 'input' && (
                                    <div>
                                        <Label htmlFor={`inputType-${field.id}`}>Input Type</Label>
                                        <Select
                                            value={field.inputType || 'text'}
                                            onValueChange={handleInputTypeChange}
                                        >
                                            <SelectTrigger id={`inputType-${field.id}`}>
                                                <SelectValue/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="text">Text</SelectItem>
                                                <SelectItem value="email">Email</SelectItem>
                                                <SelectItem value="tel">Telephone</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                )}

                                {field.type === 'datetime' && (
                                    <div>
                                        <Label htmlFor={`datetimeType-${field.id}`}>Date/Time Type</Label>
                                        <Select
                                            value={field.datetimeType || 'date'}
                                            onValueChange={handleDatetimeTypeChange}
                                        >
                                            <SelectTrigger id={`datetimeType-${field.id}`}>
                                                <SelectValue/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="date">Date Only</SelectItem>
                                                <SelectItem value="time">Time Only</SelectItem>
                                                <SelectItem value="datetime">Date and Time</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                )}

                                {field.type === 'select' && (
                                    <div>
                                        <Label htmlFor={`options-${field.id}`}>
                                            Options (one per line)
                                        </Label>
                                        <Textarea
                                            id={`options-${field.id}`}
                                            value={field.options?.join('\n') || ''}
                                            onChange={(e) => handleOptionsChange(e.target.value)}
                                            placeholder="Option 1&#10;Option 2&#10;Option 3"
                                            rows={4}
                                        />
                                    </div>
                                )}

                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id={`required-${field.id}`}
                                        checked={field.required}
                                        onCheckedChange={handleRequiredChange}
                                    />
                                    <Label
                                        htmlFor={`required-${field.id}`}
                                        className="font-normal cursor-pointer"
                                    >
                                        Required field
                                    </Label>
                                </div>
                            </div>
                        </CollapsibleContent>
                    </Collapsible>
                </CardContent>
            </Card>
        </div>
    );
}

export default function FormBuilder({value, onChange}: FormBuilderProps) {
    const [fields, setFields] = useState<FormField[]>(() => {
        try {
            return value ? JSON.parse(value) : [];
        } catch {
            return [];
        }
    });

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const updateFields = (newFields: FormField[]) => {
        setFields(newFields);
        onChange(JSON.stringify(newFields));
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const {active, over} = event;

        if (over && active.id !== over.id) {
            const oldIndex = fields.findIndex((f) => f.id === active.id);
            const newIndex = fields.findIndex((f) => f.id === over.id);
            updateFields(arrayMove(fields, oldIndex, newIndex));
        }
    };

    const addField = (type: 'input' | 'select' | 'textarea' | 'datetime') => {
        const newField: FormField = {
            id: `field-${Date.now()}`,
            type,
            label: '',
            required: false,
            ...(type === 'input' && {inputType: 'text'}),
            ...(type === 'select' && {options: []}),
            ...(type === 'datetime' && {datetimeType: 'date'}),
        };
        updateFields([...fields, newField]);
    };

    const updateField = (id: string, updatedField: FormField) => {
        updateFields(fields.map((f) => (f.id === id ? updatedField : f)));
    };

    const deleteField = (id: string) => {
        updateFields(fields.filter((f) => f.id !== id));
    };

    return (
        <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addField('input')}
                >
                    <Plus className="h-4 w-4 mr-2"/>
                    Add Input
                </Button>
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addField('select')}
                >
                    <Plus className="h-4 w-4 mr-2"/>
                    Add Select
                </Button>
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addField('textarea')}
                >
                    <Plus className="h-4 w-4 mr-2"/>
                    Add Text Area
                </Button>
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addField('datetime')}
                >
                    <Plus className="h-4 w-4 mr-2"/>
                    Add Date/Time
                </Button>
            </div>

            {fields.length === 0 ? (
                <Card>
                    <CardContent className="py-12">
                        <div className="text-center text-muted-foreground">
                            <p>No fields added yet</p>
                            <p className="text-sm mt-1">Click the buttons above to add fields to your form</p>
                        </div>
                    </CardContent>
                </Card>
            ) : (
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                >
                    <SortableContext items={fields.map((f) => f.id)} strategy={verticalListSortingStrategy}>
                        {fields.map((field) => (
                            <SortableField
                                key={field.id}
                                field={field}
                                onUpdate={(updatedField) => updateField(field.id, updatedField)}
                                onDelete={() => deleteField(field.id)}
                            />
                        ))}
                    </SortableContext>
                </DndContext>
            )}
        </div>
    );
}

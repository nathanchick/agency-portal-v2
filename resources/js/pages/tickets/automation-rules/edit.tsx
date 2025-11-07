import {AppSidebar} from '@/components/app-sidebar';
import {AppSidebarHeader} from '@/components/app-sidebar-header';
import {Head, router, useForm} from '@inertiajs/react';
import {
    SidebarInset,
    SidebarProvider,
} from '@/components/ui/sidebar';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Textarea} from '@/components/ui/textarea';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {Switch} from '@/components/ui/switch';
import {FormEvent} from 'react';
import {route} from 'ziggy-js';
import {Plus, Trash2} from 'lucide-react';

interface Category {
    id: string;
    name: string;
}

interface Label {
    id: string;
    name: string;
}

interface TicketStatus {
    id: string;
    name: string;
    color: string;
}

interface TicketForm {
    id: string;
    name: string;
    content: string;
}

interface User {
    id: string;
    name: string;
    email: string;
}

interface Customer {
    id: string;
    name: string;
    email: string;
}

interface Condition {
    field: string;
    operator: string;
    value: string;
}

interface Action {
    type: string;
    value?: string;
    field?: string;
}

interface AutomationRule {
    id: string;
    name: string;
    description: string;
    priority: number;
    is_active: boolean;
    trigger: 'ticket_created' | 'ticket_updated';
    condition_match: 'all' | 'any';
    conditions: Condition[];
    actions: Action[];
    stop_processing: boolean;
}

interface Props {
    rule: AutomationRule;
    categories: Category[];
    labels: Label[];
    statuses: TicketStatus[];
    forms: TicketForm[];
    users: User[];
    customers: Customer[];
}

export default function EditAutomationRule({rule, categories, labels, statuses, forms, users, customers}: Props) {
    const {data, setData, put, processing, errors} = useForm({
        name: rule.name,
        description: rule.description,
        priority: rule.priority,
        is_active: rule.is_active,
        trigger: rule.trigger,
        condition_match: rule.condition_match,
        conditions: rule.conditions,
        actions: rule.actions,
        stop_processing: rule.stop_processing,
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        put(route('tickets.automation-rules.update', rule.id));
    };

    const addCondition = () => {
        setData('conditions', [
            ...data.conditions,
            {field: 'category_id', operator: 'is', value: ''},
        ]);
    };

    const removeCondition = (index: number) => {
        setData(
            'conditions',
            data.conditions.filter((_, i) => i !== index)
        );
    };

    const updateCondition = (index: number, field: keyof Condition, value: string) => {
        const newConditions = [...data.conditions];
        newConditions[index] = {...newConditions[index], [field]: value};
        setData('conditions', newConditions);
    };

    const addAction = () => {
        setData('actions', [...data.actions, {type: 'set_category', value: ''}]);
    };

    const removeAction = (index: number) => {
        setData(
            'actions',
            data.actions.filter((_, i) => i !== index)
        );
    };

    const updateAction = (index: number, field: keyof Action, value: string) => {
        const newActions = [...data.actions];

        // If changing the type, reset the value
        if (field === 'type') {
            newActions[index] = {type: value, value: ''};
        } else {
            newActions[index] = {...newActions[index], [field]: value};
        }

        setData('actions', newActions);
    };

    const conditionFields = [
        {value: 'category_id', label: 'Category'},
        {value: 'customer_id', label: 'Customer'},
        {value: 'user_id', label: 'Ticket Creator'},
        {value: 'assigned_to', label: 'Assigned User'},
        {value: 'priority', label: 'Priority'},
        {value: 'status_id', label: 'Status'},
        {value: 'labels', label: 'Labels'},
    ];

    const operators = [
        {value: 'is', label: 'Is'},
        {value: 'is_not', label: 'Is Not'},
        {value: 'contains', label: 'Contains'},
        {value: 'does_not_contain', label: 'Does Not Contain'},
    ];

    const actionTypes = [
        {value: 'set_category', label: 'Set Category'},
        {value: 'set_priority', label: 'Set Priority'},
        {value: 'set_status', label: 'Set Status'},
        {value: 'add_labels', label: 'Add Labels'},
        {value: 'assign_user', label: 'Assign User'},
        {value: 'add_message', label: 'Add Message'},
        {value: 'add_private_message', label: 'Add Private Message'},
        {value: 'notify_creator', label: 'Notify Ticket Creator'},
        {value: 'notify_assigned', label: 'Notify Assigned User'},
    ];

    const getFieldOptions = (field: string) => {
        switch (field) {
            case 'category_id':
                return categories;
            case 'customer_id':
                return customers;
            case 'status_id':
                return statuses;
            case 'user_id':
            case 'assigned_to':
                return users;
            case 'labels':
                return labels;
            case 'priority':
                return [
                    {id: 'low', name: 'Low'},
                    {id: 'normal', name: 'Normal'},
                    {id: 'high', name: 'High'},
                ];
            default:
                return [];
        }
    };

    const getActionValueInput = (action: Action, index: number) => {
        switch (action.type) {
            case 'set_category':
                return (
                    <Select
                        value={action.value}
                        onValueChange={(value) => updateAction(index, 'value', value)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select category"/>
                        </SelectTrigger>
                        <SelectContent>
                            {categories.map((cat) => (
                                <SelectItem key={cat.id} value={cat.id}>
                                    {cat.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                );
            case 'set_status':
                return (
                    <Select
                        value={action.value}
                        onValueChange={(value) => updateAction(index, 'value', value)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select status"/>
                        </SelectTrigger>
                        <SelectContent>
                            {statuses.map((status) => (
                                <SelectItem key={status.id} value={status.id}>
                                    {status.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                );
            case 'assign_user':
                return (
                    <Select
                        value={action.value}
                        onValueChange={(value) => updateAction(index, 'value', value)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select user"/>
                        </SelectTrigger>
                        <SelectContent>
                            {users.map((user) => (
                                <SelectItem key={user.id} value={user.id}>
                                    {user.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                );
            case 'set_priority':
                return (
                    <Select
                        value={action.value}
                        onValueChange={(value) => updateAction(index, 'value', value)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select priority"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="normal">Normal</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                    </Select>
                );
            case 'add_labels':
                return (
                    <Select
                        value={action.value}
                        onValueChange={(value) => updateAction(index, 'value', value)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select label"/>
                        </SelectTrigger>
                        <SelectContent>
                            {labels.map((label) => (
                                <SelectItem key={label.id} value={label.id}>
                                    {label.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                );
            case 'add_message':
            case 'add_private_message':
                return (
                    <Textarea
                        value={action.value || ''}
                        onChange={(e) => updateAction(index, 'value', e.target.value)}
                        placeholder="Enter message text"
                    />
                );
            case 'notify_creator':
            case 'notify_assigned':
                return <p className="text-sm text-muted-foreground">No configuration required</p>;
            default:
                return null;
        }
    };

    return (
        <SidebarProvider>
            <AppSidebar/>
            <SidebarInset>
                <Head title={`Edit ${rule.name}`}/>
                <AppSidebarHeader
                    breadcrumbs={[
                        {label: 'Dashboard', href: route('dashboard')},
                        {label: 'Tickets', href: route('tickets.index')},
                        {label: 'Automation Rules', href: route('tickets.automation-rules.index')},
                        {label: 'Edit'},
                    ]}
                />
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-3xl font-bold tracking-tight">Edit Automation Rule</h2>
                            <p className="text-muted-foreground">
                                Update your automated workflow
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Basic Details */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Rule Details</CardTitle>
                                    <CardDescription>Basic information about this automation rule</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="name">Rule Name *</Label>
                                            <Input
                                                id="name"
                                                value={data.name}
                                                onChange={(e) => setData('name', e.target.value)}
                                                placeholder="e.g., Auto-assign technical issues"
                                                required
                                            />
                                            {errors.name && (
                                                <p className="text-sm text-destructive">{errors.name}</p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="priority">Priority *</Label>
                                            <Input
                                                id="priority"
                                                type="number"
                                                min="0"
                                                value={data.priority}
                                                onChange={(e) => setData('priority', parseInt(e.target.value))}
                                                required
                                            />
                                            <p className="text-xs text-muted-foreground">
                                                Higher priority rules run first
                                            </p>
                                            {errors.priority && (
                                                <p className="text-sm text-destructive">{errors.priority}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="description">Description</Label>
                                        <Textarea
                                            id="description"
                                            value={data.description}
                                            onChange={(e) => setData('description', e.target.value)}
                                            placeholder="Describe what this rule does"
                                        />
                                        {errors.description && (
                                            <p className="text-sm text-destructive">{errors.description}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="trigger">Trigger *</Label>
                                        <Select
                                            value={data.trigger}
                                            onValueChange={(value) => setData('trigger', value as any)}
                                        >
                                            <SelectTrigger>
                                                <SelectValue/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="ticket_created">Ticket Created</SelectItem>
                                                <SelectItem value="ticket_updated">Ticket Updated</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {errors.trigger && (
                                            <p className="text-sm text-destructive">{errors.trigger}</p>
                                        )}
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <Switch
                                            id="is_active"
                                            checked={data.is_active}
                                            onCheckedChange={(checked) => setData('is_active', checked)}
                                        />
                                        <Label htmlFor="is_active">Active</Label>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <Switch
                                            id="stop_processing"
                                            checked={data.stop_processing}
                                            onCheckedChange={(checked) => setData('stop_processing', checked)}
                                        />
                                        <Label htmlFor="stop_processing">Stop processing further rules after this one executes</Label>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Conditions */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Conditions</CardTitle>
                                    <CardDescription>
                                        Define when this rule should apply
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label>Match Type</Label>
                                        <Select
                                            value={data.condition_match}
                                            onValueChange={(value) => setData('condition_match', value as any)}
                                        >
                                            <SelectTrigger>
                                                <SelectValue/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="all">All conditions must match</SelectItem>
                                                <SelectItem value="any">Any condition matches</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {data.conditions.map((condition, index) => (
                                        <div key={index} className="grid grid-cols-12 gap-2 items-end">
                                            <div className="col-span-4 space-y-2">
                                                <Label>Field</Label>
                                                <Select
                                                    value={condition.field}
                                                    onValueChange={(value) => updateCondition(index, 'field', value)}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue/>
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {conditionFields.map((field) => (
                                                            <SelectItem key={field.value} value={field.value}>
                                                                {field.label}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div className="col-span-3 space-y-2">
                                                <Label>Operator</Label>
                                                <Select
                                                    value={condition.operator}
                                                    onValueChange={(value) => updateCondition(index, 'operator', value)}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue/>
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {operators.map((op) => (
                                                            <SelectItem key={op.value} value={op.value}>
                                                                {op.label}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div className="col-span-4 space-y-2">
                                                <Label>Value</Label>
                                                <Select
                                                    value={condition.value}
                                                    onValueChange={(value) => updateCondition(index, 'value', value)}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select value"/>
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {getFieldOptions(condition.field).map((option: any) => (
                                                            <SelectItem key={option.id} value={option.id}>
                                                                {option.name}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div className="col-span-1">
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => removeCondition(index)}
                                                >
                                                    <Trash2 className="h-4 w-4"/>
                                                </Button>
                                            </div>
                                        </div>
                                    ))}

                                    <Button type="button" variant="outline" onClick={addCondition}>
                                        <Plus className="mr-2 h-4 w-4"/>
                                        Add Condition
                                    </Button>
                                    {errors.conditions && (
                                        <p className="text-sm text-destructive">{errors.conditions}</p>
                                    )}
                                </CardContent>
                            </Card>

                            {/* Actions */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Actions</CardTitle>
                                    <CardDescription>
                                        Define what should happen when conditions match
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {data.actions.map((action, index) => (
                                        <div key={index} className="space-y-2 p-4 border rounded-lg">
                                            <div className="flex items-center justify-between">
                                                <Label>Action {index + 1}</Label>
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => removeAction(index)}
                                                >
                                                    <Trash2 className="h-4 w-4"/>
                                                </Button>
                                            </div>

                                            <div className="space-y-2">
                                                <Label>Type</Label>
                                                <Select
                                                    value={action.type}
                                                    onValueChange={(value) => updateAction(index, 'type', value)}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue/>
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {actionTypes.map((type) => (
                                                            <SelectItem key={type.value} value={type.value}>
                                                                {type.label}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div className="space-y-2">
                                                <Label>Value</Label>
                                                {getActionValueInput(action, index)}
                                            </div>
                                        </div>
                                    ))}

                                    <Button type="button" variant="outline" onClick={addAction}>
                                        <Plus className="mr-2 h-4 w-4"/>
                                        Add Action
                                    </Button>
                                    {errors.actions && (
                                        <p className="text-sm text-destructive">{errors.actions}</p>
                                    )}
                                </CardContent>
                            </Card>

                            <div className="flex gap-2">
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Updating...' : 'Update Rule'}
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => router.get(route('tickets.automation-rules.index'))}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
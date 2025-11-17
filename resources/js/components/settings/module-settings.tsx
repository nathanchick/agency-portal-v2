import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {Button} from '@/components/ui/button';
import {Transition} from '@headlessui/react';
import {ChevronDown} from 'lucide-react';
import {router} from '@inertiajs/react';
import {useEffect, useState} from 'react';
import SettingField from './setting-field';

export interface ModuleSetting {
    label: string;
    type: string;
    value: string | null;
    description?: string;
    options?: Record<string, string>;
}

export interface ModuleSettingsData {
    name: string;
    settings: Record<string, ModuleSetting>;
}

interface ModuleSettingsProps {
    moduleSettings: Record<string, ModuleSettingsData>;
    saveUrl: string; // URL to save module settings
    disableCollapse?: boolean; // If true, shows all settings expanded without collapse
}

export default function ModuleSettings({
    moduleSettings,
    saveUrl,
    disableCollapse = false,
}: ModuleSettingsProps) {
    const [openModules, setOpenModules] = useState<Record<string, boolean>>({});
    const [moduleValues, setModuleValues] = useState<
        Record<string, Record<string, string>>
    >({});
    const [savingModule, setSavingModule] = useState<string | null>(null);
    const [savedModule, setSavedModule] = useState<string | null>(null);

    // Initialize module values and open state from props
    useEffect(() => {
        const initialValues: Record<string, Record<string, string>> = {};
        const initialOpenState: Record<string, boolean> = {};

        Object.entries(moduleSettings).forEach(([moduleKey, module]) => {
            // Initialize values from settings
            const settings: Record<string, string> = {};
            Object.entries(module.settings).forEach(([key, setting]) => {
                settings[key] = setting.value ?? '';
            });
            initialValues[moduleKey] = settings;

            // Set initial open state based on status
            const statusValue = module.settings.status?.value;
            initialOpenState[moduleKey] = statusValue === '1';
        });

        setModuleValues(initialValues);
        setOpenModules(initialOpenState);
    }, [moduleSettings]);

    if (!moduleSettings || Object.keys(moduleSettings).length === 0) {
        return null;
    }

    const toggleModule = (moduleKey: string) => {
        setOpenModules((prev) => ({
            ...prev,
            [moduleKey]: !prev[moduleKey],
        }));
    };

    const handleSettingChange = (
        moduleName: string,
        settingKey: string,
        value: string,
    ) => {
        setModuleValues((prev) => ({
            ...prev,
            [moduleName]: {
                ...prev[moduleName],
                [settingKey]: value,
            },
        }));

        // Auto-expand/collapse when status changes
        if (settingKey === 'status') {
            setOpenModules((prev) => ({
                ...prev,
                [moduleName]: value === '1',
            }));
        }
    };

    const handleSaveModule = (moduleKey: string) => {
        setSavingModule(moduleKey);
        setSavedModule(null);

        router.patch(
            saveUrl,
            {
                module_name: moduleKey,
                settings: moduleValues[moduleKey],
            },
            {
                preserveScroll: true,
                onSuccess: () => {
                    setSavingModule(null);
                    setSavedModule(moduleKey);
                    setTimeout(() => setSavedModule(null), 3000);
                },
                onError: () => {
                    setSavingModule(null);
                },
            },
        );
    };

    return (
        <div className="space-y-6">
            <h3 className="text-lg font-semibold">Additional Settings</h3>

            {Object.entries(moduleSettings).map(([moduleKey, module]) => {
                const isEnabled =
                    (moduleValues[moduleKey]?.['status'] ?? '0') === '1';
                const isOpen = openModules[moduleKey] ?? false;
                const isSaving = savingModule === moduleKey;
                const isSaved = savedModule === moduleKey;

                // Separate status from other settings
                const statusSetting = module.settings.status
                    ? {status: module.settings.status}
                    : {};
                const otherSettings = Object.fromEntries(
                    Object.entries(module.settings).filter(
                        ([key]) => key !== 'status',
                    ),
                );
                const hasOtherSettings = Object.keys(otherSettings).length > 0;

                return (
                    <Card key={moduleKey}>
                        <CardHeader>
                            <CardTitle>{module.name}</CardTitle>
                            <CardDescription>
                                Configure {module.name} settings
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {/* Render status toggle first */}
                            {statusSetting.status && (
                                <SettingField
                                    key={`${moduleKey}_status`}
                                    moduleName={moduleKey}
                                    settingKey="status"
                                    label={statusSetting.status.label}
                                    type={statusSetting.status.type}
                                    value={
                                        moduleValues[moduleKey]?.['status'] ??
                                        statusSetting.status.value
                                    }
                                    description={statusSetting.status.description}
                                    options={statusSetting.status.options}
                                    onChange={handleSettingChange}
                                />
                            )}

                            {/* Collapsible section for other settings (or show directly if collapse disabled) */}
                            {hasOtherSettings && !disableCollapse && (
                                <Collapsible
                                    open={isOpen}
                                    onOpenChange={() => toggleModule(moduleKey)}
                                >
                                    <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md border p-3 hover:bg-muted/50">
                                        <span className="text-sm font-medium">
                                            {isEnabled
                                                ? 'Additional Configuration'
                                                : 'Enable to configure'}
                                        </span>
                                        <ChevronDown
                                            className={`h-4 w-4 transition-transform ${
                                                isOpen ? 'rotate-180' : ''
                                            }`}
                                        />
                                    </CollapsibleTrigger>
                                    <CollapsibleContent className="mt-4 space-y-4">
                                        {Object.entries(otherSettings).map(
                                            ([settingKey, setting]) => (
                                                <SettingField
                                                    key={`${moduleKey}_${settingKey}`}
                                                    moduleName={moduleKey}
                                                    settingKey={settingKey}
                                                    label={setting.label}
                                                    type={setting.type}
                                                    value={
                                                        moduleValues[moduleKey]?.[
                                                            settingKey
                                                        ] ?? setting.value
                                                    }
                                                    description={setting.description}
                                                    options={setting.options}
                                                    onChange={handleSettingChange}
                                                />
                                            ),
                                        )}
                                    </CollapsibleContent>
                                </Collapsible>
                            )}

                            {/* Show settings directly without collapse */}
                            {hasOtherSettings && disableCollapse && (
                                <div className="space-y-4">
                                    {Object.entries(otherSettings).map(
                                        ([settingKey, setting]) => (
                                            <SettingField
                                                key={`${moduleKey}_${settingKey}`}
                                                moduleName={moduleKey}
                                                settingKey={settingKey}
                                                label={setting.label}
                                                type={setting.type}
                                                value={
                                                    moduleValues[moduleKey]?.[
                                                        settingKey
                                                    ] ?? setting.value
                                                }
                                                description={setting.description}
                                                options={setting.options}
                                                onChange={handleSettingChange}
                                            />
                                        ),
                                    )}
                                </div>
                            )}
                        </CardContent>
                        <CardFooter className="flex items-center gap-4">
                            <Button
                                onClick={() => handleSaveModule(moduleKey)}
                                disabled={isSaving}
                            >
                                {isSaving ? 'Saving...' : 'Save'}
                            </Button>
                            <Transition
                                show={isSaved}
                                enter="transition ease-in-out"
                                enterFrom="opacity-0"
                                leave="transition ease-in-out"
                                leaveTo="opacity-0"
                            >
                                <p className="text-sm text-green-600">Saved ✓</p>
                            </Transition>
                        </CardFooter>
                    </Card>
                );
            })}
        </div>
    );
}

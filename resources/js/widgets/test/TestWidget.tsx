/**
 * Test Widget Component
 *
 * This is a simple test widget to verify the widget registry system works correctly.
 * It demonstrates the basic structure that all widgets should follow.
 */

import { WidgetProps } from '../index'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { TestTube } from 'lucide-react'

export function TestWidget({ settings, isEditing }: WidgetProps) {
    return (
        <Card>
            <CardHeader>
                <div className="flex items-center gap-2">
                    <TestTube className="h-5 w-5 text-primary" />
                    <CardTitle>Test Widget</CardTitle>
                </div>
                <CardDescription>
                    This is a test widget to verify the registry system
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-2 text-sm">
                    <p>
                        <strong>Is Editing:</strong> {isEditing ? 'Yes' : 'No'}
                    </p>
                    {settings && Object.keys(settings).length > 0 && (
                        <>
                            <p><strong>Settings:</strong></p>
                            <pre className="bg-muted p-2 rounded text-xs">
                                {JSON.stringify(settings, null, 2)}
                            </pre>
                        </>
                    )}
                    {(!settings || Object.keys(settings).length === 0) && (
                        <p className="text-muted-foreground">No settings configured</p>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}

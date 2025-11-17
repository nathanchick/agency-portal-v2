import React, { Component, ErrorInfo, ReactNode } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { AlertCircle, X } from 'lucide-react'

interface WidgetErrorBoundaryProps {
    children: ReactNode
    widgetKey: string
    widgetName?: string
    onRemove?: () => void
}

interface WidgetErrorBoundaryState {
    hasError: boolean
    error: Error | null
    errorInfo: ErrorInfo | null
}

/**
 * WidgetErrorBoundary - Error boundary component for widgets
 *
 * Catches React errors in child widget components and displays a fallback UI.
 * Prevents one widget error from breaking the entire dashboard.
 *
 * Usage:
 * <WidgetErrorBoundary widgetKey="tickets.recent" widgetName="Recent Tickets" onRemove={handleRemove}>
 *   <TicketWidget />
 * </WidgetErrorBoundary>
 */
export class WidgetErrorBoundary extends Component<WidgetErrorBoundaryProps, WidgetErrorBoundaryState> {
    constructor(props: WidgetErrorBoundaryProps) {
        super(props)
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null,
        }
    }

    static getDerivedStateFromError(error: Error): Partial<WidgetErrorBoundaryState> {
        // Update state so the next render will show the fallback UI
        return {
            hasError: true,
            error,
        }
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        // Log error details to console for debugging
        console.error('Widget Error Boundary caught an error:', {
            widgetKey: this.props.widgetKey,
            widgetName: this.props.widgetName,
            error: error.toString(),
            errorMessage: error.message,
            stack: error.stack,
            componentStack: errorInfo.componentStack,
            timestamp: new Date().toISOString(),
        })

        // Update state with error info
        this.setState({
            errorInfo,
        })

        // Optional: Send error to error reporting service
        // reportErrorToService(error, errorInfo, this.props.widgetKey)
    }

    handleReset = () => {
        // Reset error state to attempt re-render
        this.setState({
            hasError: false,
            error: null,
            errorInfo: null,
        })
    }

    handleRemove = () => {
        // Call parent remove handler if provided
        if (this.props.onRemove) {
            this.props.onRemove()
        }
    }

    render() {
        if (this.state.hasError) {
            // Render error fallback UI
            return (
                <Card className="border-destructive">
                    <CardHeader>
                        <div className="flex items-start justify-between">
                            <div className="flex items-center gap-2">
                                <AlertCircle className="h-5 w-5 text-destructive" />
                                <div>
                                    <CardTitle className="text-lg">
                                        {this.props.widgetName || 'Widget'}
                                    </CardTitle>
                                    <CardDescription className="text-destructive">
                                        Failed to load
                                    </CardDescription>
                                </div>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Widget Error</AlertTitle>
                            <AlertDescription>
                                <p className="mb-2">
                                    This widget encountered an error and could not be displayed.
                                </p>
                                {this.state.error && (
                                    <details className="mt-2">
                                        <summary className="cursor-pointer text-xs font-medium">
                                            Error Details
                                        </summary>
                                        <pre className="mt-2 text-xs overflow-auto p-2 bg-destructive/10 rounded">
                                            {this.state.error.message}
                                        </pre>
                                    </details>
                                )}
                            </AlertDescription>
                        </Alert>

                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={this.handleReset}
                                className="gap-2"
                            >
                                Try Again
                            </Button>
                            {this.props.onRemove && (
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={this.handleRemove}
                                    className="gap-2"
                                >
                                    <X className="h-4 w-4" />
                                    Remove Widget
                                </Button>
                            )}
                        </div>

                        <p className="text-xs text-muted-foreground">
                            Widget key: <code className="font-mono">{this.props.widgetKey}</code>
                        </p>
                    </CardContent>
                </Card>
            )
        }

        // No error, render children normally
        return this.props.children
    }
}

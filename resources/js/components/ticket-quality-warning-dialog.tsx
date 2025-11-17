import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';
import { TicketQualityAnalysis } from '@/types/ticket-quality';

interface TicketQualityWarningDialogProps {
    open: boolean;
    analysis: TicketQualityAnalysis;
    minScore: number;
    onProceed: () => void;
    onCancel: () => void;
}

export function TicketQualityWarningDialog({
    open,
    analysis,
    minScore,
    onProceed,
    onCancel,
}: TicketQualityWarningDialogProps) {
    const getScoreColor = (score: number) => {
        if (score >= 75) return 'text-green-600';
        if (score >= 60) return 'text-yellow-600';
        return 'text-red-600';
    };

    // Count high and medium severity suggestions
    const highSeverity = analysis.suggestions.filter(s => s.severity === 'high').length;
    const mediumSeverity = analysis.suggestions.filter(s => s.severity === 'medium').length;

    return (
        <Dialog open={open} onOpenChange={onCancel}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-yellow-600" />
                        Low Quality Score Detected
                    </DialogTitle>
                    <DialogDescription>
                        Your ticket quality score is below the recommended threshold.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                    <Alert variant="destructive">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription>
                            <div className="flex items-center justify-between mb-2">
                                <span className="font-semibold">Quality Score:</span>
                                <span className={`text-2xl font-bold ${getScoreColor(analysis.overallScore)}`}>
                                    {analysis.overallScore}/100
                                </span>
                            </div>
                            <div className="text-sm">
                                Recommended minimum: {minScore}/100
                            </div>
                        </AlertDescription>
                    </Alert>

                    {(highSeverity > 0 || mediumSeverity > 0) && (
                        <div className="space-y-2">
                            <p className="text-sm font-medium">Outstanding suggestions:</p>
                            <ul className="text-sm space-y-1 list-disc list-inside">
                                {highSeverity > 0 && (
                                    <li className="text-red-600">
                                        {highSeverity} high priority issue{highSeverity > 1 ? 's' : ''}
                                    </li>
                                )}
                                {mediumSeverity > 0 && (
                                    <li className="text-yellow-600">
                                        {mediumSeverity} medium priority suggestion{mediumSeverity > 1 ? 's' : ''}
                                    </li>
                                )}
                            </ul>
                        </div>
                    )}

                    <p className="text-sm text-muted-foreground">
                        Improving your ticket quality helps us provide faster and more accurate support.
                        Would you like to go back and make improvements?
                    </p>
                </div>

                <DialogFooter className="gap-2 sm:gap-0">
                    <Button onClick={onCancel} variant="outline">
                        Go Back & Improve
                    </Button>
                    <Button onClick={onProceed} variant="default">
                        Submit Anyway
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

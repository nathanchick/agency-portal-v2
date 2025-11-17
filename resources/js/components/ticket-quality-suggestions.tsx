import React from 'react';
import { TicketQualityAnalysis, QualityThresholds } from '@/types/ticket-quality';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { CheckCircle2, AlertTriangle, Info, Sparkles } from 'lucide-react';

interface TicketQualitySuggestionsProps {
    open: boolean;
    analysis: TicketQualityAnalysis;
    thresholds?: QualityThresholds;
    onCreateTicket: () => void;
    onContinueWriting: () => void;
}

export function TicketQualitySuggestions({
    open,
    analysis,
    thresholds = { good: 75, fair: 60 },
    onCreateTicket,
    onContinueWriting,
}: TicketQualitySuggestionsProps) {
    // Add unique IDs to suggestions if they don't have them, and filter out low-severity
    const suggestions = analysis.suggestions
        .filter((s) => s.severity !== 'low') // Filter out low-severity suggestions
        .map((s, idx) => ({
            ...s,
            id: s.id || `suggestion-${idx}`,
        }));

    // Group suggestions by severity
    const highSeverity = suggestions.filter((s) => s.severity === 'high');
    const mediumSeverity = suggestions.filter((s) => s.severity === 'medium');

    const getQualityScoreColor = (score: number) => {
        if (score >= thresholds.good) return 'text-green-600';
        if (score >= thresholds.fair) return 'text-yellow-600';
        return 'text-red-600';
    };

    const getQualityScoreLabel = (score: number) => {
        if (score >= thresholds.good) return 'Good';
        if (score >= thresholds.fair) return 'Fair';
        return 'Needs Improvement';
    };

    const getSeverityIcon = (severity: string) => {
        switch (severity) {
            case 'high':
                return <AlertTriangle className="h-4 w-4 text-red-500" />;
            case 'medium':
                return <Info className="h-4 w-4 text-yellow-500" />;
            case 'low':
                return <CheckCircle2 className="h-4 w-4 text-blue-500" />;
            default:
                return null;
        }
    };

    const getSeverityBadgeVariant = (severity: string) => {
        switch (severity) {
            case 'high':
                return 'destructive';
            case 'medium':
                return 'default';
            case 'low':
                return 'secondary';
            default:
                return 'outline';
        }
    };

    const SuggestionCard = ({ suggestion }: { suggestion: any }) => {
        return (
            <div className="mb-3 rounded-lg border p-4 bg-card">
                <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                        {getSeverityIcon(suggestion.severity)}
                        <h4 className="text-sm font-medium ml-2">
                            {suggestion.field.charAt(0).toUpperCase() + suggestion.field.slice(1)}: {suggestion.message}
                        </h4>
                    </div>
                    <Badge className="ml-2" variant={getSeverityBadgeVariant(suggestion.severity)}>
                        {suggestion.severity}
                    </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{suggestion.suggestion}</p>
            </div>
        );
    };

    return (
        <Dialog open={open} onOpenChange={onContinueWriting}>
            <DialogContent className="max-w-3xl max-h-[90vh] flex flex-col">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-purple-600" />
                        AI Suggestions <Badge className="ml-2">Beta</Badge>
                    </DialogTitle>
                    <p className="text-sm pt-2">
                        This is a new feature we are currently trailing to try and improve the level
                        of service we provide. Sometimes the suggestions may not be accurate.</p>
                    <p className="text-sm pt-2">
                        Please use your best judgement when applying them.
                    </p>
                    <DialogDescription className="flex items-center gap-3 pt-2">
                        <span className="text-sm">Quality Score:</span>
                        <span className={`text-2xl font-bold ${getQualityScoreColor(analysis.overallScore)}`}>
                            {analysis.overallScore}/100
                        </span>
                        <Badge variant="outline">{getQualityScoreLabel(analysis.overallScore)}</Badge>
                    </DialogDescription>
                </DialogHeader>

                {/* Content */}
                <div className="flex-1 overflow-y-auto pr-2">
                    {suggestions.length === 0 ? (
                        <Alert>
                            <CheckCircle2 className="h-4 w-4" />
                            <AlertDescription>
                                Great job! Your ticket looks good. No suggestions at this time.
                            </AlertDescription>
                        </Alert>
                    ) : (
                        <>
                            {highSeverity.length > 0 && (
                                <div className="mb-6">
                                    {highSeverity.map((suggestion) => (
                                        <SuggestionCard key={suggestion.id} suggestion={suggestion} />
                                    ))}
                                </div>
                            )}

                            {mediumSeverity.length > 0 && (
                                <div className="mb-6">
                                    {mediumSeverity.map((suggestion) => (
                                        <SuggestionCard key={suggestion.id} suggestion={suggestion} />
                                    ))}
                                </div>
                            )}

                            {/* Platform Context */}
                            {analysis.platformContext && analysis.platformContext.relevantInfo.length > 0 && (
                                <Alert className="mt-4">
                                    <Info className="h-4 w-4" />
                                    <AlertDescription>
                                        <strong>
                                            Platform Tips
                                            {analysis.platformContext.platform && ` (${analysis.platformContext.platform})`}:
                                        </strong>
                                        <ul className="list-disc mt-2">
                                            {analysis.platformContext.relevantInfo.map((info, idx) => (
                                                <li key={idx}>{info}</li>
                                            ))}
                                        </ul>
                                    </AlertDescription>
                                </Alert>
                            )}
                        </>
                    )}
                </div>

                {/* Footer */}
                <DialogFooter className="gap-2 sm:gap-0">
                    <Button onClick={onContinueWriting} variant="outline">
                        Continue Writing
                    </Button>
                    <Button onClick={onCreateTicket} variant="default">
                        Create Ticket
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
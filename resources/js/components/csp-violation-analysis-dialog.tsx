import React from 'react';
import { CspViolationAnalysis } from '@/types/csp-analysis';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Shield, AlertTriangle, CheckCircle2, HelpCircle, Sparkles } from 'lucide-react';

interface CspViolationAnalysisDialogProps {
    analysis: CspViolationAnalysis;
    isOpen: boolean;
    onClose: () => void;
}

export function CspViolationAnalysisDialog({
    analysis,
    isOpen,
    onClose,
}: CspViolationAnalysisDialogProps) {
    const getTrustBadgeConfig = (trust: string | null) => {
        switch (trust) {
            case 'trusted':
                return {
                    variant: 'outline' as const,
                    className: 'border-green-200 bg-green-50 text-green-700',
                    icon: CheckCircle2,
                    label: 'Trusted',
                };
            case 'caution':
                return {
                    variant: 'outline' as const,
                    className: 'border-yellow-200 bg-yellow-50 text-yellow-700',
                    icon: AlertTriangle,
                    label: 'Caution',
                };
            case 'risky':
                return {
                    variant: 'destructive' as const,
                    className: '',
                    icon: AlertTriangle,
                    label: 'Risky',
                };
            case 'unknown':
            default:
                return {
                    variant: 'secondary' as const,
                    className: '',
                    icon: HelpCircle,
                    label: 'Unknown',
                };
        }
    };

    const getRiskBadgeConfig = (risk: string | null) => {
        switch (risk) {
            case 'low':
                return {
                    variant: 'outline' as const,
                    className: 'border-green-200 bg-green-50 text-green-700',
                    label: 'Low Risk',
                };
            case 'medium':
                return {
                    variant: 'outline' as const,
                    className: 'border-yellow-200 bg-yellow-50 text-yellow-700',
                    label: 'Medium Risk',
                };
            case 'high':
                return {
                    variant: 'destructive' as const,
                    className: '',
                    label: 'High Risk',
                };
            default:
                return {
                    variant: 'secondary' as const,
                    className: '',
                    label: 'Unknown Risk',
                };
        }
    };

    const trustConfig = getTrustBadgeConfig(analysis.trust_assessment);
    const riskConfig = getRiskBadgeConfig(analysis.risk_level);
    const TrustIcon = trustConfig.icon;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-purple-600" />
                        Security Analysis
                        <Badge className="ml-2">AI-Powered</Badge>
                    </DialogTitle>
                </DialogHeader>

                {/* Content */}
                <div className="flex-1 overflow-y-auto pr-2">
                    <div className="space-y-6">
                        {/* Assessment Badges */}
                        <div className="flex items-center gap-3 pb-4 border-b">
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-medium">Trust Assessment:</span>
                                <Badge variant={trustConfig.variant} className={`gap-1 ${trustConfig.className}`}>
                                    <TrustIcon className="h-3 w-3" />
                                    {trustConfig.label}
                                </Badge>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-medium">Risk Level:</span>
                                <Badge variant={riskConfig.variant} className={riskConfig.className}>
                                    {riskConfig.label}
                                </Badge>
                            </div>
                        </div>

                        {/* Findings */}
                        {analysis.findings && analysis.findings.length > 0 && (
                            <div>
                                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                                    <Shield className="h-5 w-5" />
                                    Detailed Findings
                                </h3>
                                <div className="space-y-4">
                                    {analysis.findings.map((finding, idx) => (
                                        <div key={idx} className="rounded-lg border p-4 bg-card">
                                            <div className="mb-2">
                                                <h4 className="text-sm font-medium mb-1">URL:</h4>
                                                <p className="text-sm font-mono text-muted-foreground break-all bg-muted p-2 rounded">
                                                    {finding.url}
                                                </p>
                                            </div>
                                            <div className="mb-2">
                                                <h4 className="text-sm font-medium mb-1">Description:</h4>
                                                <p className="text-sm text-muted-foreground">{finding.description}</p>
                                            </div>
                                            {finding.concerns && (Array.isArray(finding.concerns) ? finding.concerns.length > 0 : true) && (
                                                <div>
                                                    <h4 className="text-sm font-medium mb-1">Concerns:</h4>
                                                    <ul className="list-disc list-inside space-y-1">
                                                        {(Array.isArray(finding.concerns) ? finding.concerns : [finding.concerns]).map((concern, cIdx) => (
                                                            <li key={cIdx} className="text-sm text-muted-foreground">
                                                                {concern}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Recommendations */}
                        {analysis.recommendations && analysis.recommendations.length > 0 && (
                            <div>
                                <h3 className="text-lg font-semibold mb-3">Recommendations</h3>
                                <ul className="list-disc list-inside space-y-2">
                                    {analysis.recommendations.map((recommendation, idx) => (
                                        <li key={idx} className="text-sm text-muted-foreground">
                                            {recommendation}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Usage Stats */}
                        {(analysis.tokens_used || analysis.cost) && (
                            <div className="pt-4 border-t">
                                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                    {analysis.model && (
                                        <span>Model: {analysis.model}</span>
                                    )}
                                    {analysis.tokens_used && (
                                        <span>Tokens: {analysis.tokens_used.toLocaleString()}</span>
                                    )}
                                    {analysis.cost && (
                                        <span>Cost: ${analysis.cost.toFixed(4)}</span>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer */}
                <DialogFooter>
                    <Button onClick={onClose} variant="default">
                        Close
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

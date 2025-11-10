import {Badge} from '@/components/ui/badge';
import {HelpCircle} from 'lucide-react';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';

interface CoreWebVitalsProps {
    firstContentfulPaintMs: number | null;
    speedIndexMs: number | null;
    largestContentfulPaintMs: number | null;
    timeToInteractiveMs: number | null;
    totalBlockingTimeMs: number | null;
    cumulativeLayoutShift: number | null;
}

interface Metric {
    label: string;
    shortLabel: string;
    value: number | null;
    unit: string;
    thresholds: {good: number; poor: number};
    lowerIsBetter: boolean;
    description: string;
}

export default function CoreWebVitals({
    firstContentfulPaintMs,
    speedIndexMs,
    largestContentfulPaintMs,
    timeToInteractiveMs,
    totalBlockingTimeMs,
    cumulativeLayoutShift,
}: CoreWebVitalsProps) {
    const metrics: Metric[] = [
        {
            label: 'First contentful paint',
            shortLabel: 'FCP',
            value: firstContentfulPaintMs,
            unit: 'ms',
            thresholds: {good: 1800, poor: 3000},
            lowerIsBetter: true,
            description: 'First Contentful Paint marks the time at which the first text or image is painted.',
        },
        {
            label: 'Speed index',
            shortLabel: 'SI',
            value: speedIndexMs,
            unit: 'ms',
            thresholds: {good: 3400, poor: 5800},
            lowerIsBetter: true,
            description: 'Speed Index shows how quickly the contents of a page are visibly populated.',
        },
        {
            label: 'Largest contentful paint',
            shortLabel: 'LCP',
            value: largestContentfulPaintMs,
            unit: 'ms',
            thresholds: {good: 2500, poor: 4000},
            lowerIsBetter: true,
            description: 'Largest Contentful Paint marks the time at which the largest text or image is painted.',
        },
        {
            label: 'Time to interactive',
            shortLabel: 'TTI',
            value: timeToInteractiveMs,
            unit: 'ms',
            thresholds: {good: 3800, poor: 7300},
            lowerIsBetter: true,
            description: 'Time to Interactive is the amount of time it takes for the page to become fully interactive.',
        },
        {
            label: 'Total blocking time',
            shortLabel: 'TBT',
            value: totalBlockingTimeMs,
            unit: 'ms',
            thresholds: {good: 200, poor: 600},
            lowerIsBetter: true,
            description: 'Sum of all time periods between FCP and Time to Interactive, when task length exceeded 50ms.',
        },
        {
            label: 'Cumulative layout shift',
            shortLabel: 'CLS',
            value: cumulativeLayoutShift,
            unit: '',
            thresholds: {good: 0.1, poor: 0.25},
            lowerIsBetter: true,
            description: 'Cumulative Layout Shift measures the movement of visible elements within the viewport.',
        },
    ];

    const getStatus = (metric: Metric): 'good' | 'needs-improvement' | 'poor' | 'unknown' => {
        if (metric.value === null) return 'unknown';

        if (metric.lowerIsBetter) {
            if (metric.value <= metric.thresholds.good) return 'good';
            if (metric.value <= metric.thresholds.poor) return 'needs-improvement';
            return 'poor';
        } else {
            if (metric.value >= metric.thresholds.good) return 'good';
            if (metric.value >= metric.thresholds.poor) return 'needs-improvement';
            return 'poor';
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'good':
                return '#0CCE6B';
            case 'needs-improvement':
                return '#FFA400';
            case 'poor':
                return '#FF4E42';
            default:
                return '#9ca3af';
        }
    };

    const formatValue = (metric: Metric): string => {
        if (metric.value === null) return '-';
        if (metric.unit === 'ms') {
            // Format with thousands separator and one decimal
            const seconds = metric.value / 1000;
            return `${seconds.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}s`;
        }
        if (metric.unit === '') {
            return metric.value.toFixed(2);
        }
        return `${Math.round(metric.value)}${metric.unit}`;
    };

    const getThresholdMessage = (metric: Metric, status: string): string | null => {
        if (status === 'poor') {
            const threshold = metric.thresholds.poor;
            if (metric.unit === 'ms') {
                return `above expected ${(threshold / 1000).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} s`;
            }
            return `above expected ${threshold}`;
        }
        return null;
    };

    return (
        <TooltipProvider>
            <div className="grid grid-cols-3 gap-x-8 gap-y-6">
                {metrics.map((metric) => {
                    const status = getStatus(metric);
                    const color = getStatusColor(status);
                    const thresholdMessage = getThresholdMessage(metric, status);

                    return (
                        <div key={metric.label} className="space-y-1">
                            <div className="flex items-center gap-1.5">
                                <div
                                    className="w-2 h-2 rounded-full flex-shrink-0"
                                    style={{backgroundColor: color}}
                                />
                                <span className="text-sm text-gray-700">{metric.label}</span>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <HelpCircle className="w-3.5 h-3.5 text-gray-400 cursor-help"/>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p className="max-w-xs text-sm">{metric.description}</p>
                                    </TooltipContent>
                                </Tooltip>
                            </div>
                            <div className="text-3xl font-semibold" style={{color}}>
                                {formatValue(metric)}
                            </div>
                            {thresholdMessage && (
                                <Badge variant="destructive" className="text-xs font-normal">
                                    {thresholdMessage}
                                </Badge>
                            )}
                        </div>
                    );
                })}
            </div>
        </TooltipProvider>
    );
}

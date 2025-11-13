import {format} from 'date-fns';

interface UptimeMetric {
    datetime: string;
    was_successful?: boolean;
}

interface UptimeVisualizationProps {
    metrics: UptimeMetric[];
}

export default function UptimeVisualization({metrics}: UptimeVisualizationProps) {
    // Filter out future time slots
    const now = new Date();
    const validMetrics = metrics.filter((metric) => {
        if (!metric.datetime) return false;

        try {
            const metricTime = new Date(metric.datetime);
            // Only show metrics up to current time
            return metricTime <= now;
        } catch {
            return false;
        }
    });

    if (validMetrics.length === 0) {
        return (
            <div className="flex h-8 items-center justify-center rounded bg-muted">
                <span className="text-xs text-muted-foreground">No data available</span>
            </div>
        );
    }

    const startTime = validMetrics[0]?.datetime;
    const endTime = validMetrics[validMetrics.length - 1]?.datetime;

    const formatTime = (time: string | undefined) => {
        if (!time) return '';
        try {
            return format(new Date(time), 'yyyy-MM-dd HH:mm');
        } catch {
            return time;
        }
    };

    return (
        <div className="space-y-2">
            <div className="flex gap-px">
                {validMetrics.map((metric, index) => (
                    <div
                        key={index}
                        className={`h-8 flex-1 ${
                            metric.was_successful === false ? 'bg-red-500' : 'bg-green-500'
                        }`}
                        title={`${formatTime(metric.datetime)} - ${
                            metric.was_successful === false ? 'Down' : 'Up'
                        }`}
                    />
                ))}
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
                <span>{formatTime(startTime)}</span>
                <span>{formatTime(endTime)}</span>
            </div>
        </div>
    );
}

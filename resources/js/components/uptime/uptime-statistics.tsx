import {Badge} from '@/components/ui/badge';
import {Button} from '@/components/ui/button';
import {Download} from 'lucide-react';

interface UptimeStatisticsProps {
    uptimePercentage7Days: number;
    uptimePercentage12Months: number;
    onDailyUptimeClick?: () => void;
    onRunHistoryClick?: () => void;
}

export default function UptimeStatistics({
    uptimePercentage7Days,
    uptimePercentage12Months,
    onDailyUptimeClick,
    onRunHistoryClick,
}: UptimeStatisticsProps) {
    const getBadgeVariant = (percentage: number): 'default' | 'destructive' | 'secondary' => {
        if (percentage === 100) return 'destructive';
        if (percentage >= 99) return 'default';
        return 'secondary';
    };

    return (
        <div className="flex items-center justify-between border-t pt-4">
            <div className="flex gap-6">
                <div className="flex items-center gap-2 border-r pr-6">
                    <span className="text-sm text-muted-foreground">Past 7 days</span>
                    <Badge variant={getBadgeVariant(uptimePercentage7Days)} className="text-sm font-bold">
                        {uptimePercentage7Days.toFixed(2)}%
                    </Badge>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Past 12 months</span>
                    <Badge variant="secondary" className="text-sm">
                        {uptimePercentage12Months.toFixed(2)}%
                    </Badge>
                </div>
            </div>

            <div className="flex gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={onDailyUptimeClick}
                >
                    <Download className="mr-2 h-4 w-4"/>
                    DAILY UPTIME
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={onRunHistoryClick}
                >
                    <Download className="mr-2 h-4 w-4"/>
                    RUN HISTORY
                </Button>
            </div>
        </div>
    );
}

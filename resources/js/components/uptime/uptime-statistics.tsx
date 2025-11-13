import {Badge} from '@/components/ui/badge';
import {Button} from '@/components/ui/button';
import {Download} from 'lucide-react';

interface UptimeStatisticsProps {
    uptimePercentage7Days: number;
    uptimePercentage12Months: number;
}

export default function UptimeStatistics({
    uptimePercentage7Days,
    uptimePercentage12Months,
}: UptimeStatisticsProps) {
    const getBadgeVariant = (percentage: number): 'default' | 'destructive' | 'secondary' => {
        if (percentage >= 99) return 'default';        // Green for excellent uptime (99-100%)
        if (percentage >= 95) return 'secondary';      // Yellow for good uptime (95-99%)
        return 'destructive';                          // Red for poor uptime (<95%)
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
        </div>
    );
}

interface DailyBreakdown {
    date: string;
    label: string;
    uptime_percentage: number;
}

interface DailyUptimeBreakdownProps {
    breakdown: DailyBreakdown[];
}

export default function DailyUptimeBreakdown({breakdown}: DailyUptimeBreakdownProps) {
    if (breakdown.length === 0) {
        return null;
    }

    return (
        <div className="grid grid-cols-4 gap-4 md:grid-cols-8">
            {breakdown.map((day, index) => {
                // Color based on uptime percentage
                let dotColor = 'bg-green-500'; // Good (99%+)
                if (day.uptime_percentage < 99) {
                    dotColor = 'bg-yellow-500'; // Warning (95-99%)
                }
                if (day.uptime_percentage < 95) {
                    dotColor = 'bg-red-500'; // Critical (<95%)
                }

                return (
                    <div key={index} className="text-center">
                        <div className="flex items-center justify-center gap-1 mb-1">
                            <div className={`h-2 w-2 rounded-full ${dotColor}`}/>
                            <span className="text-sm font-bold">{day.uptime_percentage.toFixed(1)}%</span>
                        </div>
                        <span className="text-xs text-muted-foreground">{day.label}</span>
                    </div>
                );
            })}
        </div>
    );
}

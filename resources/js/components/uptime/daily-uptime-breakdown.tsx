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
            {breakdown.map((day, index) => (
                <div key={index} className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                        <div className={`h-2 w-2 rounded-full ${
                            day.uptime_percentage === 100 ? 'bg-green-500' : 'bg-red-500'
                        }`}/>
                        <span className="text-sm font-bold">{day.uptime_percentage.toFixed(0)}%</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{day.label}</span>
                </div>
            ))}
        </div>
    );
}

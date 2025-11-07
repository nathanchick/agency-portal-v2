import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';
import {format} from 'date-fns';

interface PerformanceMetric {
    datetime: string;
    total_time_in_seconds?: number;
    dns_time_in_seconds?: number;
    tcp_time_in_seconds?: number;
    ssl_handshake_time_in_seconds?: number;
    download_time_in_seconds?: number;
}

interface PerformanceHistoryChartProps {
    metrics: PerformanceMetric[];
    range: string;
    onRangeChange: (range: string) => void;
}

export default function PerformanceHistoryChart({metrics, range, onRangeChange}: PerformanceHistoryChartProps) {
    // Calculate statistics
    const responseTimes = metrics
        .map(m => (m.total_time_in_seconds ?? 0) * 1000)
        .filter(t => t > 0);

    const highest = responseTimes.length > 0 ? Math.max(...responseTimes) : 0;
    const lowest = responseTimes.length > 0 ? Math.min(...responseTimes) : 0;
    const average = responseTimes.length > 0
        ? responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length
        : 0;

    // Transform data for chart
    const chartData = metrics.map(metric => ({
        time: metric.datetime,
        total: (metric.total_time_in_seconds ?? 0) * 1000,
        dns: (metric.dns_time_in_seconds ?? 0) * 1000,
        tcp: (metric.tcp_time_in_seconds ?? 0) * 1000,
        ssl: (metric.ssl_handshake_time_in_seconds ?? 0) * 1000,
        download: (metric.download_time_in_seconds ?? 0) * 1000,
    }));

    const formatTime = (time: string) => {
        try {
            const date = new Date(time);
            return format(date, range === 'hour' ? 'HH:mm' : 'MMM d HH:mm');
        } catch {
            return time;
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Performance history</h3>
                <Select value={range} onValueChange={onRangeChange}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select range"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="hour">Last hour</SelectItem>
                        <SelectItem value="day">Last day</SelectItem>
                        <SelectItem value="week">Last week</SelectItem>
                        <SelectItem value="month">Last month</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                    <span className="text-muted-foreground uppercase">Highest</span>
                    <div className="flex items-center gap-1">
                        <div className="h-2 w-2 rounded-full bg-green-500"/>
                        <span className="font-medium">{Math.round(highest)}ms</span>
                    </div>
                </div>
                <div>
                    <span className="text-muted-foreground uppercase">Lowest</span>
                    <div className="flex items-center gap-1">
                        <div className="h-2 w-2 rounded-full bg-green-500"/>
                        <span className="font-medium">{Math.round(lowest)}ms</span>
                    </div>
                </div>
                <div>
                    <span className="text-muted-foreground uppercase">Average</span>
                    <div className="flex items-center gap-1">
                        <div className="h-2 w-2 rounded-full bg-green-500"/>
                        <span className="font-medium">{Math.round(average)}ms</span>
                    </div>
                </div>
            </div>

            <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={chartData}>
                    <defs>
                        <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#fbbf24" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#fbbf24" stopOpacity={0.1}/>
                        </linearGradient>
                        <linearGradient id="colorDns" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#60a5fa" stopOpacity={0.1}/>
                        </linearGradient>
                        <linearGradient id="colorTcp" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#a78bfa" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#a78bfa" stopOpacity={0.1}/>
                        </linearGradient>
                        <linearGradient id="colorSsl" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#f472b6" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#f472b6" stopOpacity={0.1}/>
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted"/>
                    <XAxis
                        dataKey="time"
                        tickFormatter={formatTime}
                        className="text-xs"
                    />
                    <YAxis
                        className="text-xs"
                        label={{value: 'ms', angle: -90, position: 'insideLeft'}}
                    />
                    <Tooltip
                        content={({active, payload}) => {
                            if (active && payload && payload.length) {
                                return (
                                    <div className="rounded-lg border bg-background p-2 shadow-sm">
                                        <div className="grid gap-2">
                                            <div className="flex flex-col">
                                                <span className="text-[0.70rem] uppercase text-muted-foreground">
                                                    Time
                                                </span>
                                                <span className="font-bold text-muted-foreground">
                                                    {formatTime(payload[0].payload.time)}
                                                </span>
                                            </div>
                                            <div className="grid gap-1">
                                                {payload.map((entry, index) => (
                                                    <div key={index} className="flex items-center gap-2">
                                                        <div
                                                            className="h-2 w-2 rounded-full"
                                                            style={{backgroundColor: entry.color}}
                                                        />
                                                        <span className="text-xs capitalize">{entry.name}:</span>
                                                        <span className="text-xs font-bold">
                                                            {Math.round(entry.value as number)}ms
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                );
                            }
                            return null;
                        }}
                    />
                    <Area
                        type="monotone"
                        dataKey="total"
                        name="Total"
                        stroke="#fbbf24"
                        fillOpacity={1}
                        fill="url(#colorTotal)"
                    />
                    <Area
                        type="monotone"
                        dataKey="dns"
                        name="DNS"
                        stroke="#60a5fa"
                        fillOpacity={1}
                        fill="url(#colorDns)"
                    />
                    <Area
                        type="monotone"
                        dataKey="tcp"
                        name="TCP"
                        stroke="#a78bfa"
                        fillOpacity={1}
                        fill="url(#colorTcp)"
                    />
                    <Area
                        type="monotone"
                        dataKey="ssl"
                        name="SSL"
                        stroke="#f472b6"
                        fillOpacity={1}
                        fill="url(#colorSsl)"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}

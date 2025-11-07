import {useState, useEffect} from 'react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Alert, AlertDescription} from '@/components/ui/alert';
import {AlertCircle, Activity, Loader2} from 'lucide-react';
import PerformanceHistoryChart from './performance-history-chart';
import UptimeVisualization from './uptime-visualization';
import UptimeStatistics from './uptime-statistics';
import DailyUptimeBreakdown from './daily-uptime-breakdown';

interface UptimeMetricsCardProps {
    websiteId: string;
}

interface Monitor {
    id: string;
    url: string;
    ohdear_site_id: number;
    metrics: {
        metrics: any[];
        uptime_percentage_7_days: number;
        uptime_percentage_12_months: number;
        error?: string;
    };
    daily_breakdown: any[];
}

interface UptimeData {
    monitors: Monitor[];
    range: string;
}

export default function UptimeMetricsCard({websiteId}: UptimeMetricsCardProps) {
    const [data, setData] = useState<UptimeData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [range, setRange] = useState('day');

    const fetchUptimeData = async (selectedRange: string) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(route('ohdear.uptime', {websiteId}) + `?range=${selectedRange}`, {
                headers: {
                    'Accept': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to fetch uptime data');
            }

            const uptimeData = await response.json();
            setData(uptimeData);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUptimeData(range);
    }, [websiteId, range]);

    const handleRangeChange = (newRange: string) => {
        setRange(newRange);
    };

    if (loading) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Uptime Monitoring</CardTitle>
                    <CardDescription>
                        Monitor your website's uptime and availability
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-center h-64">
                        <div className="text-center">
                            <Loader2 className="h-12 w-12 mx-auto mb-4 opacity-50 animate-spin"/>
                            <p className="text-muted-foreground">Loading uptime data...</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        );
    }

    if (error) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Uptime Monitoring</CardTitle>
                    <CardDescription>
                        Monitor your website's uptime and availability
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4"/>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                </CardContent>
            </Card>
        );
    }

    if (!data || data.monitors.length === 0) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Uptime Monitoring</CardTitle>
                    <CardDescription>
                        Monitor your website's uptime and availability
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-center h-64 text-muted-foreground">
                        <div className="text-center">
                            <Activity className="h-12 w-12 mx-auto mb-4 opacity-50"/>
                            <p>No uptime data available</p>
                            <p className="text-sm mt-2">Monitoring may not be set up for this website</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        );
    }

    // Use the first monitor (base URL) for display
    const monitor = data.monitors[0];

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle>Uptime Monitoring</CardTitle>
                        <CardDescription>
                            Monitoring: {monitor.url}
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                {monitor.metrics.error ? (
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4"/>
                        <AlertDescription>{monitor.metrics.error}</AlertDescription>
                    </Alert>
                ) : (
                    <>
                        <PerformanceHistoryChart
                            metrics={monitor.metrics.metrics}
                            range={range}
                            onRangeChange={handleRangeChange}
                        />

                        <UptimeVisualization metrics={monitor.metrics.metrics}/>

                        <UptimeStatistics
                            uptimePercentage7Days={monitor.metrics.uptime_percentage_7_days}
                            uptimePercentage12Months={monitor.metrics.uptime_percentage_12_months}
                        />

                        <DailyUptimeBreakdown breakdown={monitor.daily_breakdown}/>
                    </>
                )}
            </CardContent>
        </Card>
    );
}

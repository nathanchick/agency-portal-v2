import {useState, useEffect} from 'react';
import {Alert, AlertDescription} from '@/components/ui/alert';
import {AlertCircle, Lightbulb, Loader2} from 'lucide-react';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import LighthouseScoreGauge from './lighthouse-score-gauge';
import CoreWebVitals from './core-web-vitals';
import LighthouseReportViewer from './lighthouse-report-viewer';
import {formatDistanceToNow} from 'date-fns';

interface LighthouseCardProps {
    websiteId: string;
}

interface LighthouseReport {
    id: number;
    created_at: string;
    monitor_id: number;
    performance_score: number | null;
    accessibility_score: number | null;
    best_practices_score: number | null;
    seo_score: number | null;
    first_contentful_paint_ms: number | null;
    speed_index_ms: number | null;
    largest_contentful_paint_ms: number | null;
    time_to_interactive_ms: number | null;
    total_blocking_time_ms: number | null;
    cumulative_layout_shift: number | null;
    performed_on_checker_server: string | null;
    full_page_screenshot: string | null;
    json_report: any | null;
    html_report: string | null;
}

interface Monitor {
    id: string;
    url: string;
    ohdear_site_id: number;
    report: LighthouseReport | null;
}

interface LighthouseData {
    monitors: Monitor[];
}

export default function LighthouseCard({websiteId}: LighthouseCardProps) {
    const [data, setData] = useState<LighthouseData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedMonitorId, setSelectedMonitorId] = useState<string | null>(null);

    const fetchLighthouseData = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(route('ohdear.lighthouse', {websiteId}), {
                headers: {
                    'Accept': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to fetch lighthouse data');
            }

            const lighthouseData = await response.json();
            setData(lighthouseData);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLighthouseData();
    }, [websiteId]);

    // Set initial selected monitor when data loads
    useEffect(() => {
        if (data && data.monitors.length > 0 && !selectedMonitorId) {
            setSelectedMonitorId(data.monitors[0].id);
        }
    }, [data]);

    if (loading) {
        return (
            <div className="space-y-8">
                <div className="flex items-center justify-center h-64">
                    <div className="text-center">
                        <Loader2 className="h-12 w-12 mx-auto mb-4 opacity-50 animate-spin"/>
                        <p className="text-muted-foreground">Loading lighthouse data...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="space-y-8">
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4"/>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            </div>
        );
    }

    if (!data || data.monitors.length === 0) {
        return (
            <div className="space-y-8">
                <div className="flex items-center justify-center h-64 text-muted-foreground">
                    <div className="text-center">
                        <Lightbulb className="h-12 w-12 mx-auto mb-4 opacity-50"/>
                        <p>No lighthouse data available</p>
                    </div>
                </div>
            </div>
        );
    }

    const selectedMonitor = data.monitors.find(m => m.id === selectedMonitorId);
    const report = selectedMonitor?.report;

    if (!report) {
        return (
            <div className="space-y-8">
                <div className="flex items-center justify-center h-64 text-muted-foreground">
                    <div className="text-center">
                        <Lightbulb className="h-12 w-12 mx-auto mb-4 opacity-50"/>
                        <p>No report available for this URL yet</p>
                        <p className="text-sm mt-2">Lighthouse runs daily</p>
                    </div>
                </div>
            </div>
        );
    }

    const reportAge = formatDistanceToNow(new Date(report.created_at), {addSuffix: true});

    return (
        <div className="space-y-8">
            {/* URL Selector */}
            {data.monitors.length > 1 && (
                <div className="flex justify-end">
                    <Select value={selectedMonitorId || ''} onValueChange={setSelectedMonitorId}>
                        <SelectTrigger className="w-[300px]">
                            <SelectValue placeholder="Select URL"/>
                        </SelectTrigger>
                        <SelectContent>
                            {data.monitors.map((monitor) => (
                                <SelectItem key={monitor.id} value={monitor.id}>
                                    {monitor.url}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            )}

            {/* Scores Section */}
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold">Scores</h2>
                    <p className="text-sm text-muted-foreground">Completed report {reportAge}</p>
                </div>
                <div className="grid grid-cols-4 gap-8">
                    <LighthouseScoreGauge
                        score={report.performance_score}
                        label="Performance"
                    />
                    <LighthouseScoreGauge
                        score={report.accessibility_score}
                        label="Accessibility"
                    />
                    <LighthouseScoreGauge
                        score={report.best_practices_score}
                        label="Best Practices"
                    />
                    <LighthouseScoreGauge
                        score={report.seo_score}
                        label="SEO"
                    />
                </div>
            </div>

            {/* Metrics Section */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Metrics</h2>
                <CoreWebVitals
                    firstContentfulPaintMs={report.first_contentful_paint_ms}
                    speedIndexMs={report.speed_index_ms}
                    largestContentfulPaintMs={report.largest_contentful_paint_ms}
                    timeToInteractiveMs={report.time_to_interactive_ms}
                    totalBlockingTimeMs={report.total_blocking_time_ms}
                    cumulativeLayoutShift={report.cumulative_layout_shift}
                />
            </div>

            {/* Trends Section */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Trends</h2>
                <p className="text-sm text-muted-foreground">
                    When we will have run this check 5 times, we'll show nice graphs with trends here.
                </p>
            </div>

            {/* Full Lighthouse Report */}
            <LighthouseReportViewer
                monitorId={report.monitor_id}
                reportId={report.id}
                jsonReport={report.json_report}
            />

            {/* Full Page Screenshot */}
            {report.full_page_screenshot && (
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold">Screenshot</h2>
                    <div className="border rounded-lg overflow-hidden bg-white">
                        <img
                            src={report.full_page_screenshot}
                            alt="Full page screenshot"
                            className="w-full h-auto"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

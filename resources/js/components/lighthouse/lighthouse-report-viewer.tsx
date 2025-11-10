import LighthouseViewer from 'react2-lighthouse-viewer';

interface LighthouseReportViewerProps {
    monitorId: number;
    reportId: number;
    jsonReport: any | null;
}

export default function LighthouseReportViewer({
    monitorId,
    reportId,
    jsonReport,
}: LighthouseReportViewerProps) {
    if (!jsonReport) {
        return (
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Full report</h2>
                <div className="p-8 text-center text-gray-500 border rounded-lg">
                    <p>No Lighthouse report data available</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold">Full report</h2>
            <div className="border rounded-lg overflow-hidden bg-white">
                <LighthouseViewer json={jsonReport} />
            </div>
        </div>
    );
}

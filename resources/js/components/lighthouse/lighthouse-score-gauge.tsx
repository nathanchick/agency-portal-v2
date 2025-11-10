import {Badge} from '@/components/ui/badge';

interface LighthouseScoreGaugeProps {
    score: number | null;
    label: string;
}

export default function LighthouseScoreGauge({score, label}: LighthouseScoreGaugeProps) {
    if (score === null) {
        return (
            <div className="flex flex-col items-center space-y-3">
                <div className="relative w-40 h-40">
                    <svg className="w-full h-full" viewBox="0 0 160 160">
                        {/* Background arc */}
                        <circle
                            cx="80"
                            cy="80"
                            r="60"
                            fill="none"
                            stroke="#e5e7eb"
                            strokeWidth="12"
                            strokeDasharray="377"
                            strokeDashoffset="94"
                            strokeLinecap="round"
                            transform="rotate(135 80 80)"
                        />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-4xl font-bold text-muted-foreground">-</span>
                    </div>
                </div>
                <div className="text-center">
                    <div className="text-base font-medium">{label}</div>
                </div>
            </div>
        );
    }

    // Color based on score thresholds (Google Lighthouse colors)
    const getColor = (value: number) => {
        if (value >= 90) return {
            stroke: '#0CCE6B',
            bg: '#E8F5E9',
            text: '#0CCE6B'
        };
        if (value >= 50) return {
            stroke: '#FFA400',
            bg: '#FFF8E1',
            text: '#FFA400'
        };
        return {
            stroke: '#FF4E42',
            bg: '#FFEBEE',
            text: '#FF4E42'
        };
    };

    const colors = getColor(score);

    // Arc is 270 degrees (3/4 of circle)
    const radius = 60;
    const circumference = 2 * Math.PI * radius;
    const arcLength = (270 / 360) * circumference; // 270 degree arc
    const strokeDashoffset = arcLength - (score / 100) * arcLength;

    const needsImprovementBadge = score < 50;

    return (
        <div className="flex flex-col items-center space-y-3">
            <div className="relative w-40 h-40" style={{backgroundColor: colors.bg, borderRadius: '50%'}}>
                <svg className="w-full h-full" viewBox="0 0 160 160">
                    {/* Background arc */}
                    <circle
                        cx="80"
                        cy="80"
                        r={radius}
                        fill="none"
                        stroke="#e5e7eb"
                        strokeWidth="12"
                        strokeDasharray={arcLength}
                        strokeDashoffset="0"
                        strokeLinecap="round"
                        transform="rotate(135 80 80)"
                    />
                    {/* Progress arc */}
                    <circle
                        cx="80"
                        cy="80"
                        r={radius}
                        fill="none"
                        stroke={colors.stroke}
                        strokeWidth="12"
                        strokeDasharray={arcLength}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        transform="rotate(135 80 80)"
                        style={{
                            transition: 'stroke-dashoffset 0.5s ease-in-out',
                        }}
                    />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-4xl font-bold" style={{color: colors.text}}>
                        {Math.round(score)}
                    </span>
                </div>
            </div>
            <div className="text-center space-y-1">
                <div className="text-base font-medium">{label}</div>
                {needsImprovementBadge && (
                    <Badge variant="destructive" className="text-xs">
                        below expected 50
                    </Badge>
                )}
            </div>
        </div>
    );
}

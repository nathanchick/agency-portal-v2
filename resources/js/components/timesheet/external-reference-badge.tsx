import {Badge} from '@/components/ui/badge';
import {Github, Trello, Gitlab, ExternalLink} from 'lucide-react';

interface ExternalReferenceData {
    service: string;
    service_icon_url?: string;
    id: string;
    permalink?: string;
}

interface ExternalReferenceBadgeProps {
    externalReference: string | null;
    onClick?: () => void;
}

export function ExternalReferenceBadge({externalReference, onClick}: ExternalReferenceBadgeProps) {
    if (!externalReference) {
        return null;
    }

    try {
        const data: ExternalReferenceData = JSON.parse(externalReference);

        // Get the appropriate icon based on service
        const getIcon = () => {
            const iconClass = "h-3 w-3 mr-1";
            const serviceLower = data.service.toLowerCase();

            if (serviceLower.includes('github')) {
                return <Github className={iconClass} />;
            } else if (serviceLower.includes('gitlab')) {
                return <Gitlab className={iconClass} />;
            } else if (serviceLower.includes('trello')) {
                return <Trello className={iconClass} />;
            }

            // For other services, show the icon URL if available
            if (data.service_icon_url) {
                return <img src={data.service_icon_url} alt={data.service} className={iconClass} />;
            }

            return <ExternalLink className={iconClass} />;
        };

        const displayText = `${data.service} #${data.id}`;

        return (
            <Badge
                variant="outline"
                className={`cursor-pointer hover:bg-accent ${onClick ? '' : 'pointer-events-none'}`}
                onClick={onClick}
            >
                {getIcon()}
                {displayText}
            </Badge>
        );
    } catch (error) {
        // If parsing fails, return nothing
        console.error('Failed to parse external reference:', error);
        return null;
    }
}

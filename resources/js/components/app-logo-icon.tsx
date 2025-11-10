import { SVGAttributes } from 'react';
import { usePage } from '@inertiajs/react';

interface Organisation {
    id: string;
    name: string;
    logo: string | null;
}

export default function AppLogoIcon(props: SVGAttributes<SVGElement>) {
    const page = usePage<{
        auth: {
            currentOrganisation: Organisation | null;
        };
    }>();
    const { auth } = page.props;
    const logoUrl = auth.currentOrganisation?.logo;

    if (logoUrl) {
        // Filter out SVG-specific classes (fill-current, text-*) but keep size classes
        const className = props.className || '';
        const filteredClasses = className
            .split(' ')
            .filter(cls =>
                !cls.startsWith('fill-') &&
                !cls.startsWith('text-') &&
                cls !== 'fill-current'
            )
            .join(' ');

        return (
            <img
                src={logoUrl}
                alt="Organisation logo"
                className={filteredClasses || 'size-5'}
                style={{ objectFit: 'contain' }}
            />
        );
    }

    // Fallback to default SVG logo
    return (
        <svg {...props} viewBox="0 0 106.95 83.96" xmlns="http://www.w3.org/2000/svg">
            <rect className="cls-1" y="21.45" width="19.79" height="19.79"/>
            <rect className="cls-1" y="64.17" width="19.79" height="19.79"/>
            <path className="cls-1"
                  d="M35.16,0h27.48c9.31,0,25.91,0,36.68,15.48,5.72,7.85,7.63,16.71,7.63,25.8,0,22.66-11.22,41.73-42.74,41.73h-29.06V0ZM56.36,64.39h9.09c15.82,0,20.3-10.99,20.3-22.77,0-4.71-1.01-10.66-4.04-15.37-2.47-3.7-6.73-7.63-16.15-7.63h-9.2v45.77Z"/>

        </svg>
    );
}

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell } from 'lucide-react';
import { NotificationDropdown } from './notification-dropdown';

interface NotificationBellProps {
    count: number;
    onUpdate: () => void;
}

export function NotificationBell({ count, onUpdate }: NotificationBellProps) {
    return (
        <NotificationDropdown onUpdate={onUpdate}>
            <Button
                variant="ghost"
                size="icon"
                className="relative h-9 w-9 cursor-pointer"
            >
                <Bell className="!size-5 opacity-80 group-hover:opacity-100" />
                {count > 0 && (
                    <Badge
                        variant="destructive"
                        className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                    >
                        {count > 9 ? '9+' : count}
                    </Badge>
                )}
            </Button>
        </NotificationDropdown>
    );
}

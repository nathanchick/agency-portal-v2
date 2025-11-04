import { NotificationItem } from './notification-item';
import type { Notification } from '@/types';
import { Loader2 } from 'lucide-react';

interface NotificationListProps {
    notifications: Notification[];
    loading?: boolean;
    onUpdate: () => void;
}

export function NotificationList({
    notifications,
    loading = false,
    onUpdate,
}: NotificationListProps) {
    if (loading) {
        return (
            <div className="flex items-center justify-center p-8">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
        );
    }

    if (notifications.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center p-8 text-center">
                <p className="text-sm text-muted-foreground">
                    No notifications yet
                </p>
            </div>
        );
    }

    return (
        <div className="divide-y">
            {notifications.map((notification) => (
                <NotificationItem
                    key={notification.id}
                    notification={notification}
                    onUpdate={onUpdate}
                />
            ))}
        </div>
    );
}

import { useState, useEffect } from 'react';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { NotificationList } from './notification-list';
import { fetchNotifications, markAllNotificationsAsRead } from '@/api/notifications';
import type { Notification } from '@/types';
import { CheckCheck } from 'lucide-react';
import { Separator } from './ui/separator';

interface NotificationDropdownProps {
    children: React.ReactNode;
    onUpdate: () => void;
}

export function NotificationDropdown({
    children,
    onUpdate,
}: NotificationDropdownProps) {
    const [open, setOpen] = useState(false);
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [loading, setLoading] = useState(false);

    const loadNotifications = async () => {
        setLoading(true);
        try {
            const response = await fetchNotifications(1);
            setNotifications(response.data);
        } catch (error) {
            console.error('Failed to load notifications:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleMarkAllAsRead = async () => {
        try {
            await markAllNotificationsAsRead();
            await loadNotifications();
            onUpdate();
        } catch (error) {
            console.error('Failed to mark all as read:', error);
        }
    };

    const handleUpdate = () => {
        loadNotifications();
        onUpdate();
    };

    useEffect(() => {
        if (open) {
            loadNotifications();
        }
    }, [open]);

    const hasUnread = notifications.some((n) => !n.read_at);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>{children}</PopoverTrigger>
            <PopoverContent
                className="w-[400px] p-0"
                align="end"
                sideOffset={8}
            >
                <div className="flex items-center justify-between p-4 pb-3">
                    <h3 className="font-semibold text-sm">Notifications</h3>
                    {hasUnread && (
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-auto p-1 text-xs"
                            onClick={handleMarkAllAsRead}
                        >
                            <CheckCheck className="mr-1 h-3 w-3" />
                            Mark all as read
                        </Button>
                    )}
                </div>
                <Separator />
                <div className="max-h-[400px] overflow-y-auto">
                    <NotificationList
                        notifications={notifications}
                        loading={loading}
                        onUpdate={handleUpdate}
                    />
                </div>
            </PopoverContent>
        </Popover>
    );
}

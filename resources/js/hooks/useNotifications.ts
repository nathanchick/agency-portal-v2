import { useState, useEffect } from 'react';
import { usePage, router } from '@inertiajs/react';
import { getUnreadCount } from '@/actions/notifications';
import type { SharedData, Notification } from '@/types';
import { toast } from 'sonner';

export function useNotifications() {
    const { auth, unreadNotificationsCount: initialCount } =
        usePage<SharedData>().props;
    const [count, setCount] = useState(initialCount);

    const refreshCount = async () => {
        try {
            const newCount = await getUnreadCount();
            setCount(newCount);
            // Also refresh the page props so the shared data is updated
            router.reload({ only: ['unreadNotificationsCount'] });
        } catch (error) {
            console.error('Failed to refresh notification count:', error);
        }
    };

    useEffect(() => {
        if (!auth?.user?.id || !window.Echo) return;

        // Listen for new notifications via Laravel Echo
        const channel = window.Echo.private(`App.Models.User.${auth.user.id}`);

        channel.notification((notification: Notification) => {
            // Show toast notification
            toast.info('New Notification', {
                description: getNotificationMessage(notification),
            });

            // Refresh count
            refreshCount();
        });

        // Cleanup on unmount
        return () => {
            window.Echo?.leave(`App.Models.User.${auth.user.id}`);
        };
    }, [auth?.user?.id]);

    return {
        count,
        refreshCount,
    };
}

function getNotificationMessage(notification: Notification): string {
    const data = notification.data;

    if (notification.type.includes('DocumentRequest')) {
        return `New document: ${data.document_name || 'N/A'}`;
    }
    if (notification.type.includes('DocumentStatusChange')) {
        return `Document ${data.action}: ${data.document_name || 'N/A'}`;
    }
    if (notification.type.includes('UserAddedToOrganisation')) {
        return `Added to ${data.organisation_name}`;
    }
    if (notification.type.includes('TeamInvitation')) {
        return 'You have been invited to join a team';
    }
    if (notification.type.includes('NewUserInvitation')) {
        return `Welcome to ${data.organisation_name}`;
    }
    return 'You have a new notification';
}

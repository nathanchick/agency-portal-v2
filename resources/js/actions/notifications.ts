import { router } from '@inertiajs/react';
import axios from 'axios';
import { route } from 'ziggy-js';
import type { Notification, PaginatedNotifications } from '@/types';

/**
 * Fetch paginated notifications
 */
export async function fetchNotifications(
    page: number = 1,
): Promise<PaginatedNotifications> {
    const response = await axios.get(route('notifications.index'), {
        params: { page },
    });
    return response.data;
}

/**
 * Get unread notifications count
 */
export async function getUnreadCount(): Promise<number> {
    const response = await axios.get(route('notifications.unread-count'));
    return response.data.count;
}

/**
 * Mark a notification as read
 */
export async function markNotificationAsRead(
    notificationId: string,
): Promise<void> {
    await axios.post(route('notifications.mark-as-read', { id: notificationId }));
}

/**
 * Mark all notifications as read
 */
export async function markAllNotificationsAsRead(): Promise<void> {
    await axios.post(route('notifications.mark-all-as-read'));
}

/**
 * Delete a notification
 */
export async function deleteNotification(
    notificationId: string,
): Promise<void> {
    await axios.delete(route('notifications.destroy', { id: notificationId }));
}

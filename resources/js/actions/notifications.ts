import * as NotificationController from './App/Http/Controllers/NotificationController';
import type { Notification } from '@/types';

interface NotificationsResponse {
    data: Notification[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

interface UnreadCountResponse {
    count: number;
}

/**
 * Fetch paginated notifications
 */
export async function fetchNotifications(page: number = 1): Promise<NotificationsResponse> {
    const response = await fetch(NotificationController.index.url({ query: { page } }), {
        headers: {
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch notifications');
    }

    return response.json();
}

/**
 * Fetch unread notification count
 */
export async function fetchUnreadCount(): Promise<UnreadCountResponse> {
    const response = await fetch(NotificationController.unreadCount.url(), {
        headers: {
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch unread count');
    }

    return response.json();
}

/**
 * Mark a single notification as read
 */
export async function markNotificationAsRead(id: string): Promise<void> {
    const response = await fetch(NotificationController.markAsRead.url(id), {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
        },
    });

    if (!response.ok) {
        throw new Error('Failed to mark notification as read');
    }
}

/**
 * Mark all notifications as read
 */
export async function markAllNotificationsAsRead(): Promise<void> {
    const response = await fetch(NotificationController.markAllAsRead.url(), {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
        },
    });

    if (!response.ok) {
        throw new Error('Failed to mark all notifications as read');
    }
}

/**
 * Delete a notification
 */
export async function deleteNotification(id: string): Promise<void> {
    const response = await fetch(NotificationController.destroy.url(id), {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
        },
    });

    if (!response.ok) {
        throw new Error('Failed to delete notification');
    }
}
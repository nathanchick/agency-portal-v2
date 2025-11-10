import { Button } from '@/components/ui/button';
import { markNotificationAsRead, deleteNotification } from '@/api/notifications';
import type { Notification } from '@/types';
import { formatDistanceToNow } from 'date-fns';
import { X, FileText, Users, UserPlus, CheckCircle, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NotificationItemProps {
    notification: Notification;
    onUpdate: () => void;
}

export function NotificationItem({
    notification,
    onUpdate,
}: NotificationItemProps) {
    const isUnread = !notification.read_at;

    const handleMarkAsRead = async (e: React.MouseEvent) => {
        e.stopPropagation();
        if (isUnread) {
            await markNotificationAsRead(notification.id);
            onUpdate();
        }
    };

    const handleDelete = async (e: React.MouseEvent) => {
        e.stopPropagation();
        await deleteNotification(notification.id);
        onUpdate();
    };

    const getNotificationIcon = () => {
        const type = notification.type;
        if (type.includes('Document')) {
            return <FileText className="h-4 w-4" />;
        }
        if (type.includes('Team') || type.includes('Invitation')) {
            return <UserPlus className="h-4 w-4" />;
        }
        if (type.includes('User')) {
            return <Users className="h-4 w-4" />;
        }
        if (type.includes('approved')) {
            return <CheckCircle className="h-4 w-4" />;
        }
        if (type.includes('declined')) {
            return <XCircle className="h-4 w-4" />;
        }
        return <FileText className="h-4 w-4" />;
    };

    const getNotificationTitle = () => {
        const type = notification.type;
        const data = notification.data;

        if (type.includes('DocumentRequest')) {
            return data.requires_signature
                ? 'Document Signature Required'
                : 'New Document';
        }
        if (type.includes('DocumentStatusChange')) {
            return data.action === 'approved'
                ? 'Document Approved'
                : 'Document Declined';
        }
        if (type.includes('UserAddedToOrganisation')) {
            return 'Added to Organisation';
        }
        if (type.includes('TeamInvitation')) {
            return 'Team Invitation';
        }
        if (type.includes('NewUserInvitation')) {
            return 'Welcome Invitation';
        }
        return 'Notification';
    };

    const getNotificationMessage = () => {
        const data = notification.data;

        if (notification.type.includes('DocumentRequest')) {
            return `Document: ${data.document_name || 'N/A'}`;
        }
        if (notification.type.includes('DocumentStatusChange')) {
            return `${data.document_name || 'Document'} was ${data.action} by ${data.action_by}`;
        }
        if (notification.type.includes('UserAddedToOrganisation')) {
            return `You were added to ${data.organisation_name}`;
        }
        if (notification.type.includes('TeamInvitation')) {
            return `You've been invited to join a team`;
        }
        if (notification.type.includes('NewUserInvitation')) {
            return `Welcome to ${data.organisation_name}`;
        }
        return 'You have a new notification';
    };

    return (
        <div
            className={cn(
                'group relative flex gap-3 p-3 hover:bg-accent/50 transition-colors cursor-pointer',
                isUnread && 'bg-accent/30',
            )}
            onClick={handleMarkAsRead}
        >
            <div className="flex-shrink-0 mt-0.5">
                <div
                    className={cn(
                        'rounded-full p-2',
                        isUnread ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground',
                    )}
                >
                    {getNotificationIcon()}
                </div>
            </div>
            <div className="flex-1 space-y-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-medium leading-none">
                        {getNotificationTitle()}
                    </p>
                    {isUnread && (
                        <span className="flex-shrink-0 h-2 w-2 rounded-full bg-primary" />
                    )}
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">
                    {getNotificationMessage()}
                </p>
                <p className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(notification.created_at), {
                        addSuffix: true,
                    })}
                </p>
            </div>
            <Button
                variant="ghost"
                size="icon"
                className="flex-shrink-0 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={handleDelete}
            >
                <X className="h-4 w-4" />
            </Button>
        </div>
    );
}

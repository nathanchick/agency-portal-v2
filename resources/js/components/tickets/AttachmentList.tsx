import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Trash2, Loader2, FileText, Image, Archive, Table, File } from 'lucide-react';
import { router } from '@inertiajs/react';

export interface Media {
    id: number;
    file_name: string;
    name: string;
    mime_type: string;
    size: number;
    human_readable_size: string;
    collection_name: string;
    created_at: string;
}

interface AttachmentListProps {
    attachments: Media[];
    canDelete?: boolean;
    onDelete?: (mediaId: number) => void;
    showTimestamp?: boolean;
}

export function AttachmentList({
    attachments,
    canDelete = false,
    onDelete,
    showTimestamp = true,
}: AttachmentListProps) {
    const [deletingId, setDeletingId] = useState<number | null>(null);

    if (!attachments || attachments.length === 0) {
        return null;
    }

    const handleDownload = (mediaId: number, fileName: string) => {
        window.location.href = route('media.download', mediaId);
    };

    const handleDelete = async (mediaId: number) => {
        if (!confirm('Are you sure you want to delete this attachment?')) {
            return;
        }

        setDeletingId(mediaId);

        router.delete(route('media.delete', mediaId), {
            preserveScroll: true,
            onSuccess: () => {
                if (onDelete) {
                    onDelete(mediaId);
                }
            },
            onFinish: () => {
                setDeletingId(null);
            },
        });
    };

    const getFileIcon = (mimeType: string) => {
        if (mimeType.startsWith('image/')) return Image;
        if (mimeType === 'application/pdf') return FileText;
        if (mimeType === 'application/zip') return Archive;
        if (mimeType.includes('spreadsheet') || mimeType.includes('excel')) return Table;
        if (mimeType.includes('document') || mimeType.includes('word')) return FileText;
        if (mimeType.startsWith('text/')) return FileText;
        return File;
    };

    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
        }).format(date);
    };

    return (
        <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Attachments ({attachments.length})
            </h4>
            <ul className="divide-y divide-gray-200 dark:divide-gray-700 border border-gray-200 dark:border-gray-700 rounded-lg">
                {attachments.map((attachment) => (
                    <li
                        key={attachment.id}
                        className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                        <div className="flex items-center space-x-3 flex-1 min-w-0">
                            {(() => {
                                const IconComponent = getFileIcon(attachment.mime_type);
                                return (
                                    <IconComponent
                                        className="h-5 w-5 text-gray-500 dark:text-gray-400 flex-shrink-0"
                                        aria-hidden="true"
                                    />
                                );
                            })()}
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                                    {attachment.name}
                                </p>
                                <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                                    <span>{attachment.human_readable_size}</span>
                                    {showTimestamp && (
                                        <>
                                            <span>•</span>
                                            <span>{formatDate(attachment.created_at)}</span>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center space-x-2 ml-4">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDownload(attachment.id, attachment.file_name)}
                                disabled={deletingId === attachment.id}
                                aria-label={`Download ${attachment.name}`}
                            >
                                <Download className="h-4 w-4" />
                            </Button>

                            {canDelete && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleDelete(attachment.id)}
                                    disabled={deletingId === attachment.id}
                                    className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
                                    aria-label={`Delete ${attachment.name}`}
                                >
                                    {deletingId === attachment.id ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                        <Trash2 className="h-4 w-4" />
                                    )}
                                </Button>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

import React, { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';

interface FileUploadProps {
    onFilesSelected: (files: File[]) => void;
    maxFiles?: number;
    maxFileSize?: number; // in MB
    acceptedTypes?: string[];
    existingFiles?: File[];
    disabled?: boolean;
}

export function FileUpload({
    onFilesSelected,
    maxFiles = 5,
    maxFileSize = 10,
    acceptedTypes = [
        'image/jpeg',
        'image/png',
        'image/gif',
        'image/webp',
        'application/pdf',
        'application/zip',
        'text/plain',
        'text/csv',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ],
    existingFiles = [],
    disabled = false,
}: FileUploadProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [error, setError] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);

    const validateFiles = (files: File[]): { valid: File[]; errors: string[] } => {
        const errors: string[] = [];
        const valid: File[] = [];

        if (existingFiles.length + files.length > maxFiles) {
            errors.push(`Maximum ${maxFiles} files allowed`);
            return { valid, errors };
        }

        for (const file of files) {
            // Check file size
            if (file.size > maxFileSize * 1024 * 1024) {
                errors.push(`${file.name} exceeds ${maxFileSize}MB limit`);
                continue;
            }

            // Check file type
            if (!acceptedTypes.includes(file.type)) {
                errors.push(`${file.name} is not an accepted file type`);
                continue;
            }

            valid.push(file);
        }

        return { valid, errors };
    };

    const handleFileSelect = (files: FileList | null) => {
        if (!files || files.length === 0) return;

        setError(null);
        const fileArray = Array.from(files);
        const { valid, errors } = validateFiles(fileArray);

        if (errors.length > 0) {
            setError(errors.join('. '));
            return;
        }

        onFilesSelected(valid);
    };

    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        if (!disabled) {
            setIsDragging(true);
        }
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);

        if (disabled) return;

        const files = e.dataTransfer.files;
        handleFileSelect(files);
    };

    const remainingSlots = maxFiles - existingFiles.length;

    return (
        <div className="space-y-2">
            <input
                ref={fileInputRef}
                type="file"
                multiple
                accept={acceptedTypes.join(',')}
                onChange={(e) => handleFileSelect(e.target.files)}
                className="hidden"
                disabled={disabled}
                aria-label="File upload input"
            />

            <div
                className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                    isDragging
                        ? 'border-primary bg-primary/5'
                        : 'border-gray-300 dark:border-gray-700'
                } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={!disabled ? handleButtonClick : undefined}
                role="button"
                tabIndex={disabled ? -1 : 0}
                onKeyDown={(e) => {
                    if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
                        e.preventDefault();
                        handleButtonClick();
                    }
                }}
                aria-label="Drop files here or click to upload"
            >
                <Icon name="upload" className="mx-auto h-12 w-12 text-gray-400 mb-3" aria-hidden="true" />
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Drag and drop files here, or click to select
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500">
                    Maximum {remainingSlots} file{remainingSlots !== 1 ? 's' : ''} ({maxFileSize}MB each)
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                    Accepted: Images, PDF, ZIP, Documents, Text, Spreadsheets
                </p>
            </div>

            {error && (
                <div className="text-sm text-red-600 dark:text-red-400" role="alert">
                    {error}
                </div>
            )}
        </div>
    );
}

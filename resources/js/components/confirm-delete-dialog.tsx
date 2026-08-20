import type { ReactElement } from 'react';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface ConfirmDeleteDialogProps {
    /** The element that opens the dialog (e.g. a destructive Button). */
    trigger: ReactElement;
    title: string;
    description?: string;
    confirmLabel?: string;
    onConfirm: () => void;
}

export function ConfirmDeleteDialog({
    trigger,
    title,
    description = 'This action cannot be undone.',
    confirmLabel = 'Delete',
    onConfirm,
}: ConfirmDeleteDialogProps) {
    return (
        <AlertDialog>
            <AlertDialogTrigger render={trigger} />
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        variant="destructive"
                        onClick={onConfirm}
                    >
                        {confirmLabel}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

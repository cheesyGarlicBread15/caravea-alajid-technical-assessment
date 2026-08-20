import { router } from '@inertiajs/react';
import { createColumnHelper } from '@tanstack/react-table';
import { TrashIcon } from 'lucide-react';

import { ConfirmDeleteDialog } from '@/components/confirm-delete-dialog';
import type { DataTableFeatures } from '@/components/data-table/data-table-features';
import { StatusBadge } from '@/components/status-badge';
import { Button } from '@/components/ui/button';
import taskRoutes from '@/routes/tasks';

export type TaskStatus = 'pending' | 'in_progress' | 'completed';

// Shape of a task row, matching the data passed from the controller.
export type Task = {
    id: number;
    title: string;
    description: string | null;
    status: TaskStatus;
    client_id: number | null;
    client: { id: number; name: string } | null;
    created_at: string;
};

// Use `accessor` for data columns and `display` for columns without one.
const columnHelper = createColumnHelper<DataTableFeatures, Task>();

export const columns = columnHelper.columns([
    columnHelper.accessor('title', {
        header: 'Title',
        cell: ({ row }) => (
            <span className="font-medium">{row.original.title}</span>
        ),
    }),
    columnHelper.accessor('status', {
        header: 'Status',
        cell: ({ getValue }) => <StatusBadge status={getValue()} />,
    }),
    columnHelper.display({
        id: 'client',
        header: 'Client',
        cell: ({ row }) => (
            <span className="text-muted-foreground">
                {row.original.client?.name ?? '—'}
            </span>
        ),
    }),
    columnHelper.display({
        id: 'actions',
        header: () => <span className="sr-only">Actions</span>,
        cell: ({ row }) => {
            const task = row.original;

            return (
                <div
                    className="text-right"
                    onClick={(event) => event.stopPropagation()}
                >
                    <ConfirmDeleteDialog
                        title={`Delete "${task.title}"?`}
                        onConfirm={() =>
                            router.delete(taskRoutes.destroy.url(task.id))
                        }
                        trigger={
                            <Button
                                size="icon-xs"
                                variant="ghost"
                                aria-label={`Delete ${task.title}`}
                                className="text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive [&_svg]:transition-transform hover:[&_svg]:scale-110"
                            >
                                <TrashIcon />
                            </Button>
                        }
                    />
                </div>
            );
        },
    }),
]);

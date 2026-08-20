import { Link, router } from '@inertiajs/react';
import { createColumnHelper } from '@tanstack/react-table';
import { TrashIcon } from 'lucide-react';

import { ConfirmDeleteDialog } from '@/components/confirm-delete-dialog';
import type { DataTableFeatures } from '@/components/data-table/data-table-features';
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

const STATUS_LABELS: Record<TaskStatus, string> = {
    pending: 'Pending',
    in_progress: 'In Progress',
    completed: 'Completed',
};

const STATUS_STYLES: Record<TaskStatus, string> = {
    pending: 'bg-[#f0f0ef] text-[#706f6c] dark:bg-white/10 dark:text-[#A1A09A]',
    in_progress:
        'bg-[#fff4e5] text-[#a35b00] dark:bg-[#3a2a12] dark:text-[#f0a94a]',
    completed:
        'bg-[#e7f5ec] text-[#1a7f42] dark:bg-[#123021] dark:text-[#4ad07f]',
};

function StatusBadge({ status }: { status: TaskStatus }) {
    return (
        <span
            className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_STYLES[status]}`}
        >
            {STATUS_LABELS[status]}
        </span>
    );
}

// Use `accessor` for data columns and `display` for columns without one.
const columnHelper = createColumnHelper<DataTableFeatures, Task>();

export const columns = columnHelper.columns([
    columnHelper.accessor('title', {
        header: 'Title',
        cell: ({ row }) => (
            <Link
                href={taskRoutes.show.url(row.original.id)}
                className="font-medium hover:underline hover:underline-offset-4"
            >
                {row.original.title}
            </Link>
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
                <div className="text-right">
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

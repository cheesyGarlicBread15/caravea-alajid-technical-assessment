import { Link, router } from '@inertiajs/react';
import { createColumnHelper } from '@tanstack/react-table';
import { TrashIcon } from 'lucide-react';

import { ConfirmDeleteDialog } from '@/components/confirm-delete-dialog';
import type { DataTableFeatures } from '@/components/data-table/data-table-features';
import { Button } from '@/components/ui/button';
import clientRoutes from '@/routes/clients';

// Shape of a client row, matching the data passed from the controller.
export type Client = {
    id: number;
    name: string;
    description: string | null;
    tasks_count?: number;
    created_at: string;
};

// Use `accessor` for data columns and `display` for columns without one.
const columnHelper = createColumnHelper<DataTableFeatures, Client>();

export const columns = columnHelper.columns([
    columnHelper.accessor('name', {
        header: 'Name',
        cell: ({ row }) => (
            <Link
                href={clientRoutes.show.url(row.original.id)}
                className="font-medium hover:underline hover:underline-offset-4"
            >
                {row.original.name}
            </Link>
        ),
    }),
    columnHelper.accessor('description', {
        header: 'Description',
        cell: ({ getValue }) => (
            <span className="text-muted-foreground">{getValue() ?? '—'}</span>
        ),
    }),
    columnHelper.accessor('tasks_count', {
        header: 'Tasks',
        cell: ({ getValue }) => (
            <span className="text-muted-foreground">{getValue() ?? 0}</span>
        ),
    }),
    columnHelper.display({
        id: 'actions',
        header: () => <span className="sr-only">Actions</span>,
        cell: ({ row }) => {
            const client = row.original;

            return (
                <div className="text-right">
                    <ConfirmDeleteDialog
                        title={`Delete "${client.name}"?`}
                        onConfirm={() =>
                            router.delete(clientRoutes.destroy.url(client.id))
                        }
                        trigger={
                            <Button
                                size="icon-xs"
                                variant="ghost"
                                aria-label={`Delete ${client.name}`}
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
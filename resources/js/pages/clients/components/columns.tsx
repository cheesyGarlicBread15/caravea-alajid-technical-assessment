import { Link, router } from '@inertiajs/react';
import { createColumnHelper } from '@tanstack/react-table';
import { TrashIcon } from 'lucide-react';

import { ConfirmDeleteDialog } from '@/components/confirm-delete-dialog';
import { Button } from '@/components/ui/button';
import clientRoutes from '@/routes/clients';

import type { DataTableFeatures } from './data-table-features';

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

// ---------------------------------------------------------------------------
// OLD SCAFFOLD CODE (kept for reference — do not remove)
// ---------------------------------------------------------------------------
// // This type is used to define the shape of our data.
// // You can use a Zod schema here if you want.
// export type Payment = {
//     id: string
//     amount: number
//     status: "pending" | "processing" | "success" | "failed"
//     email: string
// }
//
// const columnHelper = createColumnHelper<DataTableFeatures, Payment>()
//
// export const columns = columnHelper.columns([
//     columnHelper.accessor("status", {
//         header: "Status",
//     }),
//     columnHelper.accessor("email", {
//         header: "Email",
//     }),
//     columnHelper.accessor("amount", {
//         header: "Amount",
//     }),
// ])

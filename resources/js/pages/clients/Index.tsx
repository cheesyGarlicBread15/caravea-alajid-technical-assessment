import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import clientRoutes from '@/routes/clients';
import { columns } from './components/columns';
import type { Client } from './components/columns';
import { DataTable } from './components/data-table';

interface ClientsIndexProps {
    clients: Client[];
}

function Index({ clients }: ClientsIndexProps) {
    // OLD: the delete action now lives in the data-table column definition
    // (components/columns.tsx) — kept here for reference, do not remove.
    // function deleteClient(client: Client) {
    //     router.delete(clientRoutes.destroy.url(client.id));
    // }

    return (
        <>
            <Head title="Clients" />

            <div className="p-6 lg:p-8">
                <div className="mx-auto w-full max-w-4xl">
                    <div className="mb-6 flex items-center justify-between">
                        <div>
                            <h1 className="text-xl font-semibold">Clients</h1>
                            <p className="text-sm text-[#706f6c] dark:text-[#A1A09A]">
                                {clients.length}{' '}
                                {clients.length === 1 ? 'client' : 'clients'}
                            </p>
                        </div>

                        <Button
                            render={<Link href={clientRoutes.create.url()} />}
                        >
                            New client
                        </Button>
                    </div>

                    <DataTable columns={columns} data={clients} />

                    {/* OLD hand-rolled table + empty state (kept for reference — do not remove)
                    {clients.length === 0 ? (
                        <div className="rounded-lg border border-dashed border-[#e3e3e0] p-12 text-center dark:border-[#3E3E3A]">
                            <p className="text-sm text-[#706f6c] dark:text-[#A1A09A]">
                                No clients yet.{' '}
                                <Link
                                    href={clientRoutes.create.url()}
                                    className="font-medium underline underline-offset-4"
                                >
                                    Create your first client
                                </Link>
                                .
                            </p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto rounded-lg border border-[#e3e3e0] dark:border-[#3E3E3A]">
                            <table className="w-full text-left text-sm">
                                <thead className="border-b border-[#e3e3e0] text-[#706f6c] dark:border-[#3E3E3A] dark:text-[#A1A09A]">
                                    <tr>
                                        <th className="px-4 py-3 font-medium">Name</th>
                                        <th className="px-4 py-3 font-medium">Description</th>
                                        <th className="px-4 py-3 font-medium">Tasks</th>
                                        <th className="px-4 py-3 font-medium">
                                            <span className="sr-only">Actions</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {clients.map((client) => (
                                        <tr
                                            key={client.id}
                                            className="border-b border-[#e3e3e0] last:border-0 dark:border-[#3E3E3A]"
                                        >
                                            <td className="px-4 py-3 font-medium">
                                                <Link
                                                    href={clientRoutes.show.url(client.id)}
                                                    className="hover:underline hover:underline-offset-4"
                                                >
                                                    {client.name}
                                                </Link>
                                            </td>
                                            <td className="px-4 py-3 text-[#706f6c] dark:text-[#A1A09A]">
                                                {client.description ?? '—'}
                                            </td>
                                            <td className="px-4 py-3 text-[#706f6c] dark:text-[#A1A09A]">
                                                {client.tasks_count ?? 0}
                                            </td>
                                            <td className="px-4 py-3 text-right">
                                                <ConfirmDeleteDialog
                                                    title={`Delete "${client.name}"?`}
                                                    onConfirm={() => deleteClient(client)}
                                                    trigger={
                                                        <Button
                                                            size="icon-xs"
                                                            variant="ghost"
                                                            aria-label={`Delete ${client.name}`}
                                                            className="text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive [and_svg]:transition-transform hover:[and_svg]:scale-110"
                                                        >
                                                            <TrashIcon />
                                                        </Button>
                                                    }
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                    */}
                </div>
            </div>
        </>
    );
}

Index.layout = [AppLayout];

export default Index;

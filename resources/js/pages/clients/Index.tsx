import { Head, Link, router } from '@inertiajs/react';
import { DataTable } from '@/components/data-table/data-table';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import clientRoutes from '@/routes/clients';
import { columns } from './components/columns';
import type { Client } from './components/columns';

interface ClientsIndexProps {
    clients: Client[];
}

function Index({ clients }: ClientsIndexProps) {
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
                            nativeButton={false}
                            render={<Link href={clientRoutes.create.url()} />}
                        >
                            New client
                        </Button>
                    </div>
                    <DataTable
                        columns={columns}
                        data={clients}
                        onRowClick={(client) =>
                            router.visit(clientRoutes.show.url(client.id))
                        }
                    />
                </div>
            </div>
        </>
    );
}

Index.layout = [AppLayout];

export default Index;

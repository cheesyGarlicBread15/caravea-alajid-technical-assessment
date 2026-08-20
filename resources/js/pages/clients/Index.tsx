import AppLayout from '@/layouts/app-layout';
import clientRoutes from '@/routes/clients';
import { Head, Link } from '@inertiajs/react';

interface Client {
    id: number;
    name: string;
    description: string | null;
    tasks_count?: number;
    created_at: string;
}

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

                        <Link
                            href={clientRoutes.create.url()}
                            className="inline-block rounded-sm border border-black bg-[#1b1b18] px-4 py-1.5 text-sm font-medium text-white hover:bg-black dark:border-[#eeeeec] dark:bg-[#eeeeec] dark:text-[#1C1C1A] dark:hover:bg-white"
                        >
                            New client
                        </Link>
                    </div>

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
                                        <th className="px-4 py-3 font-medium">
                                            Name
                                        </th>
                                        <th className="px-4 py-3 font-medium">
                                            Description
                                        </th>
                                        <th className="px-4 py-3 font-medium">
                                            Tasks
                                        </th>
                                        <th className="px-4 py-3 font-medium">
                                            <span className="sr-only">
                                                Actions
                                            </span>
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
                                                    href={clientRoutes.show.url(
                                                        client.id,
                                                    )}
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
                                                <Link
                                                    href={clientRoutes.edit.url(
                                                        client.id,
                                                    )}
                                                    className="font-medium text-[#f53003] hover:underline hover:underline-offset-4 dark:text-[#FF4433]"
                                                >
                                                    Edit
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

Index.layout = [AppLayout];

export default Index;

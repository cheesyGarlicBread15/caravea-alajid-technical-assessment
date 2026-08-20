import AppLayout from '@/layouts/app-layout';
import clientRoutes from '@/routes/clients';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { useState } from 'react';
import type { FormEvent } from 'react';

interface Task {
    id: number;
    title: string;
    status: string;
}

interface Client {
    id: number;
    name: string;
    description: string | null;
    created_at: string;
    tasks: Task[];
}

interface ClientShowProps {
    client: Client;
}

function Show({ client }: ClientShowProps) {
    const [isEditing, setIsEditing] = useState(false);

    const form = useForm({
        name: client.name,
        description: client.description ?? '',
    });

    function startEditing() {
        form.setData({
            name: client.name,
            description: client.description ?? '',
        });
        form.clearErrors();
        setIsEditing(true);
    }

    function cancelEditing() {
        form.reset();
        form.clearErrors();
        setIsEditing(false);
    }

    function submit(event: FormEvent) {
        event.preventDefault();
        form.put(clientRoutes.update.url(client.id), {
            preserveScroll: true,
            onSuccess: () => setIsEditing(false),
        });
    }

    function destroy() {
        if (
            !window.confirm(`Delete "${client.name}"? This cannot be undone.`)
        ) {
            return;
        }

        router.delete(clientRoutes.destroy.url(client.id));
    }

    return (
        <>
            <Head title={client.name} />

            <div className="p-6 lg:p-8">
                <div className="mx-auto w-full max-w-2xl">
                    <div className="mb-6">
                        <Link
                            href={clientRoutes.index.url()}
                            className="text-sm text-[#706f6c] hover:underline hover:underline-offset-4 dark:text-[#A1A09A]"
                        >
                            ← Back to clients
                        </Link>
                    </div>

                    {isEditing ? (
                        <form
                            onSubmit={submit}
                            className="mb-8 flex flex-col gap-5"
                        >
                            <div className="flex flex-col gap-1.5">
                                <label
                                    htmlFor="name"
                                    className="text-sm font-medium"
                                >
                                    Name
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    value={form.data.name}
                                    onChange={(event) =>
                                        form.setData('name', event.target.value)
                                    }
                                    autoFocus
                                    className="rounded-md border border-[#e3e3e0] bg-white px-3 py-2 text-sm outline-none focus:border-[#1b1b18] dark:border-[#3E3E3A] dark:bg-[#161615] dark:focus:border-[#eeeeec]"
                                />
                                {form.errors.name && (
                                    <p className="text-sm text-[#f53003] dark:text-[#FF4433]">
                                        {form.errors.name}
                                    </p>
                                )}
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label
                                    htmlFor="description"
                                    className="text-sm font-medium"
                                >
                                    Description
                                    <span className="ml-1 font-normal text-[#706f6c] dark:text-[#A1A09A]">
                                        (optional)
                                    </span>
                                </label>
                                <textarea
                                    id="description"
                                    rows={4}
                                    value={form.data.description}
                                    onChange={(event) =>
                                        form.setData(
                                            'description',
                                            event.target.value,
                                        )
                                    }
                                    className="resize-y rounded-md border border-[#e3e3e0] bg-white px-3 py-2 text-sm outline-none focus:border-[#1b1b18] dark:border-[#3E3E3A] dark:bg-[#161615] dark:focus:border-[#eeeeec]"
                                />
                                {form.errors.description && (
                                    <p className="text-sm text-[#f53003] dark:text-[#FF4433]">
                                        {form.errors.description}
                                    </p>
                                )}
                            </div>

                            <div className="flex items-center gap-3">
                                <button
                                    type="submit"
                                    disabled={form.processing}
                                    className="inline-block rounded-sm border border-black bg-[#1b1b18] px-4 py-1.5 text-sm font-medium text-white hover:bg-black disabled:opacity-50 dark:border-[#eeeeec] dark:bg-[#eeeeec] dark:text-[#1C1C1A] dark:hover:bg-white"
                                >
                                    {form.processing
                                        ? 'Saving…'
                                        : 'Save changes'}
                                </button>
                                <button
                                    type="button"
                                    onClick={cancelEditing}
                                    className="text-sm text-[#706f6c] hover:underline hover:underline-offset-4 dark:text-[#A1A09A]"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div className="mb-8 flex items-start justify-between gap-4">
                            <div>
                                <h1 className="text-xl font-semibold">
                                    {client.name}
                                </h1>
                                <p className="mt-1 text-sm text-[#706f6c] dark:text-[#A1A09A]">
                                    {client.description ?? 'No description.'}
                                </p>
                            </div>

                            <div className="flex shrink-0 items-center gap-2">
                                <button
                                    type="button"
                                    onClick={startEditing}
                                    className="rounded-sm border border-black bg-[#1b1b18] px-4 py-1.5 text-sm font-medium text-white hover:bg-black dark:border-[#eeeeec] dark:bg-[#eeeeec] dark:text-[#1C1C1A] dark:hover:bg-white"
                                >
                                    Edit
                                </button>
                                <button
                                    type="button"
                                    onClick={destroy}
                                    className="rounded-sm border border-[#f53003] px-4 py-1.5 text-sm font-medium text-[#f53003] hover:bg-[#f53003] hover:text-white dark:border-[#FF4433] dark:text-[#FF4433] dark:hover:bg-[#FF4433] dark:hover:text-[#0a0a0a]"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    )}

                    <section>
                        <h2 className="mb-3 text-sm font-medium text-[#706f6c] dark:text-[#A1A09A]">
                            Tasks ({client.tasks.length})
                        </h2>

                        {client.tasks.length === 0 ? (
                            <p className="rounded-lg border border-dashed border-[#e3e3e0] p-6 text-center text-sm text-[#706f6c] dark:border-[#3E3E3A] dark:text-[#A1A09A]">
                                No tasks for this client yet.
                            </p>
                        ) : (
                            <ul className="divide-y divide-[#e3e3e0] rounded-lg border border-[#e3e3e0] dark:divide-[#3E3E3A] dark:border-[#3E3E3A]">
                                {client.tasks.map((task) => (
                                    <li
                                        key={task.id}
                                        className="flex items-center justify-between gap-4 px-4 py-3"
                                    >
                                        <span className="text-sm">
                                            {task.title}
                                        </span>
                                        <span className="rounded-full bg-black/5 px-2 py-0.5 text-xs text-[#706f6c] dark:bg-white/10 dark:text-[#A1A09A]">
                                            {task.status}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </section>
                </div>
            </div>
        </>
    );
}

Show.layout = [AppLayout];

export default Show;

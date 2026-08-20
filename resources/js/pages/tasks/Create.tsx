import AppLayout from '@/layouts/app-layout';
import taskRoutes from '@/routes/tasks';
import { Head, Link, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';

interface ClientOption {
    id: number;
    name: string;
}

interface StatusOption {
    value: string;
    label: string;
}

interface TasksCreateProps {
    clients: ClientOption[];
    statuses: StatusOption[];
}

const inputClass =
    'rounded-md border border-[#e3e3e0] bg-white px-3 py-2 text-sm outline-none focus:border-[#1b1b18] dark:border-[#3E3E3A] dark:bg-[#161615] dark:focus:border-[#eeeeec]';

function Create({ clients, statuses }: TasksCreateProps) {
    const form = useForm({
        title: '',
        description: '',
        status: statuses[0]?.value ?? 'pending',
        client_id: '' as number | '',
    });

    function submit(event: FormEvent) {
        event.preventDefault();
        form.post(taskRoutes.store.url());
    }

    return (
        <>
            <Head title="New task" />

            <div className="p-6 lg:p-8">
                <div className="mx-auto w-full max-w-lg">
                    <div className="mb-6">
                        <Link
                            href={taskRoutes.index.url()}
                            className="text-sm text-[#706f6c] hover:underline hover:underline-offset-4 dark:text-[#A1A09A]"
                        >
                            ← Back to tasks
                        </Link>
                        <h1 className="mt-2 text-xl font-semibold">New task</h1>
                    </div>

                    <form onSubmit={submit} className="flex flex-col gap-5">
                        <div className="flex flex-col gap-1.5">
                            <label
                                htmlFor="title"
                                className="text-sm font-medium"
                            >
                                Title
                            </label>
                            <input
                                id="title"
                                type="text"
                                value={form.data.title}
                                onChange={(event) =>
                                    form.setData('title', event.target.value)
                                }
                                autoFocus
                                className={inputClass}
                            />
                            {form.errors.title && (
                                <p className="text-sm text-[#f53003] dark:text-[#FF4433]">
                                    {form.errors.title}
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
                                className={`resize-y ${inputClass}`}
                            />
                            {form.errors.description && (
                                <p className="text-sm text-[#f53003] dark:text-[#FF4433]">
                                    {form.errors.description}
                                </p>
                            )}
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label
                                htmlFor="status"
                                className="text-sm font-medium"
                            >
                                Status
                            </label>
                            <select
                                id="status"
                                value={form.data.status}
                                onChange={(event) =>
                                    form.setData('status', event.target.value)
                                }
                                className={inputClass}
                            >
                                {statuses.map((status) => (
                                    <option
                                        key={status.value}
                                        value={status.value}
                                    >
                                        {status.label}
                                    </option>
                                ))}
                            </select>
                            {form.errors.status && (
                                <p className="text-sm text-[#f53003] dark:text-[#FF4433]">
                                    {form.errors.status}
                                </p>
                            )}
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label
                                htmlFor="client_id"
                                className="text-sm font-medium"
                            >
                                Client
                                <span className="ml-1 font-normal text-[#706f6c] dark:text-[#A1A09A]">
                                    (optional)
                                </span>
                            </label>
                            <select
                                id="client_id"
                                value={form.data.client_id}
                                onChange={(event) =>
                                    form.setData(
                                        'client_id',
                                        event.target.value === ''
                                            ? ''
                                            : Number(event.target.value),
                                    )
                                }
                                className={inputClass}
                            >
                                <option value="">— No client —</option>
                                {clients.map((client) => (
                                    <option key={client.id} value={client.id}>
                                        {client.name}
                                    </option>
                                ))}
                            </select>
                            {form.errors.client_id && (
                                <p className="text-sm text-[#f53003] dark:text-[#FF4433]">
                                    {form.errors.client_id}
                                </p>
                            )}
                        </div>

                        <div className="flex items-center gap-3">
                            <button
                                type="submit"
                                disabled={form.processing}
                                className="inline-block rounded-sm border border-black bg-[#1b1b18] px-4 py-1.5 text-sm font-medium text-white hover:bg-black disabled:opacity-50 dark:border-[#eeeeec] dark:bg-[#eeeeec] dark:text-[#1C1C1A] dark:hover:bg-white"
                            >
                                {form.processing ? 'Creating…' : 'Create task'}
                            </button>
                            <Link
                                href={taskRoutes.index.url()}
                                className="text-sm text-[#706f6c] hover:underline hover:underline-offset-4 dark:text-[#A1A09A]"
                            >
                                Cancel
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

Create.layout = [AppLayout];

export default Create;

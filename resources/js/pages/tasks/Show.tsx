import AppLayout from '@/layouts/app-layout';
import taskRoutes from '@/routes/tasks';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { useState } from 'react';
import type { FormEvent } from 'react';

type TaskStatus = 'pending' | 'in_progress' | 'completed';

interface ClientOption {
    id: number;
    name: string;
}

interface StatusOption {
    value: string;
    label: string;
}

interface Task {
    id: number;
    title: string;
    description: string | null;
    status: TaskStatus;
    client_id: number | null;
    client: ClientOption | null;
    created_at: string;
}

interface TaskShowProps {
    task: Task;
    clients: ClientOption[];
    statuses: StatusOption[];
}

const inputClass =
    'rounded-md border border-[#e3e3e0] bg-white px-3 py-2 text-sm outline-none focus:border-[#1b1b18] dark:border-[#3E3E3A] dark:bg-[#161615] dark:focus:border-[#eeeeec]';

const STATUS_STYLES: Record<TaskStatus, string> = {
    pending: 'bg-[#f0f0ef] text-[#706f6c] dark:bg-white/10 dark:text-[#A1A09A]',
    in_progress:
        'bg-[#fff4e5] text-[#a35b00] dark:bg-[#3a2a12] dark:text-[#f0a94a]',
    completed:
        'bg-[#e7f5ec] text-[#1a7f42] dark:bg-[#123021] dark:text-[#4ad07f]',
};

function Show({ task, clients, statuses }: TaskShowProps) {
    const [isEditing, setIsEditing] = useState(false);

    const form = useForm({
        title: task.title,
        description: task.description ?? '',
        status: task.status as string,
        client_id: (task.client_id ?? '') as number | '',
    });

    const statusLabel =
        statuses.find((status) => status.value === task.status)?.label ??
        task.status;

    function startEditing() {
        form.setData({
            title: task.title,
            description: task.description ?? '',
            status: task.status,
            client_id: task.client_id ?? '',
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
        form.put(taskRoutes.update.url(task.id), {
            preserveScroll: true,
            onSuccess: () => setIsEditing(false),
        });
    }

    function destroy() {
        if (!window.confirm(`Delete "${task.title}"? This cannot be undone.`)) {
            return;
        }

        router.delete(taskRoutes.destroy.url(task.id));
    }

    return (
        <>
            <Head title={task.title} />

            <div className="p-6 lg:p-8">
                <div className="mx-auto w-full max-w-2xl">
                    <div className="mb-6">
                        <Link
                            href={taskRoutes.index.url()}
                            className="text-sm text-[#706f6c] hover:underline hover:underline-offset-4 dark:text-[#A1A09A]"
                        >
                            ← Back to tasks
                        </Link>
                    </div>

                    {isEditing ? (
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
                                        form.setData(
                                            'title',
                                            event.target.value,
                                        )
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
                                        form.setData(
                                            'status',
                                            event.target.value,
                                        )
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
                                        <option
                                            key={client.id}
                                            value={client.id}
                                        >
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
                        <>
                            <div className="mb-8 flex items-start justify-between gap-4">
                                <div>
                                    <div className="flex items-center gap-3">
                                        <h1 className="text-xl font-semibold">
                                            {task.title}
                                        </h1>
                                        <span
                                            className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_STYLES[task.status]}`}
                                        >
                                            {statusLabel}
                                        </span>
                                    </div>
                                    <p className="mt-1 text-sm text-[#706f6c] dark:text-[#A1A09A]">
                                        {task.description ?? 'No description.'}
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

                            <dl className="grid grid-cols-1 gap-4 rounded-lg border border-[#e3e3e0] p-4 text-sm sm:grid-cols-2 dark:border-[#3E3E3A]">
                                <div>
                                    <dt className="text-[#706f6c] dark:text-[#A1A09A]">
                                        Client
                                    </dt>
                                    <dd className="mt-1 font-medium">
                                        {task.client?.name ?? 'Unassigned'}
                                    </dd>
                                </div>
                                <div>
                                    <dt className="text-[#706f6c] dark:text-[#A1A09A]">
                                        Status
                                    </dt>
                                    <dd className="mt-1 font-medium">
                                        {statusLabel}
                                    </dd>
                                </div>
                            </dl>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}

Show.layout = [AppLayout];

export default Show;

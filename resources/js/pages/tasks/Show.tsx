import { Head, router, useForm } from '@inertiajs/react';
import { useState } from 'react';
import type { FormEvent } from 'react';
import { BackButton } from '@/components/back-button';
import { ConfirmDeleteDialog } from '@/components/confirm-delete-dialog';
import { StatusBadge } from '@/components/status-badge';
import { Button } from '@/components/ui/button';
import {
    Combobox,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
} from '@/components/ui/combobox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import taskRoutes from '@/routes/tasks';

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

    const selectedClient =
        clients.find((client) => client.id === form.data.client_id) ?? null;

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
        router.delete(taskRoutes.destroy.url(task.id));
    }

    return (
        <>
            <Head title={task.title} />

            <div className="p-6 lg:p-8">
                <div className="mx-auto w-full max-w-2xl">
                    <div className="mb-6">
                        <BackButton href={taskRoutes.index.url()}>
                            Back to tasks
                        </BackButton>
                    </div>

                    {isEditing ? (
                        <form onSubmit={submit} className="flex flex-col gap-5">
                            <div className="flex flex-col gap-1.5">
                                <Label htmlFor="title">Title</Label>
                                <Input
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
                                    aria-invalid={!!form.errors.title}
                                />
                                {form.errors.title && (
                                    <p className="text-sm text-destructive">
                                        {form.errors.title}
                                    </p>
                                )}
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <Label htmlFor="description">
                                    Description
                                    <span className="ml-1 font-normal text-muted-foreground">
                                        (optional)
                                    </span>
                                </Label>
                                <Textarea
                                    id="description"
                                    rows={4}
                                    value={form.data.description}
                                    onChange={(event) =>
                                        form.setData(
                                            'description',
                                            event.target.value,
                                        )
                                    }
                                    className="resize-y"
                                    aria-invalid={!!form.errors.description}
                                />
                                {form.errors.description && (
                                    <p className="text-sm text-destructive">
                                        {form.errors.description}
                                    </p>
                                )}
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <Label htmlFor="status">Status</Label>
                                <Select
                                    value={form.data.status}
                                    onValueChange={(value) =>
                                        form.setData('status', value ?? '')
                                    }
                                >
                                    <SelectTrigger
                                        id="status"
                                        className="w-full"
                                        aria-invalid={!!form.errors.status}
                                    >
                                        <SelectValue placeholder="Select status">
                                            {(value: string | null) =>
                                                statuses.find(
                                                    (status) =>
                                                        status.value === value,
                                                )?.label ?? 'Select status'
                                            }
                                        </SelectValue>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {statuses.map((status) => (
                                            <SelectItem
                                                key={status.value}
                                                value={status.value}
                                            >
                                                {status.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {form.errors.status && (
                                    <p className="text-sm text-destructive">
                                        {form.errors.status}
                                    </p>
                                )}
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <Label htmlFor="client_id">
                                    Client
                                    <span className="ml-1 font-normal text-muted-foreground">
                                        (optional)
                                    </span>
                                </Label>
                                <Combobox
                                    items={clients}
                                    value={selectedClient}
                                    onValueChange={(
                                        client: ClientOption | null,
                                    ) =>
                                        form.setData(
                                            'client_id',
                                            client ? client.id : '',
                                        )
                                    }
                                    itemToStringLabel={(client: ClientOption) =>
                                        client.name
                                    }
                                    isItemEqualToValue={(
                                        a: ClientOption,
                                        b: ClientOption,
                                    ) => a.id === b.id}
                                >
                                    <ComboboxInput
                                        id="client_id"
                                        placeholder="Search clients…"
                                        showClear
                                        aria-invalid={!!form.errors.client_id}
                                    />
                                    <ComboboxContent>
                                        <ComboboxEmpty>
                                            No clients found.
                                        </ComboboxEmpty>
                                        <ComboboxList>
                                            {(client: ClientOption) => (
                                                <ComboboxItem
                                                    key={client.id}
                                                    value={client}
                                                >
                                                    {client.name}
                                                </ComboboxItem>
                                            )}
                                        </ComboboxList>
                                    </ComboboxContent>
                                </Combobox>
                                {form.errors.client_id && (
                                    <p className="text-sm text-destructive">
                                        {form.errors.client_id}
                                    </p>
                                )}
                            </div>

                            <div className="flex items-center gap-3">
                                <Button
                                    type="submit"
                                    disabled={form.processing}
                                >
                                    {form.processing
                                        ? 'Saving…'
                                        : 'Save changes'}
                                </Button>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    onClick={cancelEditing}
                                >
                                    Cancel
                                </Button>
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
                                        <StatusBadge status={task.status} />
                                    </div>
                                    <p className="mt-1 text-sm text-[#706f6c] dark:text-[#A1A09A]">
                                        {task.description ?? 'No description.'}
                                    </p>
                                </div>

                                <div className="flex shrink-0 items-center gap-2">
                                    <Button
                                        type="button"
                                        onClick={startEditing}
                                    >
                                        Edit
                                    </Button>
                                    <ConfirmDeleteDialog
                                        title={`Delete "${task.title}"?`}
                                        onConfirm={destroy}
                                        trigger={
                                            <Button
                                                type="button"
                                                variant="destructive"
                                            >
                                                Delete
                                            </Button>
                                        }
                                    />
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

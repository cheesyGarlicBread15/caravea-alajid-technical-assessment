import { Head, Link, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
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

function Create({ clients, statuses }: TasksCreateProps) {
    const form = useForm({
        title: '',
        description: '',
        status: statuses[0]?.value ?? 'pending',
        client_id: '' as number | '',
    });

    const selectedClient =
        clients.find((client) => client.id === form.data.client_id) ?? null;

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
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                type="text"
                                value={form.data.title}
                                onChange={(event) =>
                                    form.setData('title', event.target.value)
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
                                onValueChange={(client: ClientOption | null) =>
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
                            <Button type="submit" disabled={form.processing}>
                                {form.processing ? 'Creating…' : 'Create task'}
                            </Button>
                            <Button
                                variant="ghost"
                                render={<Link href={taskRoutes.index.url()} />}
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

Create.layout = [AppLayout];

export default Create;

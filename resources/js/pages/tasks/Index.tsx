import { Head, Link, router } from '@inertiajs/react';
import { TrashIcon } from 'lucide-react';
import { ConfirmDeleteDialog } from '@/components/confirm-delete-dialog';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import taskRoutes from '@/routes/tasks';

type TaskStatus = 'pending' | 'in_progress' | 'completed';

interface Task {
    id: number;
    title: string;
    description: string | null;
    status: TaskStatus;
    client_id: number | null;
    client: { id: number; name: string } | null;
    created_at: string;
}

interface TasksIndexProps {
    tasks: Task[];
}

const STATUS_LABELS: Record<TaskStatus, string> = {
    pending: 'Pending',
    in_progress: 'In Progress',
    completed: 'Completed',
};

const STATUS_STYLES: Record<TaskStatus, string> = {
    pending: 'bg-[#f0f0ef] text-[#706f6c] dark:bg-white/10 dark:text-[#A1A09A]',
    in_progress:
        'bg-[#fff4e5] text-[#a35b00] dark:bg-[#3a2a12] dark:text-[#f0a94a]',
    completed:
        'bg-[#e7f5ec] text-[#1a7f42] dark:bg-[#123021] dark:text-[#4ad07f]',
};

function StatusBadge({ status }: { status: TaskStatus }) {
    return (
        <span
            className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_STYLES[status]}`}
        >
            {STATUS_LABELS[status]}
        </span>
    );
}

function Index({ tasks }: TasksIndexProps) {
    function deleteTask(task: Task) {
        router.delete(taskRoutes.destroy.url(task.id));
    }

    return (
        <>
            <Head title="Tasks" />

            <div className="p-6 lg:p-8">
                <div className="mx-auto w-full max-w-4xl">
                    <div className="mb-6 flex items-center justify-between">
                        <div>
                            <h1 className="text-xl font-semibold">Tasks</h1>
                            <p className="text-sm text-[#706f6c] dark:text-[#A1A09A]">
                                {tasks.length}{' '}
                                {tasks.length === 1 ? 'task' : 'tasks'}
                            </p>
                        </div>

                        <Button
                            render={<Link href={taskRoutes.create.url()} />}
                        >
                            New task
                        </Button>
                    </div>

                    {tasks.length === 0 ? (
                        <div className="rounded-lg border border-dashed border-[#e3e3e0] p-12 text-center dark:border-[#3E3E3A]">
                            <p className="text-sm text-[#706f6c] dark:text-[#A1A09A]">
                                No tasks yet.{' '}
                                <Link
                                    href={taskRoutes.create.url()}
                                    className="font-medium underline underline-offset-4"
                                >
                                    Create your first task
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
                                            Title
                                        </th>
                                        <th className="px-4 py-3 font-medium">
                                            Status
                                        </th>
                                        <th className="px-4 py-3 font-medium">
                                            Client
                                        </th>
                                        <th className="px-4 py-3 font-medium">
                                            <span className="sr-only">
                                                Actions
                                            </span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tasks.map((task) => (
                                        <tr
                                            key={task.id}
                                            className="border-b border-[#e3e3e0] last:border-0 dark:border-[#3E3E3A]"
                                        >
                                            <td className="px-4 py-3 font-medium">
                                                <Link
                                                    href={taskRoutes.show.url(
                                                        task.id,
                                                    )}
                                                    className="hover:underline hover:underline-offset-4"
                                                >
                                                    {task.title}
                                                </Link>
                                            </td>
                                            <td className="px-4 py-3">
                                                <StatusBadge
                                                    status={task.status}
                                                />
                                            </td>
                                            <td className="px-4 py-3 text-[#706f6c] dark:text-[#A1A09A]">
                                                {task.client?.name ?? '—'}
                                            </td>
                                            <td className="px-4 py-3 text-right">
                                                <ConfirmDeleteDialog
                                                    title={`Delete "${task.title}"?`}
                                                    onConfirm={() =>
                                                        deleteTask(task)
                                                    }
                                                    trigger={
                                                        <Button
                                                            size="icon-xs"
                                                            variant="ghost"
                                                            aria-label={`Delete ${task.title}`}
                                                            className="text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive [&_svg]:transition-transform hover:[&_svg]:scale-110"
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
                </div>
            </div>
        </>
    );
}

Index.layout = [AppLayout];

export default Index;

import { Head, Link, router } from '@inertiajs/react';
import { DataTable } from '@/components/data-table/data-table';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import taskRoutes from '@/routes/tasks';
import { columns } from './components/columns';
import type { Task } from './components/columns';

interface TasksIndexProps {
    tasks: Task[];
}

function Index({ tasks }: TasksIndexProps) {
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
                    <DataTable
                        columns={columns}
                        data={tasks}
                        onRowClick={(task) =>
                            router.visit(taskRoutes.show.url(task.id))
                        }
                    />
                </div>
            </div>
        </>
    );
}

Index.layout = [AppLayout];

export default Index;

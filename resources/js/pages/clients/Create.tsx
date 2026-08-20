import { Head, Link, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import AppLayout from '@/layouts/app-layout';
import clientRoutes from '@/routes/clients';

function Create() {
    const form = useForm({
        name: '',
        description: '',
    });

    function submit(event: FormEvent) {
        event.preventDefault();
        form.post(clientRoutes.store.url());
    }

    return (
        <>
            <Head title="New client" />

            <div className="p-6 lg:p-8">
                <div className="mx-auto w-full max-w-lg">
                    <div className="mb-6">
                        <Link
                            href={clientRoutes.index.url()}
                            className="text-sm text-[#706f6c] hover:underline hover:underline-offset-4 dark:text-[#A1A09A]"
                        >
                            ← Back to clients
                        </Link>
                        <h1 className="mt-2 text-xl font-semibold">
                            New client
                        </h1>
                    </div>

                    <form onSubmit={submit} className="flex flex-col gap-5">
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
                                    ? 'Creating…'
                                    : 'Create client'}
                            </button>
                            <Link
                                href={clientRoutes.index.url()}
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

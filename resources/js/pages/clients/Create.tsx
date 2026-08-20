import { Head, Link, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import { BackButton } from '@/components/back-button';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
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
                        <BackButton href={clientRoutes.index.url()}>
                            Back to clients
                        </BackButton>
                        <h1 className="mt-2 text-xl font-semibold">
                            New client
                        </h1>
                    </div>

                    <form onSubmit={submit} className="flex flex-col gap-5">
                        <div className="flex flex-col gap-1.5">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                type="text"
                                value={form.data.name}
                                onChange={(event) =>
                                    form.setData('name', event.target.value)
                                }
                                autoFocus
                                aria-invalid={!!form.errors.name}
                            />
                            {form.errors.name && (
                                <p className="text-sm text-destructive">
                                    {form.errors.name}
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

                        <div className="flex items-center gap-3">
                            <Button type="submit" disabled={form.processing}>
                                {form.processing
                                    ? 'Creating…'
                                    : 'Create client'}
                            </Button>
                            <Button
                                variant="ghost"
                                nativeButton={false}
                                render={
                                    <Link href={clientRoutes.index.url()} />
                                }
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

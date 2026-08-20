import { Link, usePage } from '@inertiajs/react';
import type { PropsWithChildren } from 'react';
import FlashToast from '@/components/flash-toast';
import { cn } from '@/lib/utils';
import clients from '@/routes/clients';
import tasks from '@/routes/tasks';

interface NavItem {
    label: string;
    href: string;
    /** URL prefix used to decide whether the item is active. */
    match: string;
}

const navItems: NavItem[] = [
    { label: 'Clients', href: clients.index.url(), match: '/clients' },
    { label: 'Tasks', href: tasks.index.url(), match: '/tasks' },
];

function isActive(currentUrl: string, item: NavItem): boolean {
    const path = currentUrl.split('?')[0];

    return (
        path === item.href ||
        path.startsWith(`${item.match}/`) ||
        path === item.match
    );
}

export default function AppLayout({ children }: PropsWithChildren) {
    const { url } = usePage();

    return (
        <div className="flex min-h-screen bg-[#FDFDFC] text-[#1b1b18] dark:bg-[#0a0a0a] dark:text-[#EDEDEC]">
            <aside className="hidden w-60 shrink-0 border-r border-[#e3e3e0] p-4 lg:flex lg:flex-col dark:border-[#3E3E3A]">
                <Link href="/" className="mb-6 px-2 text-lg font-semibold">
                    Caravea
                </Link>

                <nav className="flex flex-col gap-1">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                'rounded-md px-3 py-2 text-sm font-medium transition-colors',
                                isActive(url, item)
                                    ? 'bg-[#1b1b18] text-white dark:bg-[#eeeeec] dark:text-[#1C1C1A]'
                                    : 'text-[#706f6c] hover:bg-black/5 hover:text-[#1b1b18] dark:text-[#A1A09A] dark:hover:bg-white/10 dark:hover:text-[#EDEDEC]',
                            )}
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>
            </aside>

            <div className="flex min-w-0 flex-1 flex-col">
                <header className="flex items-center gap-4 border-b border-[#e3e3e0] p-4 lg:hidden dark:border-[#3E3E3A]">
                    <Link href="/" className="text-lg font-semibold">
                        Caravea
                    </Link>
                    <nav className="flex gap-1">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    'rounded-md px-3 py-1.5 text-sm font-medium',
                                    isActive(url, item)
                                        ? 'bg-[#1b1b18] text-white dark:bg-[#eeeeec] dark:text-[#1C1C1A]'
                                        : 'text-[#706f6c] dark:text-[#A1A09A]',
                                )}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>
                </header>

                <main className="min-w-0 flex-1">{children}</main>
            </div>

            <FlashToast />
        </div>
    );
}

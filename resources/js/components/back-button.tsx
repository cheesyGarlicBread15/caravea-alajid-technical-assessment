import { Link } from '@inertiajs/react';
import { ArrowLeftIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import { Button } from '@/components/ui/button';

interface BackButtonProps {
    href: string;
    children: ReactNode;
}

/** Ghost button that navigates back to a listing (e.g. "Back to tasks"). */
export function BackButton({ href, children }: BackButtonProps) {
    return (
        <Button
            variant="ghost"
            size="sm"
            nativeButton={false}
            className="-ml-2.5 text-muted-foreground"
            render={<Link href={href} />}
        >
            <ArrowLeftIcon />
            {children}
        </Button>
    );
}

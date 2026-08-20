import { usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

type ToastType = 'success' | 'error';

interface Toast {
    type: ToastType;
    message: string;
}

interface FlashProps {
    success: string | null;
    error: string | null;
}

/**
 * Displays a transient toast whenever a shared `flash.success` or
 * `flash.error` message changes (e.g. after storing, updating, or
 * deleting a client).
 */
export default function FlashToast() {
    const flash = usePage().props.flash as FlashProps;
    const [toast, setToast] = useState<Toast | null>(null);

    useEffect(() => {
        const next: Toast | null = flash.error
            ? { type: 'error', message: flash.error }
            : flash.success
              ? { type: 'success', message: flash.success }
              : null;

        if (!next) {
            return;
        }

        setToast(next);
        const timeout = setTimeout(() => setToast(null), 3000);

        return () => clearTimeout(timeout);
    }, [flash.success, flash.error]);

    if (!toast) {
        return null;
    }

    return (
        <div
            className="fixed right-4 bottom-4 z-50"
            role="status"
            aria-live="polite"
        >
            <div className="flex items-center gap-3 rounded-md border border-[#e3e3e0] bg-white px-4 py-2.5 text-sm text-[#1b1b18] shadow-lg dark:border-[#3E3E3A] dark:bg-[#161615] dark:text-[#EDEDEC]">
                <span
                    className={
                        toast.type === 'error'
                            ? 'h-2 w-2 rounded-full bg-[#f53003] dark:bg-[#FF4433]'
                            : 'h-2 w-2 rounded-full bg-green-500'
                    }
                />
                {toast.message}
                <button
                    type="button"
                    onClick={() => setToast(null)}
                    className="ml-2 text-[#706f6c] hover:text-[#1b1b18] dark:text-[#A1A09A] dark:hover:text-[#EDEDEC]"
                    aria-label="Dismiss"
                >
                    ×
                </button>
            </div>
        </div>
    );
}

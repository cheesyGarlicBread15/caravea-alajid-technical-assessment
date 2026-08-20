import { usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

/**
 * Displays a transient success toast whenever the shared `flash.success`
 * message changes (e.g. after storing or updating a client).
 */
export default function FlashToast() {
    const { flash } = usePage().props;
    const [message, setMessage] = useState<string | null>(null);

    useEffect(() => {
        if (!flash.success) {
            return;
        }

        setMessage(flash.success);
        const timeout = setTimeout(() => setMessage(null), 3000);

        return () => clearTimeout(timeout);
    }, [flash.success]);

    if (!message) {
        return null;
    }

    return (
        <div
            className="fixed right-4 bottom-4 z-50"
            role="status"
            aria-live="polite"
        >
            <div className="flex items-center gap-3 rounded-md border border-[#e3e3e0] bg-white px-4 py-2.5 text-sm text-[#1b1b18] shadow-lg dark:border-[#3E3E3A] dark:bg-[#161615] dark:text-[#EDEDEC]">
                <span className="h-2 w-2 rounded-full bg-green-500" />
                {message}
                <button
                    type="button"
                    onClick={() => setMessage(null)}
                    className="ml-2 text-[#706f6c] hover:text-[#1b1b18] dark:text-[#A1A09A] dark:hover:text-[#EDEDEC]"
                    aria-label="Dismiss"
                >
                    ×
                </button>
            </div>
        </div>
    );
}

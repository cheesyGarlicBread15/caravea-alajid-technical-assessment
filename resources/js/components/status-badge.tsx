// Shared status pill used across tasks and clients. Known statuses get their
// own color; anything else falls back to a neutral gray with a title-cased
// label (e.g. "in_progress" -> "In Progress").

const STATUS_STYLES: Record<string, string> = {
    pending: 'bg-[#f0f0ef] text-[#706f6c] dark:bg-white/10 dark:text-[#A1A09A]',
    in_progress:
        'bg-[#fff4e5] text-[#a35b00] dark:bg-[#3a2a12] dark:text-[#f0a94a]',
    completed:
        'bg-[#e7f5ec] text-[#1a7f42] dark:bg-[#123021] dark:text-[#4ad07f]',
};

const STATUS_LABELS: Record<string, string> = {
    pending: 'Pending',
    in_progress: 'In Progress',
    completed: 'Completed',
};

const FALLBACK_STYLE =
    'bg-black/5 text-[#706f6c] dark:bg-white/10 dark:text-[#A1A09A]';

function formatStatus(status: string): string {
    return status
        .split('_')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

export function StatusBadge({ status }: { status: string }) {
    const style = STATUS_STYLES[status] ?? FALLBACK_STYLE;
    const label = STATUS_LABELS[status] ?? formatStatus(status);

    return (
        <span
            className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${style}`}
        >
            {label}
        </span>
    );
}

<?php

namespace App\Services;

use App\Enums\Task\TaskStatusEnum;

class TaskService
{
    public function statusOptions(): array
    {
        return array_map(
            fn (TaskStatusEnum $status): array => [
                'value' => $status->value,
                'label' => $status->label(),
            ],
            TaskStatusEnum::cases(),
        );
    }
}

<?php

use App\Enums\Task\TaskStatusEnum;
use App\Services\TaskService;

it('returns every status as a value/label pair', function () {
    $options = (new TaskService)->statusOptions();

    expect($options)->toHaveCount(count(TaskStatusEnum::cases()))
        ->and($options[0])->toBe(['value' => 'pending', 'label' => 'Pending'])
        ->and($options[1])->toBe(['value' => 'in_progress', 'label' => 'In Progress'])
        ->and($options[2])->toBe(['value' => 'completed', 'label' => 'Completed']);
});

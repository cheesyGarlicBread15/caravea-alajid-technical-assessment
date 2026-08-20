<?php

namespace App\Models;

use App\Enums\Task\TaskStatusEnum;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable(['title', 'description', 'status', 'client_id'])]
class Task extends Model
{
    use HasFactory;

    protected function casts(): array
    {
        return [
            'client_id' => 'integer',
            'status' => TaskStatusEnum::class,
        ];
    }

    public function client(): BelongsTo
    {
        return $this->belongsTo(Client::class);
    }
}

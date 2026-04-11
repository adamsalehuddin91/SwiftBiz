<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Wisdom extends Model
{
    protected $fillable = [
        'content',
        'source',
        'category',
        'language',
        'is_active',
        'content_hash',
        'tags',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'tags' => 'array',
    ];
}

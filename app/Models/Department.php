<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Auth;

class Department extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'code',
        'title_en',
        'title_prs',
        'title_ps',
        'manager_id',
        'status',
        'created_by',
        'updated_by',
        'deleted_by',
    ];

    protected $attributes = [
        'status' => 'active',
    ];

    protected static function booted(): void
    {
        static::creating(function (Department $department): void {
            $department->title_ps = $department->title_ps ?: $department->title_prs;
            $department->status = $department->status ?: 'active';

            if (Auth::check()) {
                $department->created_by = $department->created_by ?: Auth::id();
                $department->updated_by = $department->updated_by ?: Auth::id();
            }
        });

        static::updating(function (Department $department): void {
            $department->title_ps = $department->title_ps ?: $department->title_prs;

            if (Auth::check()) {
                $department->updated_by = Auth::id();
            }
        });

        static::deleting(function (Department $department): void {
            if (Auth::check()) {
                $department->deleted_by = Auth::id();
                $department->saveQuietly();
            }
        });
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Post extends Model
{
    use HasFactory, SoftDeletes;

    public $timestamps = true;

    protected $guarded = [];
    public function categories()
    {
        return $this->belongsToMany(Category::class)->withTimestamps();
    }
}

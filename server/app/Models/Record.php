<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Record extends Model
{
    use HasFactory;

    protected $fillable = [
        'type', //income or expense
        'category',
        'money_spent',
        'currency',
        'description',
        'user_id'
    ];

    protected $table = 'records';

}

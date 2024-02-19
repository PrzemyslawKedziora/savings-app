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
        'moneySpent',
        'currency',
        'description',
        'userID'
    ];

    protected $table = 'records';
}

<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class ToDoListModel extends Model
{
    
    protected $table        = 'todolists';
    protected $primaryKey   = 'id';

    // public $timestamps      = false;

    protected $fillable = [
        'title','description','date',
    ];
}

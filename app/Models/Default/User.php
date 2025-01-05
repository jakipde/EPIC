<?php

namespace App\Models\Default;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use App\Models\Admin;
use App\Models\Technician;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'role_id',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    public function role()
    {
        return $this->belongsTo(Role::class);
    }

    public function admin()
    {
        return $this->hasOne(Admin::class);
    }

    public function technician()
    {
        return $this->hasOne(Technician::class);
    }

    public function allow($permission, $abort = false)
    {
        if ($this->role_id == null) {
            return true;
        }

        $permit = $this->role()->whereHas('permissions', function ($query) use ($permission) {
            return $query->where('name', $permission);
        })->first();

        if ($permit != null) {
            return true;
        }

        if ($abort) {
            abort(403);
        }

        return false;
    }
}

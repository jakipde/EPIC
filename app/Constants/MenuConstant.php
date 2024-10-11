<?php

namespace App\Constants;

use Illuminate\Support\Facades\Route;

class MenuConstant
{
    public static function all($repairId = null) // Accept repairId as a parameter
    {
        $menu = [
            [
                'name' => 'Dashboard',
                'show' => true,
                'icon' => 'HiChartPie',
                'route' => route('dashboard'),
                'active' => 'dashboard',
                'permission' => 'view-dashboard',
            ],
            [
                'name' => 'User',
                'show' => true,
                'icon' => 'HiUser',
                'items' => [
                    [
                        'name' => 'Roles',
                        'show' => true,
                        'route' => route('roles.index'),
                        'active' => 'roles.*',
                        'permission' => 'view-role',
                    ],
                    [
                        'name' => 'Users',
                        'show' => true,
                        'route' => route('user.index'),
                        'active' => 'user.index',
                        'permission' => 'view-user',
                    ],
                ],
            ],
            [
                'name' => 'Setting',
                'show' => true,
                'icon' => 'HiCog',
                'route' => route('setting.index'),
                'active' => 'setting.index',
                'permission' => 'view-setting',
            ],
            // Repairs Menu
            [
                'name' => 'Repairs',
                'show' => true,
                'icon' => 'HiClipboardDocumentList',
                'route' => $repairId ? route('repairs.dashboard', ['repair' => $repairId]) : '#', // Use a placeholder if repairId is null
                'active' => 'repairs.dashboard',
                'permission' => 'view-repair-dashboard',
                'items' => [
                    [
                        'name' => 'Repair Dashboard',
                        'show' => true,
                        'route' => $repairId ? route('repairs.dashboard', ['repair' => $repairId]) : '#', // Use a placeholder if repairId is null
                        'active' => 'repairs.dashboard',
                        'permission' => 'view-repair-dashboard',
                    ],
                    [
                        'name' => 'Data Overview',
                        'show' => true,
                        'route' => $repairId ? route('repairs.data-overview', ['repair' => $repairId]) : '#', // Use a placeholder if repairId is null
                        'active' => 'repairs.data-overview',
                        'permission' => 'view-repair-data-overview',
                    ],
                ],
            ],
        ];

        // Add other menu items conditionally
        if (Route::has('shortlink.link.index')) {
            $menu[] = [
                'name' => 'Shortlink',
                'show' => true,
                'icon' => 'HiGlobeAlt',
                'route' => route('shortlink.link.index'),
                'active' => 'shortlink.link.*',
                'permission' => 'view-shortlink',
            ];
        }

        if (Route::has('custom-form.forms.index')) {
            $menu[] = [
                'name' => 'Custom Form',
                'show' => true,
                'icon' => 'HiInformationCircle',
                'route' => route('custom-form.forms.index'),
                'active' => 'custom-form.forms.*',
                'permission' => 'view-custom-form',
            ];
        }

        return $menu; // Return the complete menu
    }
}

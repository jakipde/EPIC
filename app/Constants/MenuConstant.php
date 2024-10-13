<?php

namespace App\Constants;

use Illuminate\Support\Facades\Route;

class MenuConstant
{
    public static function all()
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
                'name' => 'Repairs',
                'show' => true,
                'icon' => 'HiWrenchScrewdriver',
                'items' => [
                    [
                        'name' => 'Repairs Dashboard',
                        'show' => true,
                        'route' => route('repairs.dashboard'),
                        'active' => 'repairs.dashboard',
                        'permission' => 'view-repairs-dashboard',
                    ],
                    [
                        'name' => 'Data Overview',
                        'show' => true,
                        'route' => route('repairs.overview'),
                        'active' => 'repairs.overview',
                        'permission' => 'view-repairs-overview',
                    ],
                ],
            ],
            [
                'name' => 'Devices',
                'show' => true,
                'icon' => 'HiDevicePhoneMobile',
                'items' => [
                    [
                        'name' => 'Devices Dashboard',
                        'show' => true,
                        'route' => route('devices.dashboard'),
                        'active' => 'devices.dashboard',
                        'permission' => 'view-devices-dashboard',
                    ],
                    [
                        'name' => 'Data Overview',
                        'show' => true,
                        'route' => route('devices.overview'),
                        'active' => 'devices.overview',
                        'permission' => 'view-devices-overview',
                    ],
                ],
            ],
            [
                'name' => 'Accessories',
                'show' => true,
                'icon' => 'IoMdHeadset',
                'items' => [
                    [
                        'name' => 'Accessories Dashboard',
                        'show' => true,
                        'route' => route('accessories.dashboard'),
                        'active' => 'accessories.dashboard',
                        'permission' => 'view-accessories-dashboard',
                    ],
                    [
                        'name' => 'Data Overview',
                        'show' => true,
                        'route' => route('accessories.overview'),
                        'active' => 'accessories.overview',
                        'permission' => 'view-accessories-overview',
                    ],
                ],
            ],
            [
                'name' => 'Spare Parts',
                'show' => true,
                'icon' => 'HiCpuChip',
                'items' => [
                    [
                        'name' => 'Spare Parts Dashboard',
                        'show' => true,
                        'route' => route('spare-parts.dashboard'),
                        'active' => 'spare-parts.dashboard',
                        'permission' => 'view-spare-parts-dashboard',
                    ],
                    [
                        'name' => 'Data Overview',
                        'show' => true,
                        'route' => route('spare-parts.overview'),
                        'active' => 'spare-parts.overview',
                        'permission' => 'view-spare-parts-overview',
                    ],
                ],
            ],
            [
                'name' => 'Tools',
                'show' => true,
                'icon' => 'GiSolderingIron',
                'items' => [
                    [
                        'name' => 'Tools Dashboard',
                        'show' => true,
                        'route' => route('tools.dashboard'),
                        'active' => 'tools.dashboard',
                        'permission' => 'view-tools-dashboard',
                    ],
                    [
                        'name' => 'Data Overview',
                        'show' => true,
                        'route' => route('tools.overview'),
                        'active' => 'tools.overview',
                        'permission' => 'view-tools-overview',
                    ],
                ],
            ],
            [
                'name' => 'Products',
                'show' => true,
                'icon' => 'FaToolbox',
                'items' => [
                    [
                        'name' => 'Products Dashboard',
                        'show' => true,
                        'route' => route('products.dashboard'),
                        'active' => 'products.dashboard',
                        'permission' => 'view-products-dashboard',
                    ],
                    [
                        'name' => 'Data Overview',
                        'show' => true,
                        'route' => route('products.overview'),
                        'active' => 'products.overview',
                        'permission' => 'view-products-overview',
                    ],
                ],
            ],
            [
                'name' => 'Data Entry',
                'show' => true,
                'icon' => 'HiClipboardDocumentList',
                'items' => [
                    [
                        'name' => 'Input Data',
                        'show' => true,
                        'route' => route('data-entries.input'),
                        'active' => 'data-entries.input',
                        'permission' => 'view-data-entries-input',
                    ],
                    [
                        'name' => 'Customer Input',
                        'show' => true,
                        'route' => route('data-entries.customer-input'),
                        'active' => 'data-entries.customer-input',
                        'permission' => 'view-data-entries-customer-input',
                    ],
                ],
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
        ];

        // Conditional menu items
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

        if (Route::has('setting.index')) {
            $menu[] = [
                'name' => 'Setting',
                'show' => true,
                'icon' => 'HiCog',
                'route' => route('setting.index'),
                'active' => 'setting.index',
                'permission' => 'view-setting',
            ];
        }

        return $menu;
    }
}

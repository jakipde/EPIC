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
                        'name' => 'Data Management',
                        'show' => true,
                        'route' => route('repairs.data-management'),
                        'active' => 'repairs.data-management',
                        'permission' => 'view-repairs-data-management',
                    ],
                    [
                        'name' => 'Spare Parts Usage and Reports',
                        'show' => true,
                        'route' => route('repairs.reports'),
                        'active' => 'repairs.reports',
                        'permission' => 'view-repairs-reports',
                    ],
                ],
            ],
            [
                'name' => 'Products',
                'show' => true,
                'icon' => 'FaToolbox',
                'items' => [
                    [
                        'name' => 'Devices',
                        'show' => true,
                        'icon' => 'HiDevicePhoneMobile',
                        'route' => route('devices.dashboard'),
                        'active' => 'devices.dashboard',
                        'permission' => 'view-devices-dashboard',
                    ],
                    [
                        'name' => 'Accessories',
                        'show' => true,
                        'icon' => 'IoMdHeadset',
                        'route' => route('accessories.dashboard'),
                        'active' => 'accessories.dashboard',
                        'permission' => 'view-accessories-dashboard',
                    ],
                    [
                        'name' => 'Spare Parts',
                        'show' => true,
                        'icon' => 'HiCpuChip',
                        'items' => [
                            [
                                'name' => 'Data Insights',
                                'show' => true,
                                'route' => route('spareparts.dashboard'),
                                'active' => 'spareparts.dashboard',
                                'permission' => 'view-spareparts-dashboard',
                            ],
                            [
                                'name' => 'Warranty & Reporting',
                                'show' => true,
                                'route' => route('spareparts.warranty-report'),
                                'active' => 'spareparts.warranty-report',
                                'permission' => 'spareparts.warranty-report',
                            ],
                        ],
                    ],
                    [
                        'name' => 'Tools',
                        'show' => true,
                        'icon' => 'GiSolderingIron',
                        'route' => route('tools.dashboard'),
                        'active' => 'tools.dashboard',
                        'permission' => 'view-tools-dashboard',
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
                        'route' => route('data-entries.data-input'),
                        'active' => 'data-entries.data-input',
                        'permission' => ['view-data-input'],
                    ],
                    [
                        'name' => 'Bulk Input',
                        'show' => true,
                        'route' => route('data-entries.bulk-input'),
                        'active' => 'data-entries.bulk-input',
                        'permission' => ['view-bulk-input'],
                    ],
                ],
            ],
            [
                'name' => 'TestModalPage',
                'show' => true,
                'icon' => 'HiClipboardDocumentList',
                'route' => route('test-modal-pages.index'),
                'active' => 'test-modal-pages.*',
                'permission' => 'view-testModalPage',
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

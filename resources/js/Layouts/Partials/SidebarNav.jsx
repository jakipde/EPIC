import React, { useEffect, useState } from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import {
    HiXMark,
    HiArrowRightOnRectangle,
    HiChartPie,
    HiUser,
    HiCog,
    HiGlobeAlt,
    HiInformationCircle,
    HiClipboardDocumentList,
} from 'react-icons/hi2';

import { filterAllowedMenu } from './helpers.cjs';

const Icons = {
    HiXMark,
    HiArrowRightOnRectangle,
    HiChartPie,
    HiUser,
    HiCog,
    HiGlobeAlt,
    HiInformationCircle,
    HiClipboardDocumentList,
};

const ItemIcon = ({ icon, ...rest }) => {
    const Component = Icons[icon];
    return <Component {...rest} />;
};

const SidebarItem = ({ item }) => {
    return (
        <li>
            <Link
                href={item.route}
                className={`${route().current(item.active) ? 'active' : ''}`}
            >
                {item.icon && (
                    <ItemIcon
                        icon={item.icon}
                        className="h-5 w-5"
                        aria-hidden="true"
                    />
                )}
                {item.name}
            </Link>
        </li>
    );
};

const SidebarItemGroup = ({ item }) => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        item.items.some((subItem) => {
            if (route().current(subItem.active)) {
                setOpen(true);
                return true;
            }
            return false;
        });
    }, [item.items]);

    return (
        <li>
            <details open={open}>
                <summary>
                    {item.icon && (
                        <ItemIcon
                            icon={item.icon}
                            className="h-5 w-5"
                            aria-hidden="true"
                        />
                    )}
                    {item.name}
                </summary>
                <ul>
                    {item.items.map((subItem) => (
                        <SidebarItem key={subItem.name} item={subItem} />
                    ))}
                </ul>
            </details>
        </li>
    );
};

export default function SidebarNav({ user, show, setShow }) {
    const {
        props: {
            app: { app_name },
            navigation, // Get navigation directly from props
        },
    } = usePage();

    return (
        <div className={`${
            show ? 'block' : 'hidden'
        } flex flex-col h-screen overflow-y-auto transition-all duration-300 transform fixed top-0 start-0 bottom-0 z-[50] w-full md:w-64 bg-base-200 md:block md:translate-x-0 md:end-auto md:bottom-0`}>
            <div className="flex flex-col justify-between flex-1">
                <div>
                    <div className="flex flex-row justify-between md:justify-center p-6">
                        <Link
                            className="flex-none text-xl font-semibold text-base-content"
                            href={route('dashboard')}
                        >
                            {app_name}
                        </Link>
                        <div
                            className="block md:hidden"
                            onClick={() => setShow(false)}
                        >
                            <HiXMark className="w-5 h-5" />
                        </div>
                    </div>
                    <nav className="w-full">
                        <ul className="menu rounded-box">
                            {navigation.map((item) => (
                                <div key={`item-${item.name}`}>
                                    {item.items ? (
                                        <SidebarItemGroup item={item} />
                                    ) : (
                                        <SidebarItem item={item} />
                                    )}
                                </div>
                            ))}
                            <li>
                                <div onClick={() => router.post(route('logout'))}>
                                    <HiArrowRightOnRectangle
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                    />
                                    Logout
                                </div>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
            <div className="p-6">
                <p className="text-sm font-light text-center bottom-4 left-4 text-base-content">
                    {app_name} &copy; {new Date().getFullYear()}
                </p>
            </div>
        </div>
    );
}

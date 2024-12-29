import React, { useEffect, useState, memo } from 'react';
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
    HiWrenchScrewdriver,
    HiDevicePhoneMobile,
    HiCpuChip,
} from 'react-icons/hi2';

import { IoMdHeadset } from 'react-icons/io';
import { GiSolderingIron } from "react-icons/gi";
import { FaToolbox } from "react-icons/fa";

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
    HiWrenchScrewdriver,
    HiDevicePhoneMobile,
    IoMdHeadset,
    HiCpuChip,
    GiSolderingIron,
    FaToolbox,
};

const ItemIcon = ({ icon, ...rest }) => {
    const Component = Icons[icon];
    return <Component {...rest} />;
};

const SidebarItem = memo(({ item }) => (
    <li>
        <Link
            href={item.route}
            className={route().current(item.active) ? 'active' : ''}
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
));

const SidebarItemGroup = memo(({ item }) => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const isActive = item.items.some(subItem => route().current(subItem.active));
        setOpen(isActive ? false : open);
    }, [item.items]);

    return (
        <li>
            {/* Avoid toggling the parent onClick */}
            <details open={open}>
                <summary className="cursor-pointer">
                    {item.icon && (
                        <ItemIcon
                            icon={item.icon}
                            className="h-5 w-5"
                            aria-hidden="true"
                        />
                    )}
                    <span>{item.name}</span>
                </summary>
                <ul className="pl-4">
                    {item.items.map(subItem => (
                        <div key={subItem.name}>
                            {/* Recursively render child items */}
                            {subItem.items ? (
                                <SidebarItemGroup item={subItem} />
                            ) : (
                                <SidebarItem item={subItem} />
                            )}
                        </div>
                    ))}
                </ul>
            </details>
        </li>
    );
});

export default function SidebarNav({ user, show, setShow }) {
    const {
        props: {
            app: { app_name },
            navigation,
        },
    } = usePage();

    return (
        <div className={`flex flex-col h-screen overflow-y-auto transition-all duration-300 fixed top-0 start-0 bottom-0 z-[50] w-full md:w-64 bg-base-200 ${show ? 'block' : 'hidden'} md:block scrollbar-thin custom-scrollbar`}>
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
                            className="block md:hidden cursor-pointer"
                            onClick={() => setShow(false)}
                        >
                            <HiXMark className="w-5 h-5" />
                        </div>
                    </div>
                    <nav className="w-full">
                        <ul className="menu rounded-box">
                            {navigation.map(item => (
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
                <p className="text-sm font-light text-center text-base-content">
                    {app_name} &copy; {new Date().getFullYear()}
                </p>
            </div>
        </div>
    );
}

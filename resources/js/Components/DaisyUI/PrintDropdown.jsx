import React, { useState } from 'react';
import { HiPrinter } from "react-icons/hi2";

const PrintDropdown = ({ onPrintClick }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleDropdownClick = (type) => {
        onPrintClick(type);
        setIsOpen(false);
    };

    return (
        <div className="dropdown">
            <div
                tabIndex={0}
                role="button"
                className="btn m-1"
                onClick={() => setIsOpen(!isOpen)}
            >
                <HiPrinter />
                <span style={{ marginLeft: '5px' }}>Print</span>
            </div>
            {isOpen && (
                <ul className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                    <li><a onClick={() => handleDropdownClick('Jet')}>Jet</a></li>
                    <li><a onClick={() => handleDropdownClick('Dot Matrix')}>Dot Matrix</a></li>
                    <li><a onClick={() => handleDropdownClick('Thermal')}>Thermal</a></li>
                </ul>
            )}
        </div>
    );
};

export default PrintDropdown;

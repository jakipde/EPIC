import React from 'react';

const Commet = ({ color = "#00ff00", size = "large", textColor = "#000000" }) => {
    const sizeClasses = {
        small: 'text-sm h-4 w-4',
        medium: 'text-base h-6 w-6',
        large: 'text-lg h-10 w-10',
        xlarge: 'text-xl h-12 w-12',
    };

    return (
        <div className="flex items-center justify-center">
            <svg
                className={`animate-spin ${sizeClasses[size]}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                style={{ color }}
            >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v2a6 6 0 100 12v2a8 8 0 01-8-8z"
                />
            </svg>
        </div>
    );
};

export default Commet;

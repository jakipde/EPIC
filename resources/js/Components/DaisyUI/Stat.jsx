import React from 'react';

const Stat = ({ title, value, description, icon }) => {
    return (
        <div className="stat shadow">
            <div className="stat-figure text-secondary">
                {icon}
            </div>
            <div className="stat-title">{title}</div>
            <div className="stat-value">{value}</div>
            <div className="stat-desc">{description}</div>
        </div>
    );
};

export default Stat;

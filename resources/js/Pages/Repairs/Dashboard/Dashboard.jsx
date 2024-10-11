import React from 'react';

const Dashboard = ({ repair }) => {
    // Check if repair is defined
    const repairId = repair ? repair.id : null; // Use null or a default value if repair is undefined

    return (
        <div>
            <h1>Default Dashboard</h1>
            {repairId ? (
                <p>Repair ID: {repairId}</p>
            ) : (
                <p>No specific repair selected.</p>
            )}
            {/* Your dashboard content here */}
        </div>
    );
};

export default Dashboard;

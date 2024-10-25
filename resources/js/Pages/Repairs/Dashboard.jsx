import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [repairs, setRepairs] = useState([]);

    useEffect(() => {
        const fetchRepairs = async () => {
            try {
                const response = await axios.get('/api/repairs'); // Adjust the URL based on your API structure
                setRepairs(response.data);
            } catch (error) {
                console.error('Error fetching repairs:', error);
            }
        };

        fetchRepairs();
    }, []);

    return (
        <div>
            <h1>Repairs Dashboard</h1>
            <table>
                <thead>
                    <tr>
                        <th>Entry Date</th>
                        <th>Customer ID</th>
                        <th>Cashier</th>
                        <th>Phone Brand</th>
                        <th>Damage Description</th>
                        <th>Technician ID</th>
                        <th>Invoice Number</th>
                    </tr>
                </thead>
                <tbody>
                    {repairs.map((repair) => (
                        <tr key={repair.id}>
                            <td>{repair.entry_date}</td>
                            <td>{repair.customer_id}</td>
                            <td>{repair.cashier}</td>
                            <td>{repair.phone_brand}</td>
                            <td>{repair.damage_description}</td>
                            <td>{repair.technician_id}</td>
                            <td>{repair.invoice_number}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Dashboard;

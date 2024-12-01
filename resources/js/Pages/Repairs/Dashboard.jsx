import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import SearchInput from '@/Components/DaisyUI/SearchInput';
import Button from '@/Components/DaisyUI/Button';

const Dashboard = ({ repairs }) => {
    const [search, setSearch] = useState('');

    // Filter repairs based on search input
    const filteredRepairs = repairs.filter(repair => {
        const customerId = repair.customer_id ? String(repair.customer_id).toLowerCase() : '';
        const phoneBrand = repair.phone_brand ? String(repair.phone_brand).toLowerCase() : '';
        const damageDescription = repair.damage_description ? String(repair.damage_description).toLowerCase() : '';

        return (
            customerId.includes(search.toLowerCase()) ||
            phoneBrand.includes(search.toLowerCase()) ||
            damageDescription.includes(search.toLowerCase())
        );
    });

    return (
        <AuthenticatedLayout page={'Repairs'} action={'Dashboard'}>
            <Head title="Repairs Dashboard" />

            <div>
                <div className="flex flex-row justify-between mb-4">
                    <div className="flex flex-row gap-1">
                        <Button size="sm" type="primary">
                            Add Repair
                        </Button>
                    </div>
                    <div className="flex items-center">
                        <SearchInput
                            onChange={(e) => setSearch(e.target.value)}
                            value={search}
                            placeholder="Search repairs..."
                        />
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="table mb-4">
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
                            {filteredRepairs.map((repair) => (
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
            </div>
        </AuthenticatedLayout>
    );
};

export default Dashboard;

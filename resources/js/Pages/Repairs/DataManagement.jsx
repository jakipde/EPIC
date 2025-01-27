import React, { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import SearchInput from '@/Components/DaisyUI/SearchInput';
import Button from '@/Components/DaisyUI/Button';
import DataTable from '@/Components/DaisyUI/DataTable';
import ModalParent from './ModalParent';
import axios from 'axios';

const DataManagement = () => {
    const [search, setSearch] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [repairs, setRepairs] = useState([]);
    const [customers, setCustomers] = useState([]); // State for customers
    const [isServiceFormModalOpen, setServiceFormModalOpen] = useState(false);

    // New states for cashiers and technicians
    const [cashiers, setCashiers] = useState([]);
    const [technicians, setTechnicians] = useState([]);

    const handlePayment = (invoiceNumber) => {
        const snapToken = '{{ $snapToken }}'; // Replace with actual token retrieval logic

        snap.pay(snapToken, {
            onSuccess: function (result) {
                console.log('Payment successful:', result);
            },
            onPending: function (result) {
                console.log('Payment pending:', result);
            },
            onError: function (result) {
                console.log('Payment failed:', result);
            }
        });
    };

    const fetchRepairs = async () => {
        try {
            const response = await fetch('/api/repairs');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const result = await response.json();
            if (Array.isArray(result.data)) {
                setRepairs(result.data);
            } else {
                console.error('Expected an array but got:', result.data);
                setRepairs([]);
            }
        } catch (error) {
            console.error('Error fetching repairs:', error);
            setRepairs([]);
        }
    };

    const fetchCustomers = async () => {
        try {
            const response = await axios.get('/api/customers');
            setCustomers(response.data);
        } catch (error) {
            console.error('Error fetching customers:', error);
        }
    };

    // Fetch cashiers and technicians
    const fetchUsersByRoleName = async (roleName) => {
        try {
            const response = await axios.get(`/api/users?role_name=${roleName}`);
            if (roleName === 'Cashier') {
                setCashiers(response.data); // Set the cashiers state
            } else if (roleName === 'Technician') {
                setTechnicians(response.data); // Set the technicians state
            }
        } catch (error) {
            console.error(`Error fetching users:`, error.response ? error.response.data : error.message);
        }
    };

    useEffect(() => {
        fetchRepairs();
        fetchCustomers(); // Fetch customers
        fetchUsersByRoleName('Cashier');
        fetchUsersByRoleName('Technician');
    }, []);

    const filteredRepairs = repairs.filter(repair => {
        const customerName = repair.customer_name || '';
        const damageDesc = repair.damage_description || '';

        const matchesSearch = customerName.toLowerCase().includes(search.toLowerCase()) ||
            damageDesc.toLowerCase().includes(search.toLowerCase());

        const matchesDateRange = (!startDate || new Date(repair.entry_date) >= new Date(startDate)) &&
            (!endDate || new Date(repair.entry_date) <= new Date(endDate));

        return matchesSearch && matchesDateRange;
    });

    const indexOfLastRepair = currentPage * itemsPerPage;
    const indexOfFirstRepair = indexOfLastRepair - itemsPerPage;
    const currentRepairs = filteredRepairs.slice(indexOfFirstRepair, indexOfLastRepair);

    return (
        <AuthenticatedLayout page="Data Management">
            <Head title="Data Management" />
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">Data Management</h1>

                <div className="flex mb-4">
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="input input-bordered mr-2"
                    />
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="input input-bordered mr-2"
                    />
                    <SearchInput
                        onChange={(e) => setSearch(e.target.value)}
                        value={search} placeholder="Search repairs..."
                    />
                    <Button size="sm" type="primary" className="ml-2" onClick={() => setServiceFormModalOpen(true)}>Add Data</Button>
                </div>

                <DataTable
                    headers={[
                        'Entry Date',
                        'Invoice',
                        'Customer',
                        'Brand Model',
                        'Damage Description',
                        'Notes',
                        'Subtotal',
                        'Payment',
                        'Process',
                        'Admin',
                        'Technician',
                        'Actions'
                    ]}
                    data={currentRepairs.map((repair) => ({
                        entry_date: repair.entry_date,
                        invoice: repair.invoice_number,
                        customer: customers.find(customer => customer.id === repair.customer_id)?.name || 'N/A', // Display customer name
                        brand_model: `${repair.phone_brand} ${repair.phone_model}`,
                        damage_description: repair.damage_description,
                        notes: repair.notes,
                        subtotal: repair.sub_total ? repair.sub_total.toFixed(2) : '0.00', // Show actual subtotal
                        payment: repair.payment_type || 'N/A', // Show actual payment type
                        process: 'Pending', // Static "Pending"
                        admin: repair.cashier_name || cashiers.find(c => c.id === repair.cashier_id)?.name || 'N/A',
                        technician: repair.technician_name || technicians.find(t => t.id === repair.technician_id)?.name || 'N/A',
                        actions: (
                            <Button
                                size="sm"
                                type="primary"
                                onClick={() => handlePayment(repair.invoice_number)}
                            >
                                Pay
                            </Button>
                        )
                    }))}
                />

                <div className="mt-4">
                    {/* Pagination logic remains the same... */}
                </div>

                {/* Modal Parent */}
                <ModalParent
                    isServiceFormModalOpen={isServiceFormModalOpen}
                    setServiceFormModalOpen={setServiceFormModalOpen}
                />
            </div>
        </AuthenticatedLayout>
    );
};

export default DataManagement;

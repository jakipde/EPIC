import React, { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import SearchInput from '@/Components/DaisyUI/SearchInput';
import Button from '@/Components/DaisyUI/Button';
import DataTable from '@/Components/DaisyUI/DataTable';
import RepairDetailModal from "./RepairDetailModal"; // Import the RepairDetailModal
import ModalParent from './ModalParent';
import axios from 'axios';

const DataManagement = () => {
    const [search, setSearch] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [repairs, setRepairs] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [isServiceFormModalOpen, setServiceFormModalOpen] = useState(false);
    const [isRepairDetailModalOpen, setRepairDetailModalOpen] = useState(false);
    const [selectedRepair, setSelectedRepair] = useState(null);
    const [cashiers, setCashiers] = useState([]);
    const [technicians, setTechnicians] = useState([]);

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

    const fetchUsersByRoleName = async (roleName) => {
        try {
            const response = await axios.get(`/api/users?role_name=${roleName}`);
            if (roleName === 'Cashier') {
                setCashiers(response.data);
            } else if (roleName === 'Technician') {
                setTechnicians(response.data);
            }
        } catch (error) {
            console.error(`Error fetching users:`, error.response ? error.response.data : error.message);
        }
    };

    useEffect(() => {
        fetchRepairs();
        fetchCustomers();
        fetchUsersByRoleName('Cashier');
        fetchUsersByRoleName('Technician');
    }, []);

    const filteredRepairs = repairs.filter(repair => {
        const customerName = customers.find(customer => customer.id === repair.customer_id)?.name || '';
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

    const formatCurrency = (value) => {
        if (value === null || value === undefined) return 'Rp0';
        const number = parseFloat(value);
        if (isNaN(number)) return 'Rp0';
        return `Rp${number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
    };

    const handleRowClick = (repair) => {
        console.log('Selected repair:', repair); // Log the selected repair
        setSelectedRepair(repair); // Set the selected repair
        setRepairDetailModalOpen(true); // Open the RepairDetailModal
    };

    const mappedRepairs = currentRepairs.map(repair => ({
        id: repair.id, // Keep the ID for internal use
        entry_date: repair.entry_date,
        invoice: repair.invoice_number,
        customer: customers.find(customer => customer.id === repair.customer_id)?.name || 'N/A',
        brand_model: `${repair.phone_brand} ${repair.phone_model}`,
        damage_description: repair.damage_description,
        notes: repair.notes,
        total: formatCurrency(repair.total_price),
        payment: repair.payment_method || 'N/A',
        status: repair.status || 'Pending',
        admin: cashiers.find(c => c.id === repair.cashier_id)?.name || 'N/A',
        technician: technicians.find(t => t.id === repair.technician_id)?.name || 'N/A',
    }));

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
                    headers={['No', 'Entry Date', 'Invoice', 'Customer', 'Brand Model', 'Damage Description', 'Notes', 'Total', 'Payment', 'Status', 'Admin', 'Technician']}
                    data={mappedRepairs} // Pass the mapped repairs including the ID
                    onRowClick={handleRowClick} // Pass the row click handler
                />

                <div className="mt-4">
                    {/* Pagination logic remains the same... */}
                </div>

                {/* Modal Parent */}
                <ModalParent
                    isServiceFormModalOpen ={isServiceFormModalOpen}
                    setServiceFormModalOpen={setServiceFormModalOpen}
                    isRepairDetailModalOpen={isRepairDetailModalOpen}
                    setRepairDetailModalOpen={setRepairDetailModalOpen}
                    selectedRepair={selectedRepair} // Pass the selected repair details
                />

                {/* Repair Detail Modal */}
                <RepairDetailModal
                    isOpen={isRepairDetailModalOpen}
                    onClose={() => setRepairDetailModalOpen(false)}
                    repair={selectedRepair} // Pass the selected repair details
                    customers={customers} // Pass the customers array
                    cashiers={cashiers} // Pass the cashiers array
                    technicians={technicians} // Pass the technicians array
                />
            </div>
        </AuthenticatedLayout>
    );
};

export default DataManagement;

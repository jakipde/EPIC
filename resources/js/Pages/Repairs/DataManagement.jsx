import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import SearchInput from '@/Components/DaisyUI/SearchInput';
import Button from '@/Components/DaisyUI/Button';
import DataTable from '@/Components/DaisyUI/DataTable';
import Modal from '@/Components/DaisyUI/Modal'; // Assuming you have a Modal component

const statuses = ['Queued', 'In Process', 'Completed', 'Canceled', 'Collected', 'Refunded'];

const getRandomStatus = () => {
    return statuses[Math.floor(Math.random() * statuses.length)];
};

const generateRandomRepairs = (num) => {
    const repairs = [];
    for (let i = 0; i < num; i++) {
        repairs.push({
            entry_date: new Date(Date.now() - Math.random() * 10000000000).toLocaleDateString(),
            invoice_number: `INV${Math.floor(Math.random() * 10000)}`,
            customer_id: `CUST${Math.floor(Math.random() * 1000)}`,
            phone_brand: `Brand ${Math.floor(Math.random() * 5)}`,
            type: `Type ${Math.floor(Math.random() * 3)}`,
            damage_description: `Damage ${Math.floor(Math.random() * 10)}`,
            description: `Description ${Math.floor(Math.random() * 10)}`,
            price: Math.floor(Math.random() * 100000),
            payment: Math.random() > 0.5 ? 'Cash' : 'Credit',
            exit_date: new Date(Date.now() - Math.random() * 10000000000).toLocaleDateString(),
            admin: `Admin ${Math.floor(Math.random() * 5)}`,
            technician_id: `Tech ${Math.floor(Math.random() * 5)}`,
            status: getRandomStatus(), // Add status here
        });
    }
    return repairs;
};

const getStatusColor = (status) => {
    switch (status) {
        case 'Queued':
            return 'bg-yellow-500';
        case 'In Process':
            return 'bg-blue-500';
        case 'Completed':
            return 'bg-green-500';
        case 'Canceled':
            return 'bg-red-500';
        case 'Collected':
            return 'bg-purple-500';
        case 'Refunded':
            return 'bg-gray-500';
        default:
            return '';
    }
};

const DataManagement = () => {
    const [search, setSearch] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5); // Set items per page
    const [selectedRepair, setSelectedRepair] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState(''); // New state for status filter

    // Generate random repairs data
    const repairs = generateRandomRepairs(20);

    const filteredRepairs = repairs.filter(repair => {
        const matchesSearch = repair.customer_id.toString().includes(search) ||
                              repair.phone_brand.toLowerCase().includes(search.toLowerCase()) ||
                              repair.damage_description.toLowerCase().includes(search.toLowerCase());

        const matchesDateRange = (!startDate || new Date(repair.entry_date) >= new Date(startDate)) &&
                                  (!endDate || new Date(repair.entry_date) <= new Date(endDate));

        const matchesStatus = !selectedStatus || repair.status === selectedStatus; // Check status filter

        return matchesSearch && matchesDateRange && matchesStatus; // Include status in the filter
    });

    const paginatedRepairs = filteredRepairs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handlePrint = (invoice) => {
        console.log(`Print bill for ${invoice}`);
    };

    const handleEdit = (repair) => {
        console.log(`Edit repair with ID: ${repair.invoice_number}`);
    };

    const handleDelete = (repair) => {
        console.log(`Delete repair with ID: ${repair.invoice_number}`);
    };

    const openModal = (repair) => {
        setSelectedRepair(repair);
        setModalOpen(true);
    };

    const closeModal = () => {
        setSelectedRepair(null);
        setModalOpen(false);
    };

    return (
        <AuthenticatedLayout page="Data Management">
            <Head title="Data Management" />
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">Data Management</h1>

                {/* Date Filter */}
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
                    <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)} className="input input-bordered ml-2">
                        <option value="">All Statuses</option>
                        {statuses.map((status) => (
                            <option key={status} value={status}>{status}</option>
                        ))}
                    </select>
                    <Button size="sm" type="primary" className="ml-2">Add Data</Button>
                </div>

                {/* Data Table */}
                <DataTable
                    headers={['Entry Date', 'Invoice', 'Customer', 'Phone', 'Brand', 'Type', 'Damage', 'Description', 'Price', 'Payment', 'Exit Date', 'Admin', 'Technician', 'Status']}
                    data={paginatedRepairs.map((repair) => ({
                        entry_date: repair.entry_date,
                        invoice: repair.invoice_number,
                        customer: repair.customer_id,
                        phone: repair.phone_brand,
                        brand: repair.phone_brand,
                        type: repair.type,
                        damage: repair.damage_description,
                        description: repair.description,
                        price: `Rp${repair.price.toLocaleString()}`,
                        payment: repair.payment,
                        exit_date: repair.exit_date,
                        admin: repair.admin,
                        technician: repair.technician_id,
                        status: <span className={`text-white font-bold py-1 px-2 rounded ${getStatusColor(repair.status)}`}>{repair.status}</span>, // Add status with color
                    }))}
                />

                {/* Pagination */}
                <div className="flex justify-center mt-4">
                    {Array.from({ length: Math.ceil(filteredRepairs.length / itemsPerPage) }, (_, index) => (
                        <Button
                            key={index + 1}
                            size="sm"
                            onClick={() => setCurrentPage(index + 1)}
                            className={`mx-1 ${currentPage === index + 1 ? 'bg-blue-500 text-white' : ''}`}
                        >
                            {index + 1}
                        </Button>
                    ))}
                </div>

                {/* Modal for Edit, Delete, and Print Buttons */}
                {isModalOpen && selectedRepair && (
                    <Modal onClose={closeModal}>
                        <h2 className="text-lg font-bold">Actions for {selectedRepair.invoice_number}</h2>
                        <p>Customer: {selectedRepair.customer_id}</p>
                        <p>Price: {`Rp${selectedRepair.price.toLocaleString()}`}</p>
                        <p>Status: <span className={`text-white font-bold py-1 px-2 rounded ${getStatusColor(selectedRepair.status)}`}>{selectedRepair.status}</span></p>
                        <div className="flex justify-between mt-4">
                            <Button size="sm" onClick={() => handleEdit(selectedRepair)}>Edit</Button>
                            <Button size="sm" onClick={() => handleDelete(selectedRepair)}>Delete</Button>
                            <Button size="sm" onClick={() => handlePrint(selectedRepair.invoice_number)}>Print</Button>
                        </div>
                        <Button size="sm" onClick={closeModal} className="mt-2">Close</Button>
                    </Modal>
                )}
            </div>
        </AuthenticatedLayout>
    );
};

export default DataManagement;

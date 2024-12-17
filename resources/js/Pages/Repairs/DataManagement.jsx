import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import SearchInput from '@/Components/DaisyUI/SearchInput';
import Button from '@/Components/DaisyUI/Button';
import DataTable from '@/Components/DaisyUI/DataTable';
import Modal from '@/Components/DaisyUI/Modal'; // Assuming you have a Modal component

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
        });
    }
    return repairs;
};

const DataManagement = () => {
    const [search, setSearch] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5); // Set items per page
    const [selectedRepair, setSelectedRepair] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);

    // Generate random repairs data
    const repairs = generateRandomRepairs(20);

    const filteredRepairs = repairs.filter(repair => {
        const matchesSearch = repair.customer_id.toString().includes(search) ||
                              repair.phone_brand.toLowerCase().includes(search.toLowerCase()) ||
                              repair.damage_description.toLowerCase().includes(search.toLowerCase());

        const matchesDateRange = (!startDate || new Date(repair.entry_date) >= new Date(startDate)) &&
                                  (!endDate || new Date(repair.entry_date) <= new Date(endDate));

        return matchesSearch && matchesDateRange;
    });

    const paginatedRepairs = filteredRepairs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handlePrint = (invoice) => {
        // Implement print functionality here
        console.log(`Print bill for ${invoice}`);
        // You can open a new window or use a print library to print the bill
    };

    const handleEdit = (repair) => {
        // Implement edit functionality here
        console.log(`Edit repair with ID: ${repair.invoice_number}`);
    };

    const handleDelete = (repair) => {
        // Implement delete functionality here
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
                    <Button size="sm" type="primary" className="ml-2">Add Data</Button>
                </div>

                {/* Data Table */}
                <DataTable
                    headers={['Entry Date', 'Invoice', 'Customer', 'Phone', 'Brand', 'Type', 'Damage', 'Description', 'Price', 'Payment', 'Exit Date', 'Admin', 'Technician']}
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

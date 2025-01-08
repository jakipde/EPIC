import React, { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import SearchInput from '@/Components/DaisyUI/SearchInput';
import Button from '@/Components/DaisyUI/Button';
import DataTable from '@/Components/DaisyUI/DataTable';
import ModalParent from './ModalParent'; // Import the ModalParent

const DataManagement = () => {
    const [search, setSearch] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [repairs, setRepairs] = useState([]); // Initialize with an empty array
    const [isServiceFormModalOpen, setServiceFormModalOpen] = useState(false); // State for ServiceFormModal

    // Fetch repairs data from the API
    useEffect(() => {
        const fetchRepairs = async () => {
            try {
                const response = await fetch('/api/repairs'); // Adjust the URL to your API endpoint
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setRepairs(data); // Assuming the API returns an array of repairs
            } catch (error) {
                console.error('Error fetching repairs:', error);
            }
        };

        fetchRepairs();
    }, []);

    const filteredRepairs = repairs.filter(repair => {
        const matchesSearch = repair.customer_id.toString().includes(search) ||
                              repair.phone_brand.toLowerCase().includes(search.toLowerCase()) ||
                              repair.damage_description.toLowerCase().includes(search.toLowerCase());

        const matchesDateRange = (!startDate || new Date(repair.entry_date) >= new Date(startDate)) &&
                                  (!endDate || new Date(repair.entry_date ) <= new Date(endDate));

        return matchesSearch && matchesDateRange;
    });

    return (
        <AuthenticatedLayout page="Data Management">
            <Head title="Data Management" />
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">Data Management</h1>

                {/* Date Filter and Search Input */}
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
                    {/* Use the existing "Add Data" button to open the ServiceFormModal */}
                    <Button size="sm" type="primary" className="ml-2" onClick={() => setServiceFormModalOpen(true)}>Add Data</Button>
                </div>

                {/* Data Table */}
                <DataTable
                    headers={['Entry Date', 'Invoice', 'Customer', 'Phone Brand', 'Phone Model', 'Damage', 'Description', 'Technician', 'Under Warranty', 'Warranty Duration', 'Notes', 'Repair Type', 'Status']}
                    data={filteredRepairs.map((repair) => ({
                        entry_date: repair.entry_date,
                        invoice: repair.invoice_number,
                        customer: repair.customer_id,
                        phone_brand: repair.phone_brand,
                        phone_model: repair.phone_model,
                        damage: repair.damage_description,
                        description: repair.notes, // Assuming you want to show notes here
                        technician: repair.technician_id,
                        under_warranty: repair.under_warranty ? 'Yes' : 'No',
                        warranty_duration: repair.warranty_duration,
                        repair_type: repair.repair_type,
                        status: repair.repair_status, // Add the status field here
                    }))}
                />

                {/* Pagination */}
                <div className="mt-4">
                    {Array(Math.ceil(filteredRepairs.length / itemsPerPage)).fill(null).map((_, index) => (
                        <button
                            key={index}
                            className={`btn btn-sm ${currentPage === index + 1 ? 'btn-primary' : ''}`}
                            onClick={() => setCurrentPage(index + 1)}
                        >
                            {index + 1}
                        </button>
                    ))}
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
